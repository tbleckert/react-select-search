export default function getNewValue(value, oldValue, multiple) {
  if (!multiple) {
    return value;
  }

  if (!oldValue) {
    return [value];
  }

  const newValue = !Array.isArray(oldValue) ? [oldValue] : [...oldValue];
  const valueIndex = newValue.findIndex(val => val === value);

  if (valueIndex >= 0) {
    newValue.splice(valueIndex, 1);
  } else {
    newValue.push(value);
  }

  return newValue;
}