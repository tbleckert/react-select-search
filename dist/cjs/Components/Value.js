"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Context = _interopRequireDefault(require("../Context"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var Value = (0, _react.forwardRef)(function (_ref, ref) {
  var option = _ref.option,
      searching = _ref.searching,
      error = _ref.error,
      valueProps = _objectWithoutProperties(_ref, ["option", "searching", "error"]);

  var theme = (0, _react.useContext)(_Context.default);
  var className = theme.classes.value;

  if (searching) {
    className += ' is-searching';
  }

  var content = typeof theme.renderers.value === 'function' ? theme.renderers.value(valueProps, ref, option, {
    searching: searching,
    error: error
  }) : _react.default.createElement("input", _extends({
    ref: ref
  }, valueProps));
  return _react.default.createElement("div", {
    className: className
  }, content);
});
Value.defaultProps = {
  placeholder: '',
  onChange: null,
  type: 'text',
  option: null,
  className: null
};
Value.propTypes = {
  tabIndex: _propTypes.default.string.isRequired,
  onFocus: _propTypes.default.func.isRequired,
  onBlur: _propTypes.default.func.isRequired,
  readOnly: _propTypes.default.bool.isRequired,
  value: _propTypes.default.string.isRequired,
  searching: _propTypes.default.bool.isRequired,
  error: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.object, _propTypes.default.string]).isRequired,
  option: _propTypes.default.shape({
    value: _propTypes.default.string,
    name: _propTypes.default.string
  }),
  placeholder: _propTypes.default.string,
  onChange: _propTypes.default.func,
  type: _propTypes.default.string,
  className: _propTypes.default.string
};

var _default = (0, _react.memo)(Value);

exports.default = _default;