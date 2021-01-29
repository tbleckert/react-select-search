import isOption from './isOption';
export default function getDisplayValue(value) {
  if (Array.isArray(value)) {
    return value.map(o => isOption(o) && o.name).join(', ');
  }

  return isOption(value) ? value.name : '';
}