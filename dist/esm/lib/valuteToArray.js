export default function valueToArray(value) {
  if (!value) {
    return [];
  }

  return !Array.isArray(value) ? [value] : [...value];
}