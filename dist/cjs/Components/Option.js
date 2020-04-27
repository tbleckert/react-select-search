"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const Option = (_ref) => {
  let {
    optionProps,
    highlighted,
    selected,
    className,
    renderOption
  } = _ref,
      option = _objectWithoutProperties(_ref, ["optionProps", "highlighted", "selected", "className", "renderOption"]);

  const optionRef = (0, _react.useRef)(null);
  const optionClass = [className('option'), selected ? className('is-selected') : false, highlighted ? className('is-highlighted') : false].filter(cls => !!cls).join(' ');
  (0, _react.useEffect)(() => {
    if (optionRef.current && (selected || highlighted)) {
      optionRef.current.scrollIntoView({
        behavior: 'auto',
        block: 'center'
      });
    }
  }, [optionRef, selected, highlighted]);

  const domProps = _objectSpread({}, optionProps, {
    value: option.value,
    disabled: option.disabled
  });

  const comp = renderOption ? renderOption(domProps, option, {
    selected,
    highlighted
  }, optionClass) : /*#__PURE__*/_react.default.createElement("button", _extends({
    className: optionClass
  }, domProps), option.name);
  return /*#__PURE__*/_react.default.createElement("li", {
    ref: optionRef,
    className: className('row'),
    role: "menuitem",
    key: option.value
  }, comp);
};

Option.defaultProps = {
  type: null,
  disabled: false,
  index: null,
  value: null,
  renderOption: null
};
Option.propTypes = {
  name: _propTypes.default.string.isRequired,
  value: _propTypes.default.string,
  type: _propTypes.default.string,
  disabled: _propTypes.default.bool,
  index: _propTypes.default.number,
  highlighted: _propTypes.default.bool.isRequired,
  selected: _propTypes.default.bool.isRequired,
  optionProps: _propTypes.default.shape({
    tabIndex: _propTypes.default.string.isRequired,
    onMouseDown: _propTypes.default.func.isRequired
  }).isRequired,
  className: _propTypes.default.func.isRequired,
  renderOption: _propTypes.default.func
};
var _default = Option;
exports.default = _default;