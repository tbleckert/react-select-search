function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

export default function flattenOptions(options) {
  if (!Array.isArray(options)) {
    return [];
  }

  const nextOptions = [];
  options.forEach((option, index) => {
    if ('type' in option && option.type === 'group') {
      const id = option.name.replace(/\s+/g, '-').toLowerCase() + "-" + index;
      option.items.forEach(groupOption => {
        nextOptions.push(_extends({}, groupOption, {
          groupId: id,
          groupName: option.name
        }));
      });
      return;
    }

    nextOptions.push(_extends({}, option, {
      index
    }));
  });
  return nextOptions;
}