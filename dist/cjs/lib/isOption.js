"use strict";

exports.__esModule = true;
exports["default"] = isOption;

function isOption(option) {
  return option !== null && typeof option === 'object' && 'value' in option && 'name' in option;
}