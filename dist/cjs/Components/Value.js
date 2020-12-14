"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime");

var _react = require("react");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Context = _interopRequireDefault(require("../Context"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var Value = function Value(_ref) {
  var search = _ref.search,
      placeholder = _ref.placeholder,
      multiple = _ref.multiple,
      snapshot = _ref.snapshot,
      autoFocus = _ref.autoFocus,
      autoComplete = _ref.autoComplete,
      valueProps = _ref.valueProps;

  var _useContext = (0, _react.useContext)(_Context["default"]),
      cls = _useContext.cls,
      renderValue = _useContext.renderValue;

  var inputValue = snapshot.focus && search ? snapshot.search : snapshot.displayValue;
  var shouldRender = !multiple || placeholder || search;

  if (!shouldRender) {
    return null;
  }

  var props = _extends({}, valueProps, {
    placeholder: placeholder,
    autoFocus: autoFocus,
    autoComplete: autoComplete,
    value: inputValue
  });

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: cls('value'),
    children: [renderValue && renderValue(props, snapshot, cls('input')), !renderValue && /*#__PURE__*/(0, _jsxRuntime.jsx)("input", _extends({}, props, {
      className: cls('input')
    }))]
  });
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
  }).isRequired
} : {};

var _default = /*#__PURE__*/(0, _react.memo)(Value);

exports["default"] = _default;