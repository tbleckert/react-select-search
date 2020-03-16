import getGroupId from './getGroupId';
export default function flattenOptions(options) {
  if (!Array.isArray(options)) {
    return [];
  }

  var nextOptions = [];
  options.forEach(function (option, index) {
    if ('type' in option && option.type === 'group') {
      var id = getGroupId(option);
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
;