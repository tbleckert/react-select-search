export default function getOption(value, oldValue, options, multiple) {
  const newValue = value === null && options.length ? options[0].value : value; // eslint-disable-next-line eqeqeq

  const f = ref => options.find(o => o.value == ref);

  const option = Array.isArray(value) ? newValue.map(v => f(v)) : f(newValue);

  if (!multiple) {
    return option || oldValue;
  }

  if (!option) {
    return oldValue;
  }

  if (!oldValue) {
    return !Array.isArray(option) ? [option] : [...option];
  }

  const values = !Array.isArray(oldValue) ? [oldValue] : [...oldValue]; // eslint-disable-next-line eqeqeq

  const valueIndex = values.findIndex(v => v.value == option.value);

  if (valueIndex >= 0) {
    values.splice(valueIndex, 1);
  } else {
    values.push(option);
  }

  return values;
}