import isOption from './isOption';
export default function getValue(option) {
  if (!option) {
    return null;
  }

  return isOption(option) ? option.value : null;
}