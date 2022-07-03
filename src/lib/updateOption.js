export default function updateOption(newOption, oldOption, multiple) {
    if (!newOption) {
        return oldOption;
    }

    if (!multiple) {
        return newOption;
    }

    if (!oldOption) {
        return Array.isArray(newOption) ? newOption : [newOption];
    }

    const nextOption = Array.isArray(oldOption) ? oldOption : [oldOption];
    const newOptionIndex = nextOption.findIndex(
        (o) => o.value === newOption.value,
    );

    if (newOptionIndex >= 0) {
        nextOption.splice(newOptionIndex, 1);
    } else {
        nextOption.push(newOption);
    }

    return nextOption;
}
