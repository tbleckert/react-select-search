export default function isSelected(itemValue, selectedValue) {
  if (!selectedValue) {
    return false;
  }

  return Array.isArray(selectedValue) ? // eslint-disable-next-line eqeqeq
  selectedValue.findIndex(item => item.value == itemValue.value) >= 0 // eslint-disable-next-line eqeqeq
  : selectedValue.value == itemValue.value;
}