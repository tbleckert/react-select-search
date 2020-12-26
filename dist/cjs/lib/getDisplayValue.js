"use strict";

exports.__esModule = true;
exports["default"] = getDisplayValue;

var _isOption = _interopRequireDefault(require("./isOption"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getDisplayValue(value) {
  if (Array.isArray(value)) {
    return value.map(function (o) {
      return (0, _isOption["default"])(o) && o.name;
    }).join(', ');
  }

  return (0, _isOption["default"])(value) ? value.name : '';
}