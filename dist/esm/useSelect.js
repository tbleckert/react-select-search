function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import { useReducer, useEffect, useCallback, useMemo, useState, useRef } from 'react';
import highlightReducer from './highlightReducer';
import getDisplayValue from './lib/getDisplayValue';
import FlattenOptions from './lib/flattenOptions';
import GroupOptions from './lib/groupOptions';
import getNewValue from './lib/getNewValue';
import getOption from './lib/getOption';
import doSearch from './search';
export default function useSelectSearch(_ref) {
  var _ref$value = _ref.value,
      defaultValue = _ref$value === void 0 ? null : _ref$value,
      _ref$disabled = _ref.disabled,
      disabled = _ref$disabled === void 0 ? false : _ref$disabled,
      _ref$multiple = _ref.multiple,
      multiple = _ref$multiple === void 0 ? false : _ref$multiple,
      _ref$search = _ref.search,
      canSearch = _ref$search === void 0 ? false : _ref$search,
      _ref$fuse = _ref.fuse,
      fuse = _ref$fuse === void 0 ? false : _ref$fuse,
      defaultOptions = _ref.options;
  var ref = useRef(null);

  var _useState = useState([]),
      _useState2 = _slicedToArray(_useState, 2),
      flat = _useState2[0],
      setOptions = _useState2[1];

  var _useState3 = useState(defaultValue),
      _useState4 = _slicedToArray(_useState3, 2),
      value = _useState4[0],
      setValue = _useState4[1];

  var _useState5 = useState(''),
      _useState6 = _slicedToArray(_useState5, 2),
      search = _useState6[0],
      setSearch = _useState6[1];

  var _useState7 = useState(false),
      _useState8 = _slicedToArray(_useState7, 2),
      focus = _useState8[0],
      setFocus = _useState8[1];

  var _useReducer = useReducer(highlightReducer, -1),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      highlighted = _useReducer2[0],
      setHighlighted = _useReducer2[1];

  var options = useMemo(function () {
    return GroupOptions(flat);
  }, [flat]);
  var selectedOption = useMemo(function () {
    return getOption(value, flat);
  }, [value, flat]);
  var displayValue = useMemo(function () {
    return getDisplayValue(value, flat);
  }, [value, flat]);
  var onBlur = useCallback(function () {
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
  var onFocus = useCallback(function () {
    setFocus(true);
  }, []);

  var onChange = function onChange(e) {
    return setValue(getNewValue(e.currentTarget.value, value, multiple));
  };

  var onKeyDown = useCallback(function (e) {
    return setHighlighted({
      key: e.key,
      options: flat
    });
  }, [flat]);
  var onKeyPress = useCallback(function (_ref2) {
    var key = _ref2.key;

    if (key === 'Enter') {
      var option = flat[highlighted];

      if (option) {
        setValue(getNewValue(option.value, value, multiple));

        if (!multiple) {
          onBlur();
        }
      }
    }
  }, [onBlur, flat, highlighted, multiple, value]);
  var onKeyUp = useCallback(function (_ref3) {
    var key = _ref3.key;

    if (key === 'Escape') {
      onBlur();
    }
  }, [onBlur]);
  var onSearch = useCallback(function (_ref4) {
    var target = _ref4.target;
    var inputVal = target.value;
    var newOptions = flat;
    setSearch(inputVal);

    if (inputVal.length) {
      newOptions = doSearch(inputVal, flat, fuse);
    }

    setOptions(newOptions);
  }, [flat, fuse]);
  var valueProps = {
    tabIndex: '0',
    readOnly: !canSearch,
    onBlur: onBlur,
    onFocus: onFocus,
    onKeyPress: onKeyPress,
    onKeyDown: onKeyDown,
    onKeyUp: onKeyUp,
    ref: ref
  };

  if (canSearch) {
    valueProps.onChange = onSearch;
  }

  var optionProps = {
    tabIndex: '-1',
    onMouseDown: onChange
  };
  useEffect(function () {
    setValue(defaultValue);
  }, [defaultValue]);
  useEffect(function () {
    setOptions(FlattenOptions(defaultOptions));
  }, [defaultOptions]);
  return [{
    value: value,
    selectedOption: selectedOption,
    highlighted: highlighted,
    options: options,
    disabled: disabled,
    displayValue: displayValue,
    focus: focus,
    search: search
  }, valueProps, optionProps, setValue];
}