"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _useSelect = _interopRequireDefault(require("./useSelect"));

var _Value = _interopRequireDefault(require("./Components/Value"));

var _Options = _interopRequireDefault(require("./Components/Options"));

var _flattenOptions = _interopRequireDefault(require("./lib/flattenOptions"));

var _types = require("./types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const SelectSearch = (0, _react.forwardRef)(({
  value: defaultValue,
  disabled,
  placeholder,
  multiple,
  search,
  autoFocus,
  autoComplete,
  options: defaultOptions,
  onChange,
  className,
  renderValue,
  renderOption,
  renderGroupHeader,
  getOptions,
  fuse
}, ref) => {
  const [snapshot, valueProps, optionProps] = (0, _useSelect.default)({
    options: defaultOptions,
    value: defaultValue,
    multiple,
    disabled,
    fuse,
    search,
    onChange,
    getOptions
  });
  const {
    options
  } = snapshot;
  const flatOptions = (0, _react.useMemo)(() => (0, _flattenOptions.default)(options), [options]);
  const classNameFn = (0, _react.useMemo)(() => typeof className === 'string' ? key => {
    if (key === 'container') {
      return 'select-search';
    }

    if (key.indexOf('is-') === 0) {
      return key;
    }

    return `select-search__${key}`;
  } : className, [className]);
  let {
    displayValue
  } = snapshot;

  if (!placeholder && !displayValue && flatOptions.length) {
    displayValue = flatOptions[0].name;
  }

  let wrapperClass = classNameFn('container');

  if (multiple) {
    wrapperClass += ` ${wrapperClass}--multiple`;
  }

  if (search) {
    wrapperClass += ` ${wrapperClass}--search`;
  }

  if (snapshot.searching) {
    wrapperClass += ` ${classNameFn('is-searching')}`;
  }

  let value = displayValue;

  if ((snapshot.focus || multiple) && search) {
    value = snapshot.search;
  }

  const valueComp = renderValue ? /*#__PURE__*/_react.default.createElement("div", {
    className: classNameFn('value')
  }, renderValue(_objectSpread({}, valueProps, {
    placeholder: search ? placeholder : null,
    autoFocus: search ? autoFocus : null,
    autoComplete: search ? autoComplete : null,
    value: search ? value : null
  }), _objectSpread({}, snapshot, {
    displayValue
  }), classNameFn('input'))) : /*#__PURE__*/_react.default.createElement(_Value.default, {
    snapshot: snapshot,
    disabled: disabled,
    search: search,
    autoFocus: autoFocus,
    displayValue: value,
    className: classNameFn,
    valueProps: valueProps,
    autoComplete: autoComplete,
    placeholder: placeholder,
    multiple: multiple,
    render: renderValue
  });
  return /*#__PURE__*/_react.default.createElement("div", {
    ref: ref,
    className: wrapperClass
  }, (!multiple || search) && valueComp, !disabled && (snapshot.focus || multiple) && /*#__PURE__*/_react.default.createElement("div", {
    className: classNameFn('select')
  }, /*#__PURE__*/_react.default.createElement(_Options.default, {
    options: snapshot.options,
    snapshot: snapshot,
    optionProps: optionProps,
    className: classNameFn,
    renderOption: renderOption,
    renderGroupHeader: renderGroupHeader
  })));
});
SelectSearch.defaultProps = {
  className: 'select-search',
  disabled: false,
  search: false,
  multiple: false,
  placeholder: null,
  autoFocus: false,
  autoComplete: 'on',
  value: '',
  onChange: () => {},
  renderOption: null,
  renderGroupHeader: name => name,
  renderValue: null,
  fuse: {
    keys: ['name', 'groupName'],
    threshold: 0.3
  },
  getOptions: null
};
SelectSearch.propTypes = {
  options: _propTypes.default.arrayOf(_types.optionType).isRequired,
  getOptions: _propTypes.default.func,
  value: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.arrayOf(_propTypes.default.string)]),
  className: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func]),
  multiple: _propTypes.default.bool,
  search: _propTypes.default.bool,
  disabled: _propTypes.default.bool,
  placeholder: _propTypes.default.string,
  autoComplete: _propTypes.default.oneOf(['on', 'off']),
  autoFocus: _propTypes.default.bool,
  onChange: _propTypes.default.func,
  renderOption: _propTypes.default.func,
  renderGroupHeader: _propTypes.default.func,
  renderValue: _propTypes.default.func,
  fuse: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.shape({
    keys: _propTypes.default.arrayOf(_propTypes.default.string),
    threshold: _propTypes.default.number
  })])
};

var _default = (0, _react.memo)(SelectSearch);

exports.default = _default;