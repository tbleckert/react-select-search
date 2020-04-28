"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isSelected;

function isSelected(itemValue, selectedValue) {
  if (!selectedValue) {
    return false;
  }

  return Array.isArray(selectedValue) ? selectedValue.findIndex(item => item.value === itemValue.value) >= 0 : selectedValue.value === itemValue.value;
}