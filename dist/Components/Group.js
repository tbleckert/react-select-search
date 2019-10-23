"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Context = _interopRequireDefault(require("../Context"));

var _Options = _interopRequireDefault(require("./Options"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var Group = function Group(props) {
  var classes = (0, _react.useContext)(_Context.default);
  return _react.default.createElement("li", {
    className: classes.row,
    key: props.groupId
  }, _react.default.createElement("div", {
    className: classes.group
  }, _react.default.createElement("div", {
    className: classes.groupHeader
  }, props.name), _react.default.createElement(_Options.default, {
    options: props.items
  })));
};

var _default = (0, _react.memo)(Group);

exports.default = _default;