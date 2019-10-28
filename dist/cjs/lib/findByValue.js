"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = findByValue;

function findByValue(source, value) {
  if (!source || !Array.isArray(source)) {
    return null;
  }

  return source.filter(function (object) {
    return object.value === value;
  })[0];
}