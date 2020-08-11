"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _useSelect2 = _interopRequireDefault(require("./useSelect"));

var _types = require("./types");

var _Option = _interopRequireDefault(require("./Components/Option"));

var _isSelected = _interopRequireDefault(require("./lib/isSelected"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
      printOptions = _ref.printOptions,
      closeOnSelect = _ref.closeOnSelect,
      className = _ref.className,
      renderValue = _ref.renderValue,
      renderOption = _ref.renderOption,
      renderGroupHeader = _ref.renderGroupHeader,
      getOptions = _ref.getOptions,
      fuse = _ref.fuse;
  var selectRef = (0, _react.createRef)();

  var _useSelect = (0, _useSelect2["default"])({
    options: defaultOptions,
    value: defaultValue,
    multiple: multiple,
    disabled: disabled,
    fuse: fuse,
    search: search,
    onChange: onChange,
    getOptions: getOptions,
    closeOnSelect: closeOnSelect,
    closable: !multiple || printOptions === 'on-focus',
    allowEmpty: !!placeholder
  }),
      snapshot = _useSelect[0],
      valueProps = _useSelect[1],
      optionProps = _useSelect[2];

  var focus = snapshot.focus,
      highlighted = snapshot.highlighted,
      value = snapshot.value,
      options = snapshot.options,
      searching = snapshot.searching,
      displayValue = snapshot.displayValue,
      searchValue = snapshot.search;
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
  var wrapperClass = [cls('container'), disabled ? cls('is-disabled') : false, searching ? cls('is-loading') : false, focus ? cls('has-focus') : false].filter(function (single) {
    return !!single;
  }).join(' ');
  var inputValue = focus && search ? searchValue : displayValue;
  (0, _react.useEffect)(function () {
    var current = selectRef.current;

    if (!current) {
      return;
    }

    var query = null;

    if (highlighted > -1) {
      query = "[data-index=\"" + highlighted + "\"]";
    } else if (value && !multiple) {
      query = "[data-value=\"" + escape(value.value) + "\"]";
    }

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
    className: wrapperClass
  }, (!multiple || placeholder || search) && /*#__PURE__*/_react["default"].createElement("div", {
    className: cls('value')
  }, renderValue(_objectSpread(_objectSpread({}, valueProps), {}, {
    placeholder: placeholder,
    autoFocus: autoFocus,
    autoComplete: autoComplete,
    value: inputValue
  }), snapshot, cls('input'))), shouldRenderOptions && /*#__PURE__*/_react["default"].createElement("div", {
    className: cls('select'),
    ref: selectRef
  }, /*#__PURE__*/_react["default"].createElement("ul", {
    className: cls('options')
  }, options.map(function (option) {
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
        selected: (0, _isSelected["default"])(o, value),
        highlighted: highlighted === o.index
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
  }))));
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
  printOptions: 'auto',
  closeOnSelect: true,
  renderOption: function renderOption(domProps, option, snapshot, className) {
    return (
      /*#__PURE__*/
      // eslint-disable-next-line react/button-has-type
      _react["default"].createElement("button", _extends({
        className: className
      }, domProps), option.name)
    );
  },
  renderGroupHeader: function renderGroupHeader(name) {
    return name;
  },
  renderValue: function renderValue(valueProps, snapshot, className) {
    return /*#__PURE__*/_react["default"].createElement("input", _extends({}, valueProps, {
      className: className
    }));
  },
  fuse: {
    keys: ['name', 'groupName'],
    threshold: 0.3
  },
  getOptions: null
};
SelectSearch.propTypes = process.env.NODE_ENV !== "production" ? {
  options: _propTypes["default"].arrayOf(_types.optionType).isRequired,
  getOptions: _propTypes["default"].func,
  value: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number, _propTypes["default"].arrayOf(_propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]))]),
  className: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].func]),
  multiple: _propTypes["default"].bool,
  search: _propTypes["default"].bool,
  disabled: _propTypes["default"].bool,
  placeholder: _propTypes["default"].string,
  autoComplete: _propTypes["default"].string,
  autoFocus: _propTypes["default"].bool,
  onChange: _propTypes["default"].func,
  printOptions: _propTypes["default"].oneOf(['auto', 'always', 'never', 'on-focus']),
  closeOnSelect: _propTypes["default"].bool,
  renderOption: _propTypes["default"].func,
  renderGroupHeader: _propTypes["default"].func,
  renderValue: _propTypes["default"].func,
  fuse: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].shape({
    keys: _propTypes["default"].arrayOf(_propTypes["default"].string),
    threshold: _propTypes["default"].number
  })])
} : {};

var _default = (0, _react.memo)(SelectSearch);

exports["default"] = _default;