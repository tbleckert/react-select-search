"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.classNameType = exports.valueType = exports.optionType = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const option = _propTypes.default.shape({
  name: _propTypes.default.string.isRequired,
  value: _propTypes.default.string.isRequired
});

const optionType = _propTypes.default.oneOfType([option, _propTypes.default.shape({
  name: _propTypes.default.string.isRequired,
  type: _propTypes.default.string.isRequired,
  items: _propTypes.default.arrayOf(option)
})]);

exports.optionType = optionType;

const valueType = _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.arrayOf(_propTypes.default.object)]);

exports.valueType = valueType;

const classNameType = _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func]);

exports.classNameType = classNameType;