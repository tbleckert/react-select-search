"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = groupOptions;

var _findGroupIndex = _interopRequireDefault(require("./findGroupIndex"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function groupOptions(options) {
  const nextOptions = [];
  options.forEach((option, i) => {
    if ('groupId' in option) {
      const nextOption = Object.assign({}, option);
      const groupIndex = (0, _findGroupIndex.default)(nextOptions, nextOption.groupId);
      nextOption.index = i;

      if (groupIndex !== null && groupIndex > -1) {
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

;