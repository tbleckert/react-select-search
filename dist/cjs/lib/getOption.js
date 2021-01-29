"use strict";

exports.__esModule = true;
exports["default"] = getOption;

var _isOption = _interopRequireDefault(require("./isOption"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getOption(value, options) {
  if ((0, _isOption["default"])(value)) {
    return value;
  }

  var newValue = value === null && options.length ? options[0].value : value; // eslint-disable-next-line eqeqeq

  return options.find(function (o) {
    return o.value == newValue;
  });
}