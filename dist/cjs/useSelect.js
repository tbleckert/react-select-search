"use strict";

exports.__esModule = true;
exports["default"] = useSelect;

var _react = require("react");

var _flattenOptions = _interopRequireDefault(require("./lib/flattenOptions"));

var _groupOptions = _interopRequireDefault(require("./lib/groupOptions"));

var _highlightReducer = _interopRequireDefault(require("./highlightReducer"));

var _getOption = _interopRequireDefault(require("./lib/getOption"));

var _getNewValue = _interopRequireDefault(require("./lib/getNewValue"));

var _getDisplayValue = _interopRequireDefault(require("./lib/getDisplayValue"));

var _debounce = _interopRequireDefault(require("./lib/debounce"));

var _fuzzySearch = _interopRequireDefault(require("./fuzzySearch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function useSelect(_ref) {
  var _ref$value = _ref.value,
      defaultValue = _ref$value === void 0 ? null : _ref$value,
      _ref$options = _ref.options,
      defaultOptions = _ref$options === void 0 ? [] : _ref$options,
      _ref$search = _ref.search,
      canSearch = _ref$search === void 0 ? false : _ref$search,
      _ref$multiple = _ref.multiple,
      multiple = _ref$multiple === void 0 ? false : _ref$multiple,
      _ref$disabled = _ref.disabled,
      disabled = _ref$disabled === void 0 ? false : _ref$disabled,
      _ref$closeOnSelect = _ref.closeOnSelect,
      closeOnSelect = _ref$closeOnSelect === void 0 ? true : _ref$closeOnSelect,
      _ref$getOptions = _ref.getOptions,
      getOptions = _ref$getOptions === void 0 ? null : _ref$getOptions,
      _ref$filterOptions = _ref.filterOptions,
      filterOptions = _ref$filterOptions === void 0 ? null : _ref$filterOptions,
      _ref$fuse = _ref.fuse,
      fuse = _ref$fuse === void 0 ? false : _ref$fuse,
      _ref$onChange = _ref.onChange,
      onChange = _ref$onChange === void 0 ? function () {} : _ref$onChange,
      _ref$onFocus = _ref.onFocus,
      onFocusCb = _ref$onFocus === void 0 ? function () {} : _ref$onFocus,
      _ref$onBlur = _ref.onBlur,
      onBlurCb = _ref$onBlur === void 0 ? function () {} : _ref$onBlur,
      _ref$debounce = _ref.debounce,
      debounceTime = _ref$debounce === void 0 ? 0 : _ref$debounce;
  var ref = (0, _react.useRef)(null);
  var valueRef = (0, _react.useRef)(undefined);
  var flattenedOptions = (0, _react.useMemo)(function () {
    return (0, _flattenOptions["default"])(defaultOptions);
  }, [defaultOptions]);

  var _useState = (0, _react.useState)(defaultValue),
      value = _useState[0],
      setValue = _useState[1];

  var _useState2 = (0, _react.useState)(''),
      search = _useState2[0],
      setSearch = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      fetching = _useState3[0],
      setFetching = _useState3[1];

  var _useState4 = (0, _react.useState)(false),
      focus = _useState4[0],
      setFocus = _useState4[1];

  var _useReducer = (0, _react.useReducer)(_highlightReducer["default"], -1),
      highlighted = _useReducer[0],
      dispatchHighlighted = _useReducer[1];

  var _useState5 = (0, _react.useState)(flattenedOptions),
      options = _useState5[0],
      setOptions = _useState5[1];

  var _useState6 = (0, _react.useState)(function () {
    return (0, _getOption["default"])(value, options);
  }),
      option = _useState6[0],
      setOption = _useState6[1];

  var groupedOptions = (0, _react.useMemo)(function () {
    return (0, _groupOptions["default"])(options);
  }, [options]);
  var filter = (0, _react.useCallback)(function (q, o) {
    var nextOptions = o;

    if (q.length && fuse) {
      nextOptions = (0, _fuzzySearch["default"])(q, nextOptions, fuse);
    }

    if (filterOptions) {
      nextOptions = filterOptions(q, nextOptions);
    }

    return nextOptions;
  }, [filterOptions, fuse]);
  var fetchOptions = (0, _react.useMemo)(function () {
    if (!getOptions) {
      return function (q) {
        return setOptions(filter(q, flattenedOptions));
      };
    }

    return (0, _debounce["default"])(function (q) {
      var optionsReq = getOptions(q, flattenedOptions);
      setFetching(true);
      Promise.resolve(optionsReq).then(function (newOptions) {
        setOptions(filter(q, (0, _flattenOptions["default"])(newOptions)));
      })["finally"](function () {
        return setFetching(false);
      });
    }, debounceTime);
  }, [flattenedOptions, getOptions, filter, debounceTime]);
  var snapshot = (0, _react.useMemo)(function () {
    return {
      options: groupedOptions,
      option: option,
      displayValue: (0, _getDisplayValue["default"])(option),
      value: value,
      search: search,
      fetching: fetching,
      focus: focus,
      highlighted: highlighted,
      disabled: disabled
    };
  }, [disabled, fetching, focus, groupedOptions, highlighted, option, search, value]);
  var onFocus = (0, _react.useCallback)(function (e) {
    setFocus(true);
    onFocusCb(e);
  }, [onFocusCb]);
  var onBlur = (0, _react.useCallback)(function (e) {
    setFocus(false);
    setOptions(filter(search, flattenedOptions));
    setSearch('');

    if (ref.current) {
      ref.current.blur();
    }

    onBlurCb(e);
  }, [onBlurCb, filter, flattenedOptions, search]);
  var onSelect = (0, _react.useCallback)(function (newValue) {
    var newValues = (0, _getNewValue["default"])(newValue, value, options, multiple);
    var newOption = (0, _getOption["default"])(newValues, Array.isArray(option) ? [].concat(option, options) : options);
    setValue(newValues);
    setOption(newOption);
    onChange(newValues, newOption);
  }, [multiple, onChange, option, options, value]);
  var onMouseDown = (0, _react.useCallback)(function (e) {
    e.preventDefault();
    onSelect(e.currentTarget.value);

    if (closeOnSelect) {
      onBlur();
    }
  }, [closeOnSelect, onBlur, onSelect]);
  var onKeyDown = (0, _react.useCallback)(function (e) {
    var key = e.key;

    if (['ArrowDown', 'ArrowUp'].includes(key)) {
      e.preventDefault();
      dispatchHighlighted({
        key: key,
        options: options
      });
    }
  }, [options]);
  var onKeyPress = (0, _react.useCallback)(function (e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      var selected = options[highlighted];

      if (selected) {
        onSelect(selected.value);
      }

      if (closeOnSelect) {
        onBlur();
      }
    }
  }, [options, highlighted, closeOnSelect, onSelect, onBlur]);
  var onKeyUp = (0, _react.useCallback)(function (e) {
    if (e.key === 'Escape') {
      e.preventDefault();
      onBlur();
    }
  }, [onBlur]);

  var onSearch = function onSearch(_ref2) {
    var target = _ref2.target;
    return setSearch(target.value);
  };

  var valueProps = (0, _react.useMemo)(function () {
    return {
      tabIndex: '0',
      readOnly: !canSearch,
      onFocus: onFocus,
      onBlur: onBlur,
      onKeyPress: onKeyPress,
      onKeyDown: onKeyDown,
      onKeyUp: onKeyUp,
      onChange: canSearch ? onSearch : null,
      disabled: disabled,
      ref: ref
    };
  }, [canSearch, onFocus, onBlur, onKeyPress, onKeyDown, onKeyUp, disabled, ref]);
  var optionProps = (0, _react.useMemo)(function () {
    return {
      tabIndex: '-1',
      onMouseDown: onMouseDown,
      onKeyDown: onKeyDown,
      onKeyPress: onKeyPress,
      onBlur: onBlur
    };
  }, [onBlur, onKeyDown, onKeyPress, onMouseDown]);
  (0, _react.useEffect)(function () {
    if (valueRef.current === defaultValue) {
      return;
    }

    valueRef.current = defaultValue;
    var newValues = (0, _getNewValue["default"])(defaultValue, null, options, multiple);
    var newOption = (0, _getOption["default"])(newValues, options);
    setValue(defaultValue);
    setOption(newOption);
  }, [defaultValue, multiple, options, valueRef.current]);
  (0, _react.useEffect)(function () {
    return setOptions(flattenedOptions);
  }, [flattenedOptions]);
  (0, _react.useEffect)(function () {
    return fetchOptions(search);
  }, [search, fetchOptions]);
  return [snapshot, valueProps, optionProps, setValue];
}