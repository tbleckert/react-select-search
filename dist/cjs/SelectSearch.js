"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _useSelect2 = _interopRequireDefault(require("./useSelect"));

var _types = require("./types");

var _fuzzySearch = _interopRequireDefault(require("./fuzzySearch"));

var _Value = _interopRequireDefault(require("./Components/Value"));

var _Options = _interopRequireDefault(require("./Components/Options"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var SelectSearch = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
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
      fuse = _ref.fuse,
      emptyMessage = _ref.emptyMessage;
  var selectRef = (0, _react.useRef)(null);

  var _useSelect = (0, _useSelect2["default"])({
    options: defaultOptions,
    value: defaultValue === null && (placeholder || multiple) ? '' : defaultValue,
    multiple: multiple,
    disabled: disabled,
    search: search,
    onChange: onChange,
    onFocus: onFocus,
    onBlur: onBlur,
    closeOnSelect: closeOnSelect,
    closable: !multiple || printOptions === 'on-focus',
    getOptions: getOptions,
    filterOptions: filterOptions,
    fuse: fuse,
    debounce: debounce
  }),
      snapshot = _useSelect[0],
      valueProps = _useSelect[1],
      optionProps = _useSelect[2];

  var focus = snapshot.focus,
      highlighted = snapshot.highlighted,
      value = snapshot.value,
      options = snapshot.options,
      fetching = snapshot.fetching;
  var cls = (0, _react.useCallback)(function (key) {
    if (typeof className === 'function') {
      return className(key);
    }

    if (key.indexOf('container') === 0) {
      return key.replace('container', className);
    }

    if (key.indexOf('is-') === 0 || key.indexOf('has-') === 0) {
      return key;
    }

    return className.split(' ')[0] + "__" + key;
  }, [className]);
  var wrapperClass = [cls('container'), disabled ? cls('is-disabled') : false, fetching ? cls('is-loading') : false, focus ? cls('has-focus') : false].filter(function (single) {
    return !!single;
  }).join(' ');
  (0, _react.useEffect)(function () {
    var current = selectRef.current;

    if (!current || multiple || highlighted < 0 && !value) {
      return;
    }

    var query = highlighted > -1 ? "[data-index=\"" + highlighted + "\"]" : "[data-value=\"" + escape(value.value) + "\"]";
    var selected = current.querySelector(query);

    if (selected) {
      var rect = current.getBoundingClientRect();
      var selectedRect = selected.getBoundingClientRect();
      current.scrollTop = selected.offsetTop - rect.height / 2 + selectedRect.height / 2;
    }
  }, [focus, value, highlighted, selectRef, multiple]);
  var shouldRenderOptions;

  switch (printOptions) {
    case 'never':
      shouldRenderOptions = false;
      break;

    case 'always':
      shouldRenderOptions = true;
      break;

    case 'on-focus':
      shouldRenderOptions = focus;
      break;

    default:
      shouldRenderOptions = !disabled && (focus || multiple);
      break;
  }

  return /*#__PURE__*/_react["default"].createElement("div", {
    ref: ref,
    className: wrapperClass,
    id: id
  }, /*#__PURE__*/_react["default"].createElement(_Value["default"], {
    valueProps: valueProps,
    placeholder: placeholder,
    multiple: multiple,
    search: search,
    autoComplete: autoComplete,
    autoFocus: autoFocus,
    snapshot: snapshot,
    cls: cls,
    renderValue: renderValue
  }), shouldRenderOptions && /*#__PURE__*/_react["default"].createElement("div", {
    className: cls('select'),
    ref: selectRef
  }, /*#__PURE__*/_react["default"].createElement(_Options["default"], {
    options: options,
    emptyMessage: emptyMessage,
    optionProps: optionProps,
    renderOption: renderOption,
    renderGroupHeader: renderGroupHeader,
    cls: cls,
    snapshot: snapshot
  })));
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
  fuse: {
    keys: ['name', 'groupName'],
    threshold: 0.3
  },
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
  value: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number, _propTypes["default"].arrayOf(_propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]))]),
  // Interaction
  multiple: _propTypes["default"].bool,
  search: _propTypes["default"].bool,
  disabled: _propTypes["default"].bool,
  printOptions: _propTypes["default"].oneOf(['auto', 'always', 'never', 'on-focus']),
  closeOnSelect: _propTypes["default"].bool,
  debounce: _propTypes["default"].number,
  fuse: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].shape({
    keys: _propTypes["default"].arrayOf(_propTypes["default"].string),
    threshold: _propTypes["default"].number
  })]),
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