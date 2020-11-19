"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Option = _interopRequireDefault(require("./Option"));

var _isSelected = _interopRequireDefault(require("../lib/isSelected"));

var _types = require("../types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var Options = function Options(_ref) {
  var options = _ref.options,
      emptyMessage = _ref.emptyMessage,
      cls = _ref.cls,
      optionProps = _ref.optionProps,
      renderOption = _ref.renderOption,
      renderGroupHeader = _ref.renderGroupHeader,
      snapshot = _ref.snapshot;
  var renderEmptyMessage = (0, _react.useCallback)(function () {
    if (emptyMessage === null) {
      return null;
    }

    var content = typeof emptyMessage === 'function' ? emptyMessage() : emptyMessage;
    return /*#__PURE__*/_react["default"].createElement("li", {
      className: cls('not-found')
    }, content);
  }, [emptyMessage, cls]);
  return /*#__PURE__*/_react["default"].createElement("ul", {
    className: cls('options')
  }, options.length > 0 ? options.map(function (option) {
    var isGroup = option.type === 'group';
    var items = isGroup ? option.items : [option];
    var base = {
      cls: cls,
      optionProps: optionProps,
      renderOption: renderOption
    };
    var rendered = items.map(function (o) {
      return /*#__PURE__*/_react["default"].createElement(_Option["default"], _extends({
        key: o.value,
        selected: (0, _isSelected["default"])(o, snapshot.option),
        highlighted: snapshot.highlighted === o.index
      }, base, o));
    });

    if (isGroup) {
      return /*#__PURE__*/_react["default"].createElement("li", {
        role: "none",
        className: cls('row'),
        key: option.groupId
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: cls('group')
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: cls('group-header')
      }, renderGroupHeader(option.name)), /*#__PURE__*/_react["default"].createElement("ul", {
        className: cls('options')
      }, rendered)));
    }

    return rendered;
  }) : renderEmptyMessage() || null);
};

Options.defaultProps = {
  emptyMessage: null,
  renderOption: undefined,
  renderGroupHeader: function renderGroupHeader(name) {
    return name;
  }
};
Options.propTypes = process.env.NODE_ENV !== "production" ? {
  options: _propTypes["default"].arrayOf(_types.optionType).isRequired,
  cls: _propTypes["default"].func.isRequired,
  emptyMessage: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].func]),
  optionProps: _propTypes["default"].shape({
    tabIndex: _propTypes["default"].string.isRequired,
    onMouseDown: _propTypes["default"].func.isRequired
  }).isRequired,
  snapshot: _propTypes["default"].shape({
    highlighted: _propTypes["default"].number.isRequired,
    option: _propTypes["default"].oneOfType([_types.optionType, _propTypes["default"].arrayOf(_types.optionType)])
  }).isRequired,
  renderOption: _propTypes["default"].func,
  renderGroupHeader: _propTypes["default"].func
} : {};

var _default = /*#__PURE__*/(0, _react.memo)(Options);

exports["default"] = _default;