export default function isOption(option) {
  return option !== null && typeof option === 'object' && 'value' in option && 'name' in option;
}