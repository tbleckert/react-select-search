"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getOption;

function findOption(value, options) {
  const matches = options.filter(option => option.value === value);

  if (matches.length) {
    return matches[0];
  }

  return null;
}

function getOption(value, defaultOptions) {
  if (value) {
    if (Array.isArray(value)) {
      return value.map(singleValue => findOption(singleValue, defaultOptions));
    }

    return findOption(value, defaultOptions);
  }

  return null;
}