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

  var domProps = _objectSpread(_objectSpread({}, optionProps), {}, {
    value: option._id,
    disabled: option.disabled
  });

  return /*#__PURE__*/_react["default"].createElement("li", {
    className: cls('row'),
    role: "menuitem",
    "data-index": option.index,
    "data-value": escape(option.value),
    key: option.value
  }, renderOption(domProps, option, {
    selected: selected,
    highlighted: highlighted
  }, optionClass));
};

Option.defaultProps = {
  disabled: false,
  index: null,
  value: null
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
  renderOption: _propTypes["default"].func.isRequired
} : {};

var _default = (0, _react.memo)(Option);

exports["default"] = _default;