export default function getOption(value, options) {
  if (Array.isArray(value)) {
    return value.map(singleValue => options.find(option => option.value === singleValue));
  } // eslint-disable-next-line eqeqeq


  return options.find(option => option.value == value) || null;
}