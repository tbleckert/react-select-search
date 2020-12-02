import { useEffect, useMemo, useState, useReducer, useRef, useCallback } from 'react';
import flattenOptions from './lib/flattenOptions';
import groupOptions from './lib/groupOptions';
import highlightReducer from './highlightReducer';
import getOption from './lib/getOption';
import getNewValue from './lib/getNewValue';
import getDisplayValue from './lib/getDisplayValue';
import debounce from './lib/debounce';
import fuzzySearch from './fuzzySearch';
export default function useSelect({
  value: defaultValue = null,
  options: defaultOptions = [],
  search: canSearch = false,
  multiple = false,
  disabled = false,
  closeOnSelect = true,
  getOptions = null,
  filterOptions = null,
  fuse = false,
  onChange = () => {},
  onFocus: onFocusCb = () => {},
  onBlur: onBlurCb = () => {},
  debounce: debounceTime = 0
}) {
  const ref = useRef(null);
  const valueRef = useRef(undefined);
  const flattenedOptions = useMemo(() => flattenOptions(defaultOptions), [defaultOptions]);
  const [value, setValue] = useState(defaultValue);
  const [search, setSearch] = useState('');
  const [fetching, setFetching] = useState(false);
  const [focus, setFocus] = useState(false);
  const [highlighted, dispatchHighlighted] = useReducer(highlightReducer, -1);
  const [options, setOptions] = useState(flattenedOptions);
  const [option, setOption] = useState(() => getOption(value, options));
  const groupedOptions = useMemo(() => groupOptions(options), [options]);
  const filter = useCallback((q, o) => {
    let nextOptions = o;

    if (q.length && fuse) {
      nextOptions = fuzzySearch(q, nextOptions, fuse);
    }

    if (filterOptions) {
      nextOptions = filterOptions(q, nextOptions);
    }

    return nextOptions;
  }, [filterOptions, fuse]);
  const fetchOptions = useMemo(() => {
    if (!getOptions) {
      return q => setOptions(filter(q, flattenedOptions));
    }

    return debounce(q => {
      const optionsReq = getOptions(q, flattenedOptions);
      setFetching(true);
      Promise.resolve(optionsReq).then(newOptions => {
        setOptions(filter(q, flattenOptions(newOptions)));
      }).finally(() => setFetching(false));
    }, debounceTime);
  }, [flattenedOptions, getOptions, filter, debounceTime]);
  const snapshot = useMemo(() => ({
    options: groupedOptions,
    option,
    displayValue: getDisplayValue(option),
    value,
    search,
    fetching,
    focus,
    highlighted,
    disabled
  }), [disabled, fetching, focus, groupedOptions, highlighted, option, search, value]);
  const onFocus = useCallback(e => {
    setFocus(true);
    onFocusCb(e);
  }, [onFocusCb]);
  const onBlur = useCallback(e => {
    setFocus(false);
    setOptions(filter(search, flattenedOptions));
    setSearch('');

    if (ref.current) {
      ref.current.blur();
    }

    onBlurCb(e);
  }, [onBlurCb, filter, flattenedOptions, search]);
  const onSelect = useCallback(newValue => {
    const newValues = getNewValue(newValue, value, options, multiple);
    const newOption = getOption(newValues, Array.isArray(option) ? [...option, ...options] : options);
    setValue(newValues);
    setOption(newOption);
    onChange(newValues, newOption);
  }, [multiple, onChange, option, options, value]);
  const onMouseDown = useCallback(e => {
    e.preventDefault();
    onSelect(e.currentTarget.value);

    if (closeOnSelect) {
      onBlur();
    }
  }, [closeOnSelect, onBlur, onSelect]);
  const onKeyDown = useCallback(e => {
    const {
      key
    } = e;

    if (['ArrowDown', 'ArrowUp'].includes(key)) {
      e.preventDefault();
      dispatchHighlighted({
        key,
        options
      });
    }
  }, [options]);
  const onKeyPress = useCallback(e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const selected = options[highlighted];

      if (selected) {
        onSelect(selected.value);
      }

      if (closeOnSelect) {
        onBlur();
      }
    }
  }, [options, highlighted, closeOnSelect, onSelect, onBlur]);
  const onKeyUp = useCallback(e => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onBlur();
    }
  }, [onBlur]);

  const onSearch = ({
    target
  }) => setSearch(target.value);

  const valueProps = useMemo(() => ({
    tabIndex: '0',
    readOnly: !canSearch,
    onFocus,
    onBlur,
    onKeyPress,
    onKeyDown,
    onKeyUp,
    onChange: canSearch ? onSearch : null,
    disabled,
    ref
  }), [canSearch, onFocus, onBlur, onKeyPress, onKeyDown, onKeyUp, disabled, ref]);
  const optionProps = useMemo(() => ({
    tabIndex: '-1',
    onMouseDown,
    onKeyDown,
    onKeyPress,
    onBlur
  }), [onBlur, onKeyDown, onKeyPress, onMouseDown]);
  useEffect(() => {
    if (valueRef.current === defaultValue) {
      return;
    }

    valueRef.current = defaultValue;
    const newValues = getNewValue(defaultValue, null, options, multiple);
    const newOption = getOption(newValues, options);
    setValue(defaultValue);
    setOption(newOption);
  }, [defaultValue, multiple, options, valueRef.current]);
  useEffect(() => setOptions(flattenedOptions), [flattenedOptions]);
  useEffect(() => fetchOptions(search), [search, fetchOptions]);
  return [snapshot, valueProps, optionProps, setValue];
}