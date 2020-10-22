"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Value = function Value(_ref) {
  var search = _ref.search,
      placeholder = _ref.placeholder,
      multiple = _ref.multiple,
      snapshot = _ref.snapshot,
      cls = _ref.cls,
      autoFocus = _ref.autoFocus,
      autoComplete = _ref.autoComplete,
      renderValue = _ref.renderValue,
      valueProps = _ref.valueProps;
  var inputValue = snapshot.focus && search ? snapshot.search : snapshot.displayValue;
  var shouldRender = !multiple || placeholder || search;

  if (!shouldRender) {
    return null;
  }

  return /*#__PURE__*/_react["default"].createElement("div", {
    className: cls('value')
  }, renderValue(_objectSpread(_objectSpread({}, valueProps), {}, {
    placeholder: placeholder,
    autoFocus: autoFocus,
    autoComplete: autoComplete,
    value: inputValue
  }), snapshot, cls('input')));
};

Value.defaultProps = {
  placeholder: null
};
Value.propTypes = process.env.NODE_ENV !== "production" ? {
  search: _propTypes["default"].bool.isRequired,
  multiple: _propTypes["default"].bool.isRequired,
  autoFocus: _propTypes["default"].bool.isRequired,
  autoComplete: _propTypes["default"].string.isRequired,
  placeholder: _propTypes["default"].string,
  valueProps: _propTypes["default"].shape({
    tabIndex: _propTypes["default"].string,
    readOnly: _propTypes["default"].bool,
    onFocus: _propTypes["default"].func,
    onBlur: _propTypes["default"].func,
    onKeyPress: _propTypes["default"].func,
    onKeyDown: _propTypes["default"].func,
    onKeyUp: _propTypes["default"].func,
    onChange: _propTypes["default"].func,
    disabled: _propTypes["default"].bool,
    ref: _propTypes["default"].oneOfType([_propTypes["default"].func, _propTypes["default"].shape({
      current: _propTypes["default"].instanceOf(Element)
    })])
  }).isRequired,
  snapshot: _propTypes["default"].shape({
    focus: _propTypes["default"].bool.isRequired,
    search: _propTypes["default"].string.isRequired,
    displayValue: _propTypes["default"].string.isRequired
  }).isRequired,
  cls: _propTypes["default"].func.isRequired,
  renderValue: _propTypes["default"].func.isRequired
} : {};

var _default = /*#__PURE__*/(0, _react.memo)(Value);

exports["default"] = _default;