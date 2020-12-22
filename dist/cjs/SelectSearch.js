"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime");

var _react = require("react");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _useSelect2 = _interopRequireDefault(require("./useSelect"));

var _types = require("./types");

var _Options = _interopRequireDefault(require("./Components/Options"));

var _useClassName = _interopRequireDefault(require("./useClassName"));

var _classes2 = _interopRequireDefault(require("./lib/classes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var SelectSearch = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var _classes;

  var defaultValue = _ref.value,
      disabled = _ref.disabled,
      placeholder = _ref.placeholder,
      multiple = _ref.multiple,
      search = _ref.search,
      autoFocus = _ref.autoFocus,
      autoComplete = _ref.autoComplete,
      defaultOptions = _ref.options,
      id = _ref.id,
      onChange = _ref.onChange,
      onFocus = _ref.onFocus,
      onBlur = _ref.onBlur,
      printOptions = _ref.printOptions,
      closeOnSelect = _ref.closeOnSelect,
      className = _ref.className,
      renderValue = _ref.renderValue,
      renderOption = _ref.renderOption,
      renderGroupHeader = _ref.renderGroupHeader,
      getOptions = _ref.getOptions,
      filterOptions = _ref.filterOptions,
      debounce = _ref.debounce,
      emptyMessage = _ref.emptyMessage;
  var cls = (0, _useClassName["default"])(className);

  var _useSelect = (0, _useSelect2["default"])({
    options: defaultOptions,
    value: defaultValue === null && (placeholder || multiple) ? '' : defaultValue,
    multiple: multiple,
    disabled: disabled,
    search: search,
    onChange: onChange,
    onFocus: onFocus,
    onBlur: onBlur,
    closeOnSelect: closeOnSelect && (!multiple || ['on-focus', 'always'].includes(printOptions)),
    getOptions: getOptions,
    filterOptions: filterOptions,
    debounce: debounce
  }),
      snapshot = _useSelect[0],
      valueProps = _useSelect[1],
      optionProps = _useSelect[2];

  var wrapperClass = (0, _classes2["default"])((_classes = {}, _classes[cls('container')] = true, _classes[cls('is-disabled')] = disabled, _classes[cls('is-loading')] = snapshot.fetching, _classes[cls('has-focus')] = snapshot.focus, _classes));
  var shouldRenderOptions;

  switch (printOptions) {
    case 'never':
      shouldRenderOptions = false;
      break;

    case 'always':
      shouldRenderOptions = true;
      break;

    case 'on-focus':
      shouldRenderOptions = snapshot.focus;
      break;

    default:
      shouldRenderOptions = !disabled && (snapshot.focus || multiple);
      break;
  }

  var shouldRenderValue = !multiple || placeholder || search;

  var props = _extends({}, valueProps, {
    placeholder: placeholder,
    autoFocus: autoFocus,
    autoComplete: autoComplete,
    value: snapshot.focus && search ? snapshot.search : snapshot.displayValue
  });

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    ref: ref,
    className: wrapperClass,
    id: id,
    children: [shouldRenderValue && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: cls('value'),
      children: [renderValue && renderValue(props, snapshot, cls('input')), !renderValue && /*#__PURE__*/(0, _jsxRuntime.jsx)("input", _extends({}, props, {
        className: cls('input')
      }))]
    }), shouldRenderOptions && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Options["default"], {
      options: snapshot.options,
      optionProps: optionProps,
      snapshot: snapshot,
      cls: cls,
      emptyMessage: emptyMessage,
      renderOption: renderOption,
      renderGroupHeader: renderGroupHeader
    })]
  });
});
SelectSearch.defaultProps = {
  // Data
  getOptions: null,
  filterOptions: null,
  value: null,
  // Interaction
  multiple: false,
  search: false,
  disabled: false,
  printOptions: 'auto',
  closeOnSelect: true,
  debounce: 0,
  // Attributes
  placeholder: null,
  id: null,
  autoFocus: false,
  autoComplete: 'on',
  // Design
  className: 'select-search',
  // Renderers
  renderOption: undefined,
  renderGroupHeader: undefined,
  renderValue: undefined,
  emptyMessage: null,
  // Events
  onChange: function onChange() {},
  onFocus: function onFocus() {},
  onBlur: function onBlur() {}
};
SelectSearch.propTypes = process.env.NODE_ENV !== "production" ? {
  // Data
  options: _propTypes["default"].arrayOf(_types.optionType).isRequired,
  getOptions: _propTypes["default"].func,
  filterOptions: _propTypes["default"].func,
  value: _types.valueType,
  // Interaction
  multiple: _propTypes["default"].bool,
  search: _propTypes["default"].bool,
  disabled: _propTypes["default"].bool,
  printOptions: _propTypes["default"].oneOf(['auto', 'always', 'never', 'on-focus']),
  closeOnSelect: _propTypes["default"].bool,
  debounce: _propTypes["default"].number,
  // Attributes
  placeholder: _propTypes["default"].string,
  id: _propTypes["default"].string,
  autoComplete: _propTypes["default"].string,
  autoFocus: _propTypes["default"].bool,
  // Design
  className: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].func]),
  // Renderers
  renderOption: _propTypes["default"].func,
  renderGroupHeader: _propTypes["default"].func,
  renderValue: _propTypes["default"].func,
  emptyMessage: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].func]),
  // Events
  onChange: _propTypes["default"].func,
  onFocus: _propTypes["default"].func,
  onBlur: _propTypes["default"].func
} : {};

var _default = /*#__PURE__*/(0, _react.memo)(SelectSearch);

exports["default"] = _default;