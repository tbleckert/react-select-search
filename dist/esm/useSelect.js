import { useReducer, useEffect, useMemo, useState, useRef } from 'react';
import highlightReducer from './highlightReducer';
import getDisplayValue from './lib/getDisplayValue';
import FlattenOptions from './lib/flattenOptions';
import GroupOptions from './lib/groupOptions';
import getNewValue from './lib/getNewValue';
import getOption from './lib/getOption';
import doSearch from './search';
export default function useSelectSearch({
  value: defaultValue = null,
  disabled = false,
  multiple = false,
  search: canSearch = false,
  fuse = false,
  options: defaultOptions,
  onChange = () => {},
  getOptions = null,
  allowEmpty = true
}) {
  const ref = useRef(null);
  const [flatDefaultOptions, setFlatDefaultOptions] = useState(FlattenOptions(defaultOptions));
  const [flat, setOptions] = useState([]);
  const [value, setValue] = useState(getOption(defaultValue, flatDefaultOptions));
  const [search, setSearch] = useState('');
  const [focus, setFocus] = useState(false);
  const [searching, setSearching] = useState(false);
  const [highlighted, setHighlighted] = useReducer(highlightReducer, -1);
  const options = useMemo(() => GroupOptions(flat), [flat]);
  const displayValue = getDisplayValue(value);

  const onBlur = () => {
    setFocus(false);
    setHighlighted(false);

    if (ref.current) {
      ref.current.blur();
    }

    if (!multiple) {
      setSearch('');
      setOptions(flatDefaultOptions);
    }
  };

  const onFocus = () => setFocus(true);

  const onSelect = val => {
    const option = getOption(val, flat);
    const newValue = getNewValue(option, value, multiple);
    setValue(newValue);

    if (multiple) {
      onChange(newValue.map(i => i.value), newValue);
    } else {
      onChange(option.value, option);
    }
  };

  const onMouseDown = e => onSelect(e.currentTarget.value);

  const onKeyDown = e => setHighlighted({
    key: e.key,
    options: flat
  });

  const onKeyPress = ({
    key
  }) => {
    if (key === 'Enter') {
      const option = flat[highlighted];

      if (option) {
        onSelect(option.value);

        if (!multiple) {
          onBlur();
        }
      }
    }
  };

  const onKeyUp = ({
    key
  }) => {
    if (key === 'Escape') {
      onBlur();
    }
  };

  const onSearch = ({
    target
  }) => {
    const {
      value: inputVal
    } = target;
    setSearch(inputVal);
    let searchableOption = flatDefaultOptions;

    if (getOptions && inputVal.length) {
      setSearching(true);
      searchableOption = getOptions(inputVal);
    }

    Promise.resolve(searchableOption).then(foundOptions => {
      if (inputVal.length) {
        const newOptions = doSearch(inputVal, foundOptions, fuse);
        setOptions(newOptions === false ? foundOptions : newOptions);
      } else {
        setOptions(foundOptions);
      }
    }).catch(() => setOptions(flatDefaultOptions)).finally(() => setSearching(false));
  };

  const valueProps = {
    tabIndex: '0',
    readOnly: !canSearch,
    onBlur,
    onFocus,
    onKeyPress,
    onKeyDown,
    onKeyUp,
    ref
  };

  if (canSearch) {
    valueProps.onChange = onSearch;
  }

  const optionProps = {
    tabIndex: '-1',
    onMouseDown
  };
  useEffect(() => {
    if (defaultValue && flatDefaultOptions) {
      const option = getOption(defaultValue, flatDefaultOptions);
      setValue(option);
    } else if (!defaultValue && flatDefaultOptions && !allowEmpty) {
      setValue(flatDefaultOptions[0]);
    }
  }, [defaultValue]);
  useEffect(() => {
    const flatOptions = FlattenOptions(defaultOptions);
    setOptions(flatOptions);
    setFlatDefaultOptions(flatOptions);
  }, [defaultOptions]);
  return [{
    value,
    highlighted,
    options,
    disabled,
    displayValue,
    focus,
    search,
    searching
  }, valueProps, optionProps, setValue];
}