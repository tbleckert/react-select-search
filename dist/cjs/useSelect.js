"use strict";

exports.__esModule = true;
exports["default"] = useSelect;

var _react = require("react");

var _groupOptions = _interopRequireDefault(require("./lib/groupOptions"));

var _getOptions = _interopRequireDefault(require("./lib/getOptions"));

var _getDisplayValue = _interopRequireDefault(require("./lib/getDisplayValue"));

var _useFetch2 = _interopRequireDefault(require("./useFetch"));

var _getValues = _interopRequireDefault(require("./lib/getValues"));

var _useHighlight2 = _interopRequireDefault(require("./useHighlight"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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
      getOptionsFn = _ref$getOptions === void 0 ? null : _ref$getOptions,
      _ref$filterOptions = _ref.filterOptions,
      filterOptions = _ref$filterOptions === void 0 ? null : _ref$filterOptions,
      _ref$onChange = _ref.onChange,
      onChange = _ref$onChange === void 0 ? function () {} : _ref$onChange,
      _ref$onFocus = _ref.onFocus,
      onFocus = _ref$onFocus === void 0 ? function () {} : _ref$onFocus,
      _ref$onBlur = _ref.onBlur,
      onBlur = _ref$onBlur === void 0 ? function () {} : _ref$onBlur,
      _ref$debounce = _ref.debounce,
      debounce = _ref$debounce === void 0 ? 0 : _ref$debounce;
  var ref = (0, _react.useRef)(null);

  var _useState = (0, _react.useState)(null),
      value = _useState[0],
      setValue = _useState[1];

  var _useState2 = (0, _react.useState)(''),
      search = _useState2[0],
      setSearch = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      focus = _useState3[0],
      setFocus = _useState3[1];

  var _useFetch = (0, _useFetch2["default"])(search, defaultOptions, {
    getOptions: getOptionsFn,
    filterOptions: filterOptions,
    debounceTime: debounce
  }),
      options = _useFetch.options,
      fetching = _useFetch.fetching;

  var onSelect = (0, _react.useCallback)(function (newValue) {
    var newOption = (0, _getOptions["default"])(newValue, value, Array.isArray(value) ? [].concat(value, options) : options, multiple);
    setValue(newOption);
    onChange((0, _getValues["default"])(newOption), newOption);

    if (closeOnSelect) {
      ref.current.blur();
    }
  }, [closeOnSelect, multiple, onChange, value, options]);

  var _useHighlight = (0, _useHighlight2["default"])(-1, options, onSelect, ref),
      highlighted = _useHighlight[0],
      keyboardEvents = _useHighlight[1];

  var snapshot = (0, _react.useMemo)(function () {
    return {
      options: (0, _groupOptions["default"])(options),
      option: value,
      displayValue: (0, _getDisplayValue["default"])(value),
      value: (0, _getValues["default"])(value),
      search: search,
      fetching: fetching,
      focus: focus,
      highlighted: highlighted,
      disabled: disabled
    };
  }, [disabled, fetching, focus, highlighted, search, value, options]);
  var onMouseDown = (0, _react.useCallback)(function (e) {
    e.preventDefault();
    onSelect(e.currentTarget.value);
  }, [onSelect]);
  var onFocusCb = (0, _react.useCallback)(function (e) {
    setFocus(true);
    onFocus(e);
  }, [onFocus]);
  var onBlurCb = (0, _react.useCallback)(function (e) {
    setFocus(false);
    setSearch('');
    onBlur(e);
  }, [onBlur]);
  var valueProps = (0, _react.useMemo)(function () {
    return _extends({
      tabIndex: '0',
      readOnly: !canSearch
    }, keyboardEvents, {
      onFocus: onFocusCb,
      onBlur: onBlurCb,
      onChange: canSearch ? function (_ref2) {
        var target = _ref2.target;
        return setSearch(target.value);
      } : null,
      disabled: disabled,
      ref: ref
    });
  }, [canSearch, keyboardEvents, onFocusCb, onBlurCb, disabled]);
  var optionProps = (0, _react.useMemo)(function () {
    return {
      tabIndex: '-1',
      onMouseDown: onMouseDown
    };
  }, [onMouseDown]);
  (0, _react.useEffect)(function () {
    setValue((0, _getOptions["default"])(defaultValue, null, options, multiple));
  }, [defaultValue, multiple, options]);
  return [snapshot, valueProps, optionProps, setValue];
}