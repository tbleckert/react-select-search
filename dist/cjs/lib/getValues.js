"use strict";

exports.__esModule = true;
exports["default"] = getValues;

var _getValue = _interopRequireDefault(require("./getValue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getValues(options) {
  if (Array.isArray(options)) {
    return options.map(function (o) {
      return (0, _getValue["default"])(o);
    }).filter(function (v) {
      return v !== null;
    });
  }

  return (0, _getValue["default"])(options);
}