"use strict";

exports.__esModule = true;
exports["default"] = getValue;

var _isOption = _interopRequireDefault(require("./isOption"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getValue(option) {
  if (!option) {
    return null;
  }

  return (0, _isOption["default"])(option) ? option.value : null;
}