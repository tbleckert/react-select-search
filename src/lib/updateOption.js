import isSame from './isSame';
import toArray from './toArray';

export default function updateOption(newOption, oldOption, multiple) {
    if (!newOption) {
        return oldOption;
    }

    if (!multiple) {
        return newOption;
    }

    if (!oldOption) {
        return toArray(newOption);
    }

    const nextOption = toArray(oldOption);
    const newOptionIndex = nextOption.findIndex((o) =>
        isSame(o.value, newOption.value),
    );

    if (newOptionIndex >= 0) {
        nextOption.splice(newOptionIndex, 1);
    } else {
        nextOption.push(newOption);
    }

    return nextOption;
}
