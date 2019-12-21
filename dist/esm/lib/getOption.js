function findOption(value, options) {
  var matches = options.filter(function (option) {
    return option.value === value;
  });

  if (matches.length) {
    return matches[0];
  }

  return null;
}

export default function getOption(value, defaultOptions) {
  if (value) {
    if (Array.isArray(value)) {
      return value.map(function (singleValue) {
        return findOption(singleValue, defaultOptions);
      });
    }

    return findOption(value, defaultOptions);
  }

  return null;
}