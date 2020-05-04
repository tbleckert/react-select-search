"use strict";

exports.__esModule = true;
exports["default"] = getNewValue;

function getNewValue(value, oldValue, multiple) {
  if (!multiple) {
    return value;
  }

  var newValue = null;

  if (oldValue && !Array.isArray(oldValue)) {
    newValue = [oldValue];
  } else if (!oldValue) {
    newValue = [];
  } else {
    newValue = [].concat(oldValue);
  }

  var valueIndex = newValue.findIndex(function (val) {
    return val.value === value.value;
  });

  if (valueIndex >= 0) {
    newValue.splice(valueIndex, 1);
  } else {
    newValue.push(value);
  }

  return newValue;
}