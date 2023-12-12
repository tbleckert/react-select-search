"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isSelected;

function isSelected(itemValue, selectedValue) {
  return Array.isArray(selectedValue) ? selectedValue.findIndex(item => item.value === itemValue.value) >= 0 : selectedValue ? selectedValue.value === itemValue.value : false;
}