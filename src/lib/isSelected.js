export default function isSelected(option, selectedOption) {
    if (!selectedOption) return false;

    return Array.isArray(selectedOption)
        ? selectedOption.findIndex((o) => o.value === option.value) >= 0
        : selectedOption.value === option.value;
}
