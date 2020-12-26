"use strict";

exports.__esModule = true;
exports["default"] = getOptions;

var _valuteToArray = _interopRequireDefault(require("./valuteToArray"));

var _getOption = _interopRequireDefault(require("./getOption"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getOptions(value, oldValue, options, multiple) {
  var newOption = (0, _getOption["default"])(value, options);

  if (!multiple) {
    return newOption || oldValue;
  }

  var newOptions = (0, _valuteToArray["default"])(oldValue).map(function (o) {
    return (0, _getOption["default"])(o, options);
  }).filter(function (o) {
    return o !== null && o !== undefined;
  });

  if (!newOption) {
    return newOptions;
  } // eslint-disable-next-line eqeqeq


  var optionIndex = newOptions.findIndex(function (o) {
    return o.value == newOption.value;
  });

  if (optionIndex >= 0) {
    newOptions.splice(optionIndex, 1);
  } else {
    newOptions.push(newOption);
  }

  return newOptions;
}