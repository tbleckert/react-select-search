"use strict";

exports.__esModule = true;
exports["default"] = classes;

function classes(classNames) {
  return Object.entries(classNames).filter(function (_ref) {
    var cls = _ref[0],
        display = _ref[1];
    return cls && display;
  }).map(function (_ref2) {
    var cls = _ref2[0];
    return cls;
  }).join(' ');
}