import getValue from './getValue';
export default function getValues(options) {
  if (Array.isArray(options)) {
    return options.map(o => getValue(o)).filter(v => v !== null);
  }

  return getValue(options);
}