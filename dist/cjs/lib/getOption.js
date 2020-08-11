"use strict";

exports.__esModule = true;
exports["default"] = getOption;

function getOption(value, defaultOptions) {
  if (Array.isArray(value)) {
    return value.map(function (singleValue) {
      return defaultOptions.find(function (option) {
        return option.value === singleValue;
      });
    });
  }

  return defaultOptions.find(function (option) {
    return option.value === value;
  }) || null;
}