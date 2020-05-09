"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var Value = function Value(_ref) {
  var search = _ref.search,
      disabled = _ref.disabled,
      valueProps = _ref.valueProps,
      className = _ref.className,
      displayValue = _ref.displayValue,
      placeholder = _ref.placeholder,
      autoFocus = _ref.autoFocus;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: className('value')
  }, search && /*#__PURE__*/_react["default"].createElement("input", _extends({}, valueProps, {
    value: displayValue,
    autoFocus: autoFocus,
    placeholder: placeholder,
    disabled: disabled,
    className: className('input')
  })), !search && /*#__PURE__*/_react["default"].createElement("input", _extends({}, valueProps, {
    disabled: disabled,
    className: className('input'),
    autoFocus: autoFocus,
    value: displayValue,
    placeholder: placeholder
  })));
};

Value.defaultProps = {
  disabled: false,
  search: false,
  autoFocus: false,
  autoComplete: 'on',
  placeholder: null,
  displayValue: null
};
Value.propTypes = process.env.NODE_ENV !== "production" ? {
  className: _propTypes["default"].func.isRequired,
  displayValue: _propTypes["default"].string,
  valueProps: _propTypes["default"].shape({
    onBlur: _propTypes["default"].func.isRequired,
    onFocus: _propTypes["default"].func.isRequired,
    tabIndex: _propTypes["default"].string,
    onChange: _propTypes["default"].func
  }).isRequired,
  disabled: _propTypes["default"].bool,
  search: _propTypes["default"].bool,
  autoComplete: _propTypes["default"].string,
  placeholder: _propTypes["default"].string,
  autoFocus: _propTypes["default"].bool
} : {};

var _default = (0, _react.memo)(Value);

exports["default"] = _default;