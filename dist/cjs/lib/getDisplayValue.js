"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getDisplayValue;

var _getOption = _interopRequireDefault(require("./getOption"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getDisplayValue(value, defaultOptions) {
  var option = (0, _getOption.default)(value, defaultOptions);

  if (option) {
    if (Array.isArray(option)) {
      return option.map(function (singleOption) {
        return singleOption.name;
      }).join(', ');
    }

    return option.name;
  }

  return '';
}