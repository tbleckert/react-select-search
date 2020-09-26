"use strict";

exports.__esModule = true;
exports["default"] = getOption;

function getOption(value, options) {
  if (Array.isArray(value)) {
    return value.map(function (singleValue) {
      return options.find(function (option) {
        return option.value === singleValue;
      });
    });
  }

  return options.find(function (option) {
    return option.value === value;
  }) || null;
}