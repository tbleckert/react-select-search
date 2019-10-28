"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toString;

function toString(value) {
  if (typeof value === 'string') {
    return value;
  }

  if (typeof value === 'number') {
    return value.toString();
  }

  return '';
}