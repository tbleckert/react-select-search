"use strict";

exports.__esModule = true;
exports["default"] = getNewValue;

function getNewValue(value, oldValue, multiple) {
  if (!multiple) {
    return value;
  }

  var newValue = [];
  var valueIndex = -1;

  if (oldValue) {
    newValue = !Array.isArray(oldValue) ? [oldValue] : [].concat(oldValue);
    valueIndex = newValue.findIndex(function (val) {
      return val === value;
    });
  }

  if (valueIndex >= 0) {
    newValue.splice(valueIndex, 1);
  } else {
    newValue.push(value);
  }

  return newValue;
}