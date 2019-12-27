"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Option = _interopRequireDefault(require("./Option"));

var _types = require("../types");

var _isSelected = _interopRequireDefault(require("../lib/isSelected"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var Options = function Options(_ref) {
  var options = _ref.options,
      optionProps = _ref.optionProps,
      snapshot = _ref.snapshot,
      className = _ref.className,
      renderGroupHeader = _ref.renderGroupHeader,
      renderOption = _ref.renderOption;
  return _react.default.createElement("ul", {
    className: className('options')
  }, options.map(function (option) {
    if (option.type === 'group') {
      return _react.default.createElement("li", {
        role: "none",
        className: className('row'),
        key: option.groupId
      }, _react.default.createElement("div", {
        className: className('group')
      }, _react.default.createElement("div", {
        className: className('group-header')
      }, renderGroupHeader(option.name)), _react.default.createElement(Options, {
        options: option.items,
        snapshot: snapshot,
        optionProps: optionProps,
        className: className,
        renderOption: renderOption
      })));
    }

    return _react.default.createElement(_Option.default, _extends({
      key: option.value,
      className: className,
      optionProps: optionProps,
      selected: (0, _isSelected.default)(option.value, snapshot.value),
      highlighted: snapshot.highlighted === option.index,
      renderOption: renderOption
    }, option));
  }));
};

Options.defaultProps = {
  renderOption: null,
  renderGroupHeader: function renderGroupHeader(name) {
    return name;
  }
};
Options.propTypes = {
  options: _propTypes.default.arrayOf(_types.optionType).isRequired,
  snapshot: _propTypes.default.shape({
    value: _types.valueType,
    highlighted: _propTypes.default.number,
    focus: _propTypes.default.bool
  }).isRequired,
  optionProps: _propTypes.default.shape({
    tabIndex: _propTypes.default.string.isRequired,
    onMouseDown: _propTypes.default.func.isRequired
  }).isRequired,
  className: _propTypes.default.func.isRequired,
  renderOption: _propTypes.default.func,
  renderGroupHeader: _propTypes.default.func
};
var _default = Options;
exports.default = _default;