import isOption from './isOption';
export default function getOption(value, options) {
  if (isOption(value)) {
    return value;
  }

  let newValue = value;

  if (newValue === null && options.length) {
    let i = 0;
    let defaultOption = options[0];

    while (defaultOption && defaultOption.disabled) {
      if (options.length < i) {
        defaultOption = false;
      }

      i += 1;
      defaultOption = options[i];
    }

    if (defaultOption) {
      newValue = defaultOption.value;
    }
  } // eslint-disable-next-line eqeqeq


  return options.find(o => o.value == newValue);
}