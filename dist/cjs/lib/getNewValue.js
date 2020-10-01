"use strict";

exports.__esModule = true;
exports["default"] = getNewValue;

function getNewValue(value, oldValue, options, multiple) {
  var newValue = value === null && options.length ? options[0].value : value;

  if (!multiple) {
    return newValue;
  }

  if (!newValue) {
    return [];
  }

  if (!oldValue) {
    return [newValue];
  }

  var newArrayValue = !Array.isArray(oldValue) ? [oldValue] : [].concat(oldValue); // eslint-disable-next-line eqeqeq

  var valueIndex = newArrayValue.findIndex(function (val) {
    return val == newValue;
  });

  if (valueIndex >= 0) {
    newArrayValue.splice(valueIndex, 1);
  } else {
    newArrayValue.push(value);
  }

  return newArrayValue;
}