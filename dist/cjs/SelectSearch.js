"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _useSelect3 = _interopRequireDefault(require("./useSelect"));

var _Value = _interopRequireDefault(require("./Components/Value"));

var _Options = _interopRequireDefault(require("./Components/Options"));

var _flattenOptions = _interopRequireDefault(require("./lib/flattenOptions"));

var _types = require("./types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var SelectSearch = (0, _react.forwardRef)(function (_ref, ref) {
  var defaultValue = _ref.value,
      disabled = _ref.disabled,
      placeholder = _ref.placeholder,
      multiple = _ref.multiple,
      search = _ref.search,
      autoFocus = _ref.autoFocus,
      autoComplete = _ref.autoComplete,
      defaultOptions = _ref.options,
      onChange = _ref.onChange,
      className = _ref.className,
      renderValue = _ref.renderValue,
      renderOption = _ref.renderOption,
      renderGroupHeader = _ref.renderGroupHeader,
      fuse = _ref.fuse;

  var _useSelect = (0, _useSelect3.default)({
    options: defaultOptions,
    value: defaultValue,
    multiple: multiple,
    disabled: disabled,
    fuse: fuse,
    search: search,
    onChange: onChange
  }),
      _useSelect2 = _slicedToArray(_useSelect, 3),
      snapshot = _useSelect2[0],
      valueProps = _useSelect2[1],
      optionProps = _useSelect2[2];

  var options = snapshot.options;
  var flatOptions = (0, _react.useMemo)(function () {
    return (0, _flattenOptions.default)(options);
  }, [options]);
  var classNameFn = (0, _react.useMemo)(function () {
    return typeof className === 'string' ? function (key) {
      if (key === 'container') {
        return 'select-search';
      }

      if (key.indexOf('is-') === 0) {
        return key;
      }

      return "select-search__".concat(key);
    } : className;
  }, [className]);
  var displayValue = snapshot.displayValue;

  if (!placeholder && !displayValue && flatOptions.length) {
    displayValue = flatOptions[0].name;
  }

  var wrapperClass = classNameFn('container');

  if (multiple) {
    wrapperClass += " ".concat(wrapperClass, "--multiple");
  }

  if (search) {
    wrapperClass += " ".concat(wrapperClass, "--search");
  }

  var value = displayValue;

  if ((snapshot.focus || multiple) && search) {
    value = snapshot.search;
  }

  var valueComp = renderValue ? _react.default.createElement("div", {
    className: classNameFn('value')
  }, renderValue(_objectSpread({}, valueProps, {
    placeholder: search ? placeholder : null,
    autoFocus: search ? autoFocus : null,
    autoComplete: search ? autoComplete : null,
    value: search ? value : null
  }), _objectSpread({}, snapshot, {
    displayValue: displayValue
  }), classNameFn('input'))) : _react.default.createElement(_Value.default, {
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
  return _react.default.createElement("div", {
    ref: ref,
    className: wrapperClass
  }, (!multiple || search) && valueComp, !disabled && (snapshot.focus || multiple) && _react.default.createElement("div", {
    className: classNameFn('select')
  }, _react.default.createElement(_Options.default, {
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
  onChange: function onChange() {},
  renderOption: null,
  renderGroupHeader: function renderGroupHeader(name) {
    return name;
  },
  renderValue: null,
  fuse: {
    keys: ['name', 'groupName'],
    threshold: 0.3
  }
};
SelectSearch.propTypes = {
  options: _propTypes.default.arrayOf(_types.optionType).isRequired,
  value: _types.valueType,
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