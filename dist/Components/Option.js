"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Context = _interopRequireDefault(require("../Context"));

var _Group = _interopRequireDefault(require("./Group"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var Option = function Option(_ref) {
  var type = _ref.type,
      groupId = _ref.groupId,
      highlighted = _ref.highlighted,
      selected = _ref.selected,
      name = _ref.name,
      items = _ref.items,
      optionProps = _ref.optionProps;

  if (type && type === 'group') {
    return _react.default.createElement(_Group.default, {
      name: name,
      items: items,
      groupId: groupId,
      key: groupId
    });
  }

  var classes = (0, _react.useContext)(_Context.default);
  var className = classes.option;

  if (highlighted) {
    className += ' is-highlighted';
  }

  if (selected) {
    className += ' is-selected';
  }

  return _react.default.createElement("li", _extends({}, optionProps, {
    className: className
  }), name);
};

Option.defaultProps = {
  groupId: null,
  type: null,
  selected: false,
  highlighted: false,
  items: [],
  optionProps: null
};

var _default = (0, _react.memo)(Option);

exports.default = _default;