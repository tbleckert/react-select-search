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
      highlighted = props.highlighted,
      selected = props.selected,
      name = props.name,
      optionProps = props.optionProps;

  if (type && type === 'group') {
    return _react.default.createElement(_Group.default, _extends({}, props, {
      name: name,
      key: groupId
    }));
  }

  var theme = (0, _react.useContext)(_Context.default);
  var className = theme.classes.option;

  if (highlighted) {
    className += ' is-highlighted';
  }

  if (selected) {
    className += ' is-selected';
  }

  return _react.default.createElement("li", _extends({}, optionProps, {
    className: className
  }), theme.renderers.option(props));
};

Option.defaultProps = {
  groupId: null,
  type: null,
  selected: false,
  highlighted: false,
  items: [],
  optionProps: null
};
Option.propTypes = {
  highlighted: _propTypes.default.bool,
  selected: _propTypes.default.bool,
  name: _propTypes.default.string.isRequired,
  optionProps: _propTypes.default.shape({
    'data-selected': _propTypes.default.string,
    role: _propTypes.default.string,
    onClick: _propTypes.default.func
  }),
  items: _propTypes.default.arrayOf(_propTypes.default.object),
  groupId: _propTypes.default.string,
  type: _propTypes.default.string
};

var _default = (0, _react.memo)(Option);

exports.default = _default;