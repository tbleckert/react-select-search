var FlattenOptions = function FlattenOptions(options) {
  var nextOptions = [];
  options.forEach(function (option, index) {
    if ({}.hasOwnProperty.call(option, 'type') && option.type === 'group') {
      var id = Math.random().toString(36).substr(2, 9);
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
};

export default FlattenOptions;