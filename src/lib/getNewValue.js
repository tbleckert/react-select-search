export default function getNewValue(value, oldValue, multiple) {
    let newValue = null;

    if (multiple) {
        if (oldValue && !Array.isArray(oldValue)) {
            newValue = [oldValue];
        } else if (!oldValue) {
            newValue = [];
        } else {
            newValue = [...oldValue];
        }

        const valueIndex = newValue.findIndex(val => val.value === value.value);

        if (valueIndex >= 0) {
            newValue.splice(valueIndex, 1);
        } else {
            newValue.push(value);
        }
    } else {
        newValue = value;
    }

    return newValue;
}
