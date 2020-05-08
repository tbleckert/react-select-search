"use strict";

exports.__esModule = true;
exports["default"] = groupOptions;

function groupOptions(options) {
  var nextOptions = [];
  options.forEach(function (option, i) {
    if ('groupId' in option) {
      var nextOption = Object.assign({}, option);
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