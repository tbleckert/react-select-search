"use strict";

exports.__esModule = true;
exports["default"] = getOption;

function getOption(value, oldValue, options, multiple) {
  var newValue = value === null && options.length ? options[0].value : value; // eslint-disable-next-line eqeqeq

  var f = function f(ref) {
    return options.find(function (o) {
      return o.value == ref;
    });
  };

  var option = Array.isArray(value) ? newValue.map(function (v) {
    return f(v);
  }) : f(newValue);

  if (!multiple) {
    return option || oldValue;
  }

  if (!option) {
    return oldValue;
  }

  if (!oldValue) {
    return !Array.isArray(option) ? [option] : [].concat(option);
  }

  var values = !Array.isArray(oldValue) ? [oldValue] : [].concat(oldValue); // eslint-disable-next-line eqeqeq

  var valueIndex = values.findIndex(function (v) {
    return v.value == option.value;
  });

  if (valueIndex >= 0) {
    values.splice(valueIndex, 1);
  } else {
    values.push(option);
  }

  return values;
}