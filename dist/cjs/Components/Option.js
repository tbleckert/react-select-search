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
      groupId = props.groupId,
      name = props.name,
      optionProps = props.optionProps,
      highlighted = props.highlighted,
      selected = props.selected,
      option = props.option,
      disabled = props.disabled;

  if (type && type === 'group') {
    return _react.default.createElement(_Group.default, _extends({}, props, {
      name: name,
      key: groupId
    }));
  }

  var ref = (0, _react.createRef)();
  var theme = (0, _react.useContext)(_Context.default);
  var scrollConf = {
    behavior: 'auto',
    block: 'center'
  };

  if (!theme.multiple) {
    (0, _react.useEffect)(function () {
      if (!selected) return;
      ref.current.scrollIntoView(scrollConf);
    }, [selected]);
  }

  (0, _react.useEffect)(function () {
    if (!highlighted) return;
    ref.current.scrollIntoView(scrollConf);
  }, [highlighted]);
  var renderOption = theme.renderers.option;
  var className = theme.classes.row;
  var optionSnapshot = {
    highlighted: highlighted,
    selected: selected
  };

  if (disabled) {
    className += ' is-disabled';
  }

  if (typeof renderOption === 'function') {
    return _react.default.createElement("li", {
      ref: ref,
      role: "presentation",
      className: className
    }, renderOption(optionProps, option, optionSnapshot));
  }

  return _react.default.createElement("li", {
    ref: ref,
    role: "presentation",
    className: className
  }, _react.default.createElement("button", _extends({}, optionProps, {
    type: "button"
  }), name));
};

Option.defaultProps = {
  groupId: null,
  type: null,
  selected: false,
  highlighted: false,
  disabled: false,
  items: [],
  optionProps: null,
  option: null,
  onChange: null
};
Option.propTypes = {
  highlighted: _propTypes.default.bool,
  selected: _propTypes.default.bool,
  disabled: _propTypes.default.bool,
  name: _propTypes.default.string.isRequired,
  optionProps: _propTypes.default.shape({
    'data-selected': _propTypes.default.string,
    role: _propTypes.default.string,
    onClick: _propTypes.default.func,
    className: _propTypes.default.string,
    disabled: _propTypes.default.bool
  }),
  items: _propTypes.default.arrayOf(_propTypes.default.object),
  groupId: _propTypes.default.string,
  type: _propTypes.default.string,
  option: _propTypes.default.shape({
    name: _propTypes.default.string.isRequired,
    value: _propTypes.default.string.isRequired
  })
};

var _default = (0, _react.memo)(Option);

exports.default = _default;