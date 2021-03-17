import valueToArray from './valuteToArray';
import getOption from './getOption';

export default function getOptions(value, oldValue, options, multiple) {
    if (!multiple) {
        return getOption(value, options) || oldValue;
    }

    const oldOptions = valueToArray(oldValue);
    const newOptions = valueToArray(value)
        .map((o) => getOption(o, options))
        .filter((o) => o !== null && o !== undefined);

    if (!oldOptions.length) {
        return newOptions;
    }

    if (!newOptions.length) {
        return oldOptions;
    }

    newOptions.forEach((newOption) => {
        const optionIndex = oldOptions.findIndex((o) => o.value == newOption.value);

        if (optionIndex >= 0) {
            oldOptions.splice(optionIndex, 1);
        } else {
            oldOptions.push(newOption);
        }
    });

    return oldOptions;
}
