"use strict";

exports.__esModule = true;
exports["default"] = flattenOptions;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function flattenOptions(options) {
  return options.map(function (option, i) {
    if (option.type === 'group') {
      var id = option.name.replace(/\s+/g, '-').toLowerCase() + "-" + i;
      return option.items.map(function (item) {
        return _extends({}, item, {
          groupId: id,
          groupName: option.name
        });
      });
    }

    return _extends({}, option, {
      index: i
    });
  }).flat();
}