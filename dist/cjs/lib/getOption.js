"use strict";

exports.__esModule = true;
exports["default"] = getOption;

var _isOption = _interopRequireDefault(require("./isOption"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getOption(value, options) {
  if ((0, _isOption["default"])(value)) {
    return value;
  }

  var newValue = value;

  if (newValue === null && options.length) {
    var i = 0;
    var defaultOption = options[0];

    while (defaultOption && defaultOption.disabled) {
      if (options.length < i) {
        defaultOption = false;
      }

      i += 1;
      defaultOption = options[i];
    }

    if (defaultOption) {
      newValue = defaultOption.value;
    }
  } // eslint-disable-next-line eqeqeq


  return options.find(function (o) {
    return o.value == newValue;
  });
}