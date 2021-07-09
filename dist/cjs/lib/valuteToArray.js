"use strict";

exports.__esModule = true;
exports["default"] = valueToArray;

function valueToArray(value) {
  if (!value) {
    return [];
  }

  return !Array.isArray(value) ? [value] : [].concat(value);
}