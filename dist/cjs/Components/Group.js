"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Context = _interopRequireDefault(require("../Context"));

var _Options = _interopRequireDefault(require("./Options"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var Group = function Group(props) {
  var theme = (0, _react.useContext)(_Context.default);
  var className = "".concat(theme.classes.row, " ").concat(theme.classes.row, "--group");
  var render = theme.renderers.groupHeader;
  var onChange = props.onChange,
      snapshot = props.snapshot;
  var name = props.name;

  if (typeof render === 'function') {
    name = render(name);
  }

  return _react.default.createElement("li", {
    className: className,
    role: "none",
    key: props.groupId
  }, _react.default.createElement("div", {
    className: theme.classes.group
  }, _react.default.createElement("div", {
    className: theme.classes.groupHeader
  }, name), _react.default.createElement(_Options.default, {
    options: props.items,
    onChange: onChange,
    snapshot: snapshot
  })));
};

Group.propTypes = {
  groupId: _propTypes.default.string.isRequired,
  name: _propTypes.default.string.isRequired,
  items: _propTypes.default.arrayOf(_propTypes.default.object).isRequired,
  onChange: _propTypes.default.func.isRequired,
  snapshot: _propTypes.default.shape({
    value: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.arrayOf(_propTypes.default.string)]),
    highlighted: _propTypes.default.number
  }).isRequired
};

var _default = (0, _react.memo)(Group);

exports.default = _default;