import {
  useReducer,
  useEffect,
  useCallback,
  useMemo,
  useState,
  useRef,
} from 'react';
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
}) {
  const ref = useRef(null);
  const [flat, setOptions] = useState([]);
  const [defaultFlat, setDefaultFlat] = useState([]);
  const [value, setValue] = useState(defaultValue);
  const [search, setSearch] = useState('');
  const [focus, setFocus] = useState(false);
  const [highlighted, setHighlighted] = useReducer(highlightReducer, -1);

  const options = useMemo(() => GroupOptions(flat), [flat]);
  const selectedOption = useMemo(() => getOption(value, flat), [value, flat]);
  const displayValue = useMemo(() => getDisplayValue(value, flat), [value, flat]);

  const onBlur = useCallback(() => {
      setFocus(false);
      setHighlighted(false);

      if (ref.current) {
          ref.current.blur();
      }

      if (!multiple) {
          setSearch('');
          setOptions(FlattenOptions(defaultOptions));
      }
  }, [flat, ref]);
  const onFocus = useCallback(() => {
      setFocus(true);
  }, []);

  const onChange = e => setValue(getNewValue(e.currentTarget.value, value, multiple));
  const onKeyDown = useCallback(e => setHighlighted({ key: e.key, options: flat }), [flat]);
  const onKeyPress = useCallback(({ key }) => {
      if (key === 'Enter') {
          const option = flat[highlighted];

          if (option) {
              setValue(getNewValue(option.value, value, multiple));

              if (!multiple) {
                  onBlur();
              }
          }
      }
  }, [onBlur, flat, highlighted, multiple, value]);
  const onKeyUp = useCallback(({ key }) => {
      if (key === 'Escape') {
          onBlur();
      }
  }, [onBlur]);

  const onSearch = useCallback(({ target }) => {
      const { value: inputVal } = target;
      // let newOptions = flat;
      let newOptions = defaultFlat;
      setSearch(inputVal);

      if (inputVal.length) {
          newOptions = doSearch(inputVal, flat, fuse);
      }

      setOptions(newOptions);
  }, [defaultFlat, fuse]);

  const valueProps = {
      tabIndex: '0',
      readOnly: !canSearch,
      onBlur,
      onFocus,
      onKeyPress,
      onKeyDown,
      onKeyUp,
      ref,
  };

  if (canSearch) {
      valueProps.onChange = onSearch;
  }

  const optionProps = { tabIndex: '-1', onMouseDown: onChange };

  useEffect(() => {
      setValue(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
      const flattenOptions = FlattenOptions(defaultOptions);
      setOptions(flattenOptions);
      setDefaultFlat(flattenOptions);
  }, [defaultOptions]);

  return [
      {
          value,
          selectedOption,
          highlighted,
          options,
          disabled,
          displayValue,
          focus,
          search,
      },
      valueProps,
      optionProps,
      setValue,
  ];
}