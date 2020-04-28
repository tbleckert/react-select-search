"use strict";

exports.__esModule = true;
exports["default"] = isSelected;

function isSelected(itemValue, selectedValue) {
  if (!selectedValue) {
    return false;
  }

  return Array.isArray(selectedValue) ? selectedValue.findIndex(function (item) {
    return item.value === itemValue.value;
  }) >= 0 : selectedValue.value === itemValue.value;
}