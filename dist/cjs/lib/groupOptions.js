"use strict";

exports.__esModule = true;
exports["default"] = groupOptions;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function groupOptions(options) {
  var nextOptions = [];
  options.forEach(function (option, i) {
    if ('groupId' in option) {
      var nextOption = _objectSpread({}, option);

      var groupIndex = nextOptions.findIndex(function (el) {
        return 'groupId' in el && el.groupId === nextOption.groupId;
      });
      nextOption.index = i;

      if (groupIndex > -1) {
        nextOptions[groupIndex].items.push(nextOption);
      } else {
        nextOptions.push({
          items: [nextOption],
          groupId: option.groupId,
          type: 'group',
          name: option.groupName
        });
      }
    } else {
      nextOptions.push(option);
    }
  });
  return nextOptions;
}