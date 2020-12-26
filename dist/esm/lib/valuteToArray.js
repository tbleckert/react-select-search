export default function valueToArray(value) {
  return !Array.isArray(value) ? [value] : value;
}