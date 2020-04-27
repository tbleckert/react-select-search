"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getDisplayValue;

function getDisplayValue(value) {
  if (value && typeof value === 'object') {
    if (Array.isArray(value)) {
      return value.map(singleOption => singleOption.name).join(', ');
    }

    return value.name;
  }

  return '';
}