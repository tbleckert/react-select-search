"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var Bem = {
  mSeparator: '--',
  eSeparator: '__',
  m: function m(base, modifier) {
    modifier = modifier.split(' ');
    var finalClass = [];
    modifier.forEach(function (className) {
      finalClass.push(base + '--' + className);
    });
    return finalClass.join(' ');
  },
  e: function e(base, element) {
    return base + this.eSeparator + element;
  }
};
var _default = Bem;
exports.default = _default;