"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useSelectSearch;

var _react = require("react");

var _getDisplayValue = _interopRequireDefault(require("./lib/getDisplayValue"));

var _FlattenOptions = _interopRequireDefault(require("./lib/FlattenOptions"));

var _GroupOptions = _interopRequireDefault(require("./lib/GroupOptions"));

var _getNewValue = _interopRequireDefault(require("./lib/getNewValue"));

var _getOption = _interopRequireDefault(require("./lib/getOption"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function highlightReducer(highlighted, value) {
  if (!value) {
    return -1;
  }

  var key = value.key,
      options = value.options;
  var newHighlighted = null;

  if (key === 'ArrowDown' && highlighted < options.length) {
    newHighlighted = highlighted + 1;
  } else if (key === 'ArrowDown' && highlighted >= options.length - 1) {
    newHighlighted = 0;
  } else if (key === 'ArrowUp' && highlighted > 0) {
    newHighlighted = highlighted - 1;
  } else if (key === 'ArrowUp' && highlighted <= 0) {
    newHighlighted = options.length - 1;
  }

  var option = options[newHighlighted];

  if (option && option.disabled) {
    return highlightReducer(newHighlighted, {
      key: key,
      options: options
    });
  }

  return newHighlighted;
}

function useSelectSearch(_ref) {
  var _ref$value = _ref.value,
      defaultValue = _ref$value === void 0 ? null : _ref$value,
      _ref$disabled = _ref.disabled,
      disabled = _ref$disabled === void 0 ? false : _ref$disabled,
      _ref$multiple = _ref.multiple,
      multiple = _ref$multiple === void 0 ? false : _ref$multiple,
      options = _ref.options;
  var searchProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var flat = (0, _react.useMemo)(function () {
    return (0, _FlattenOptions.default)(options);
  }, [options]);
  var groupedOptions = (0, _react.useMemo)(function () {
    return (0, _GroupOptions.default)(flat);
  }, [flat]);

  var _useState = (0, _react.useState)(defaultValue),
      _useState2 = _slicedToArray(_useState, 2),
      value = _useState2[0],
      setValue = _useState2[1];

  var selectedOption = (0, _react.useMemo)(function () {
    return (0, _getOption.default)(value, flat);
  }, [value, flat]);

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      focus = _useState4[0],
      setFocus = _useState4[1];

  var _useReducer = (0, _react.useReducer)(highlightReducer, -1),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      highlighted = _useReducer2[0],
      setHighlighted = _useReducer2[1];

  var onBlur = (0, _react.useCallback)(function () {
    setFocus(false);
    setHighlighted(false);

    if (searchProps) {
      searchProps.onBlur();
    }
  }, [searchProps]);
  var onFocus = (0, _react.useCallback)(function () {
    setFocus(true);
  }, []);

  var onChange = function onChange(e) {
    return setValue((0, _getNewValue.default)(e.currentTarget.value, value, multiple));
  };

  var onKeyDown = (0, _react.useCallback)(function (e) {
    return setHighlighted({
      key: e.key,
      options: flat
    });
  }, [flat]);
  var displayValue = (0, _react.useMemo)(function () {
    return (0, _getDisplayValue.default)(value, flat);
  }, [value, flat]);
  var onKeyPress = (0, _react.useCallback)(function (_ref2) {
    var key = _ref2.key;

    if (key === 'Enter') {
      var option = options[highlighted];

      if (option) {
        setValue((0, _getNewValue.default)(option.value, value, multiple));
      }
    }
  }, [options, highlighted, multiple, value]);
  var onKeyUp = (0, _react.useCallback)(function (_ref3) {
    var key = _ref3.key;

    if (key === 'Escape') {
      setFocus(false);
    }
  }, []);

  var valueProps = _objectSpread({}, searchProps, {
    tabIndex: '0',
    onBlur: onBlur,
    onFocus: onFocus,
    onKeyPress: onKeyPress,
    onKeyDown: onKeyDown,
    onKeyUp: onKeyUp
  });

  var optionProps = {
    tabIndex: '-1',
    onMouseDown: onChange
  };
  (0, _react.useEffect)(function () {
    setValue(defaultValue);
  }, [defaultValue]);
  return [{
    value: value,
    selectedOption: selectedOption,
    highlighted: highlighted,
    options: groupedOptions,
    disabled: disabled,
    displayValue: displayValue,
    focus: focus
  }, valueProps, optionProps, setValue];
}