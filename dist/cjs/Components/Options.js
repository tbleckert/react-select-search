"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Option = _interopRequireDefault(require("./Option"));

var _types = require("../types");

var _isSelected = _interopRequireDefault(require("../lib/isSelected"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var Options = function Options(_ref) {
  var options = _ref.options,
      optionProps = _ref.optionProps,
      snapshot = _ref.snapshot,
      className = _ref.className,
      renderGroupHeader = _ref.renderGroupHeader,
      renderOption = _ref.renderOption;
  return /*#__PURE__*/_react["default"].createElement("ul", {
    className: className('options')
  }, options.map(function (option) {
    if (option.type === 'group') {
      return /*#__PURE__*/_react["default"].createElement("li", {
        role: "none",
        className: className('row'),
        key: option.groupId
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: className('group')
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: className('group-header')
      }, renderGroupHeader(option.name)), /*#__PURE__*/_react["default"].createElement(Options, {
        options: option.items,
        snapshot: snapshot,
        optionProps: optionProps,
        className: className,
        renderOption: renderOption
      })));
    }

    return /*#__PURE__*/_react["default"].createElement(_Option["default"], _extends({
      key: option.value,
      className: className,
      optionProps: optionProps,
      selected: (0, _isSelected["default"])(option, snapshot.value),
      highlighted: snapshot.highlighted === option.index,
      renderOption: renderOption
    }, option));
  }));
};

Options.propTypes = process.env.NODE_ENV !== "production" ? {
  options: _propTypes["default"].arrayOf(_types.optionType).isRequired,
  snapshot: _propTypes["default"].shape({
    value: _types.valueType,
    highlighted: _propTypes["default"].number,
    focus: _propTypes["default"].bool
  }).isRequired,
  optionProps: _propTypes["default"].shape({
    tabIndex: _propTypes["default"].string.isRequired,
    onMouseDown: _propTypes["default"].func.isRequired
  }).isRequired,
  className: _propTypes["default"].func.isRequired,
  renderOption: _propTypes["default"].func.isRequired,
  renderGroupHeader: _propTypes["default"].func.isRequired
} : {};

var _default = (0, _react.memo)(Options);

exports["default"] = _default;