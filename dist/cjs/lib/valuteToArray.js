"use strict";

exports.__esModule = true;
exports["default"] = valueToArray;

function valueToArray(value) {
  return !Array.isArray(value) ? [value] : value;
}