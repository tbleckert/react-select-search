"use strict";

exports.__esModule = true;
exports["default"] = getDisplayValue;

function getDisplayValue(value) {
  if (value && typeof value === 'object') {
    if (Array.isArray(value)) {
      return value.map(function (singleOption) {
        return singleOption.name;
      }).join(', ');
    }

    return value.name;
  }

  return '';
}