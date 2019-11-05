"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Context = _interopRequireDefault(require("../Context"));

var _Group = _interopRequireDefault(require("./Group"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var Option = function Option(props) {
  var type = props.type,
      name = props.name,
      value = props.value,
      index = props.index,
      disabled = props.disabled,
      onChange = props.onChange,
      snapshot = props.snapshot;

  if (type && type === 'group') {
    return _react.default.createElement(_Group.default, props);
  }

  var ref = (0, _react.createRef)();
  var theme = (0, _react.useContext)(_Context.default);
  var highlighted = index === snapshot.highlighted;
  var selected = Array.isArray(snapshot.value) && snapshot.value.indexOf(value) >= 0 || value === snapshot.value;
  var scrollConf = {
    behavior: 'auto',
    block: 'center'
  };

  if (!theme.multiple) {
    (0, _react.useEffect)(function () {
      if (!selected) return;
      ref.current.scrollIntoView(scrollConf);
    }, [selected, snapshot.focus]);
  }

  (0, _react.useEffect)(function () {
    if (!highlighted) return;
    ref.current.scrollIntoView(scrollConf);
  }, [highlighted]);
  var optionClass = [theme.classes.option];

  if (selected) {
    optionClass.push('is-selected');
  }

  if (highlighted) {
    optionClass.push('is-highlighted');
  }

  var renderOption = theme.renderers.option;
  var optionSnapshot = {
    highlighted: highlighted,
    selected: selected
  };
  var optionProps = {
    disabled: disabled,
    value: value,
    className: optionClass.join(' '),
    onClick: onChange,
    tabIndex: -1,
    role: 'menuitem',
    'data-selected': selected ? 'true' : null,
    'data-highlighted': highlighted ? 'true' : null,
    key: value
  };
  var className = theme.classes.row;

  if (disabled) {
    className += ' is-disabled';
  }

  if (typeof renderOption === 'function') {
    return _react.default.createElement("li", {
      ref: ref,
      key: value,
      role: "presentation",
      className: className
    }, renderOption(optionProps, props, optionSnapshot));
  }

  return _react.default.createElement("li", {
    ref: ref,
    key: value,
    role: "presentation",
    className: className
  }, _react.default.createElement("button", _extends({}, optionProps, {
    type: "button"
  }), name));
};

Option.defaultProps = {
  type: null,
  groupId: null,
  disabled: false,
  index: null,
  value: null,
  items: null
};
Option.propTypes = {
  name: _propTypes.default.string.isRequired,
  value: _propTypes.default.string,
  type: _propTypes.default.string,
  groupId: _propTypes.default.string,
  items: _propTypes.default.arrayOf(_propTypes.default.object),
  disabled: _propTypes.default.bool,
  onChange: _propTypes.default.func.isRequired,
  index: _propTypes.default.number,
  snapshot: _propTypes.default.shape({
    value: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.arrayOf(_propTypes.default.string)]),
    highlighted: _propTypes.default.number,
    focus: _propTypes.default.bool
  }).isRequired
};

var _default = (0, _react.memo)(Option);

exports.default = _default;