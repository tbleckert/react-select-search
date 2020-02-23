export default function isSelected(itemValue, selectedValue) {
    return (
        (Array.isArray(selectedValue)) ?
            selectedValue.indexOf(itemValue) >= 0
            : selectedValue === itemValue
    );
}
