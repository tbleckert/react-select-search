export default function getNewValue(value, oldValue, options, multiple) {
    const newValue = (value === null && options.length) ? options[0].value : value;

    if (!multiple) {
        return newValue;
    }

    if (!newValue) {
        return [];
    }

    if (!oldValue) {
        return !Array.isArray(newValue) ? [newValue] : [...newValue];
    }

    const newArrayValue = !Array.isArray(oldValue) ? [oldValue] : [...oldValue];
    // eslint-disable-next-line eqeqeq
    const valueIndex = newArrayValue.findIndex((val) => val == newValue);

    if (valueIndex >= 0) {
        newArrayValue.splice(valueIndex, 1);
    } else {
        newArrayValue.push(value);
    }

    return newArrayValue;
}
