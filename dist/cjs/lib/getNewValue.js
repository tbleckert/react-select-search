"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getNewValue;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function getNewValue(value, oldValue, multiple) {
  var newValue = null;

  if (multiple) {
    if (oldValue && !Array.isArray(oldValue)) {
      newValue = [oldValue];
    } else if (!oldValue) {
      newValue = [];
    } else {
      newValue = _toConsumableArray(oldValue);
    }

    var valueIndex = newValue.indexOf(value);

    if (valueIndex >= 0) {
      newValue.splice(valueIndex, 1);
    } else {
      newValue.push(value);
    }
  } else {
    newValue = value;
  }

  return newValue;
}