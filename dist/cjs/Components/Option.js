"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime");

var _react = require("react");

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var Option = function Option(_ref) {
  var optionProps = _ref.optionProps,
      highlighted = _ref.highlighted,
      selected = _ref.selected,
      cls = _ref.cls,
      renderOption = _ref.renderOption,
      option = _objectWithoutPropertiesLoose(_ref, ["optionProps", "highlighted", "selected", "cls", "renderOption"]);

  var optionClass = [cls('option'), selected ? cls('is-selected') : false, highlighted ? cls('is-highlighted') : false].filter(function (single) {
    return !!single;
  }).join(' ');

  var domProps = _extends({}, optionProps, {
    value: option.value,
    disabled: option.disabled
  });

  return /*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
    className: cls('row'),
    role: "menuitem",
    "data-index": option.index,
    "data-value": escape(option.value),
    children: renderOption(domProps, option, {
      selected: selected,
      highlighted: highlighted
    }, optionClass)
  }, option.value);
};

Option.defaultProps = {
  disabled: false,
  index: null,
  value: null,
  renderOption: function renderOption(domProps, option, snapshot, className) {
    return (
      /*#__PURE__*/
      // eslint-disable-next-line react/button-has-type
      (0, _jsxRuntime.jsx)("button", _extends({
        className: className
      }, domProps, {
        children: option.name
      }))
    );
  }
};
Option.propTypes = process.env.NODE_ENV !== "production" ? {
  name: _propTypes["default"].string.isRequired,
  value: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),
  disabled: _propTypes["default"].bool,
  index: _propTypes["default"].number,
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