function FindGroup(options, id) {
    let foundIndex = null;

    options.forEach((option, i) => {
        if ({}.hasOwnProperty.call(option, 'groupId') && option.groupId === id) {
            foundIndex = i;
        }
    });

    return foundIndex;
}

const GroupOptions = (options) => {
    const nextOptions = [];

    options.forEach((option, i) => {
        if ({}.hasOwnProperty.call(option, 'groupId')) {
            const nextOption = Object.assign({}, option);
            const groupIndex = FindGroup(nextOptions, nextOption.groupId);

            nextOption.index = i;

            if (groupIndex !== null && groupIndex > -1) {
                nextOptions[groupIndex].items.push(nextOption);
            } else {
                nextOptions.push({ items: [nextOption], groupId: option.groupId, type: 'group', name: option.groupName });
            }
        } else {
            nextOptions.push(option);
        }
    });

    return nextOptions;
};

export default GroupOptions;
