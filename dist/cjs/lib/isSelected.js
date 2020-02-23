"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isSelected;

function isSelected(itemValue, selectedValue) {
  return Array.isArray(selectedValue) ? selectedValue.indexOf(itemValue) >= 0 : selectedValue === itemValue;
}