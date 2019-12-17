export default function findByValue(source, value) {
  if (!source || !Array.isArray(source)) {
    return null;
  }

  return source.filter(function (object) {
    return object.value === value;
  })[0];
}