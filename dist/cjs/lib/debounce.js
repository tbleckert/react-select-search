"use strict";

exports.__esModule = true;
exports["default"] = debounce;

function debounce(func, wait) {
  var timeout;
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    clearTimeout(timeout);
    timeout = setTimeout(function () {
      timeout = null;
      func.apply(void 0, args);
    }, wait);
  };
}