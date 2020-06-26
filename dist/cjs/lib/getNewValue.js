"use strict";

exports.__esModule = true;
exports["default"] = getNewValue;

function getNewValue(value, oldValue, multiple) {
  if (!multiple) {
    return value;
  }

  if (!oldValue) {
    return [value];
  }

  var newValue = !Array.isArray(oldValue) ? [oldValue] : [].concat(oldValue);
  var valueIndex = newValue.findIndex(function (val) {
    return val === value;
  });

  if (valueIndex >= 0) {
    newValue.splice(valueIndex, 1);
  } else {
    newValue.push(value);
  }

  return newValue;
}