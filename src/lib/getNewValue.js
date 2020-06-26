export default function getNewValue(value, oldValue, multiple) {
    if (!multiple) {
        return value;
    }

    let newValue = [];
    let valueIndex = -1;

    if (oldValue) {
        newValue = !Array.isArray(oldValue) ? [oldValue] : [...oldValue];
        valueIndex = newValue.findIndex((val) => val === value);
    }

    if (valueIndex >= 0) {
        newValue.splice(valueIndex, 1);
    } else {
        newValue.push(value);
    }

    return newValue;
}
