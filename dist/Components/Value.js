"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var Value = (0, _react.forwardRef)(function (props, ref) {
  return _react.default.createElement("input", _extends({
    ref: ref,
    className: "select-search-box__search"
  }, props));
});
Value.defaultProps = {
  placeholder: '',
  onChange: null,
  type: 'text'
};
Value.propTypes = {
  tabIndex: _propTypes.default.string.isRequired,
  onFocus: _propTypes.default.func.isRequired,
  onClick: _propTypes.default.func.isRequired,
  readOnly: _propTypes.default.bool.isRequired,
  value: _propTypes.default.string.isRequired,
  placeholder: _propTypes.default.string,
  onChange: _propTypes.default.func,
  type: _propTypes.default.string
};

var _default = (0, _react.memo)(Value);

exports.default = _default;