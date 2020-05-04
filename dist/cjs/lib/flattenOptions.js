"use strict";

exports.__esModule = true;
exports["default"] = flattenOptions;

function flattenOptions(options) {
  if (!Array.isArray(options)) {
    return [];
  }

  var nextOptions = [];
  options.forEach(function (option, index) {
    if ('type' in option && option.type === 'group') {
      var id = option.name.replace(/\s+/g, '-').toLowerCase() + "-" + index;
      option.items.forEach(function (groupOption) {
        var nextGroupOption = Object.assign({}, groupOption);
        nextGroupOption.groupId = id;
        nextGroupOption.groupName = option.name;
        nextOptions.push(nextGroupOption);
      });
    } else {
      nextOptions.push(Object.assign({}, option, {
        index: index
      }));
    }
  });
  return nextOptions;
}