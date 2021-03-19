"use strict";

exports.__esModule = true;
exports["default"] = getOptions;

var _valuteToArray = _interopRequireDefault(require("./valuteToArray"));

var _getOption = _interopRequireDefault(require("./getOption"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getOptions(value, oldValue, options, multiple) {
  if (!multiple) {
    var newOption = (0, _getOption["default"])(value, options);

    if (newOption) {
      return newOption;
    }

    return oldValue;
  }

  var oldOptions = (0, _valuteToArray["default"])(oldValue);
  var newOptions = (0, _valuteToArray["default"])(value).map(function (o) {
    return (0, _getOption["default"])(o, options);
  }).filter(function (o) {
    return o !== null && o !== undefined;
  });

  if (!oldOptions.length) {
    return newOptions;
  }

  if (!newOptions.length) {
    return oldOptions;
  }

  newOptions.forEach(function (newOption) {
    var optionIndex = oldOptions.findIndex(function (o) {
      return o.value == newOption.value;
    });

    if (optionIndex >= 0) {
      oldOptions.splice(optionIndex, 1);
    } else {
      oldOptions.push(newOption);
    }
  });
  return oldOptions;
}