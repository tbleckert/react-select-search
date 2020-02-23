import getOption from './getOption';
export default function getDisplayValue(value, defaultOptions) {
  var option = getOption(value, defaultOptions);

  if (option) {
    if (Array.isArray(option)) {
      return option.map(function (singleOption) {
        return singleOption.name;
      }).join(', ');
    }

    return option.name;
  }

  return '';
}