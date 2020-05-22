export default function getNewValue(value, oldValue, multiple) {
    if (!multiple) {
        return value;
    }

    let newValue = null;

    if (oldValue && !Array.isArray(oldValue)) {
        newValue = [oldValue];
    } else if (!oldValue) {
        newValue = [];
    } else {
        newValue = [...oldValue];
    }

    const valueIndex = newValue.findIndex((val) => val === value);

    if (valueIndex >= 0) {
        newValue.splice(valueIndex, 1);
    } else {
        newValue.push(value);
    }

    return newValue;
}
