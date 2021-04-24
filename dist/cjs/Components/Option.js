"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = require("react");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classes2 = _interopRequireDefault(require("../lib/classes"));

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var Option = function Option(_ref) {
  var _classes;

  var optionProps = _ref.optionProps,
      highlighted = _ref.highlighted,
      selected = _ref.selected,
      option = _ref.option,
      cls = _ref.cls,
      renderOption = _ref.renderOption;

  var props = _extends({}, optionProps, {
    value: option.value,
    disabled: option.disabled
  });

  var className = (0, _classes2["default"])((_classes = {}, _classes[cls('option')] = true, _classes[cls('is-selected')] = selected, _classes[cls('is-highlighted')] = highlighted, _classes));
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("li", {
    className: cls('row'),
    role: "menuitem",
    "data-index": option.index,
    "data-value": escape(option.value),
    children: [renderOption && renderOption(props, option, {
      selected: selected,
      highlighted: highlighted
    }, className), !renderOption && /*#__PURE__*/(0, _jsxRuntime.jsx)("button", _extends({
      type: "button",
      className: className
    }, props, {
      children: option.name
    }))]
  }, option.value);
};

Option.defaultProps = {
  renderOption: null
};
Option.propTypes = process.env.NODE_ENV !== "production" ? {
  option: _propTypes["default"].shape({
    name: _propTypes["default"].string.isRequired,
    value: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),
    disabled: _propTypes["default"].bool,
    index: _propTypes["default"].number
  }).isRequired,
  highlighted: _propTypes["default"].bool.isRequired,
  selected: _propTypes["default"].bool.isRequired,
  optionProps: _propTypes["default"].shape({
    tabIndex: _propTypes["default"].string.isRequired,
    onMouseDown: _propTypes["default"].func.isRequired
  }).isRequired,
  cls: _propTypes["default"].func.isRequired,
  renderOption: _propTypes["default"].func
} : {};

var _default = /*#__PURE__*/(0, _react.memo)(Option);

exports["default"] = _default;