"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = findGroupIndex;

function findGroupIndex(options, id) {
  var foundIndex = null;
  options.forEach(function (option, i) {
    if ('groupId' in option && option.groupId === id) {
      foundIndex = i;
    }
  });
  return foundIndex;
}