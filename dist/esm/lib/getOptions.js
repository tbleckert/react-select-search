import valueToArray from './valuteToArray';
import getOption from './getOption';
export default function getOptions(value, oldValue, options, multiple) {
  const newOption = getOption(value, options);

  if (!multiple) {
    return newOption || oldValue;
  }

  const newOptions = valueToArray(oldValue).map(o => getOption(o, options)).filter(o => o !== null && o !== undefined);

  if (!newOption) {
    return newOptions;
  } // eslint-disable-next-line eqeqeq


  const optionIndex = newOptions.findIndex(o => o.value == newOption.value);

  if (optionIndex >= 0) {
    newOptions.splice(optionIndex, 1);
  } else {
    newOptions.push(newOption);
  }

  return newOptions;
}