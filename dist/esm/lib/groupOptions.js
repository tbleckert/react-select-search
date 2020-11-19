function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

export default function groupOptions(options) {
  const nextOptions = [];
  options.forEach((option, i) => {
    if ('groupId' in option) {
      const nextOption = _extends({}, option);

      const groupIndex = nextOptions.findIndex(el => 'groupId' in el && el.groupId === nextOption.groupId);
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