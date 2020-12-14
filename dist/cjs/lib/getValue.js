"use strict";

exports.__esModule = true;
exports["default"] = getValue;

function getValue(option) {
  if (!option) {
    return null;
  }

  if (Array.isArray(option)) {
    return option.map(function (o) {
      return o && o.value;
    });
  }

  return 'value' in option ? option.value : null;
}