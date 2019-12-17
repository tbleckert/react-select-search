import FindGroupIndex from './FindGroupIndex';

const GroupOptions = (options) => {
    const nextOptions = [];

    options.forEach((option, i) => {
        if ('groupId' in option) {
            const nextOption = Object.assign({}, option);
            const groupIndex = FindGroupIndex(nextOptions, nextOption.groupId);

            nextOption.index = i;

            if (groupIndex !== null && groupIndex > -1) {
                nextOptions[groupIndex].items.push(nextOption);
            } else {
                nextOptions.push({
                    items: [nextOption],
                    groupId: option.groupId,
                    type: 'group',
                    name: option.groupName,
                });
            }
        } else {
            nextOptions.push(option);
        }
    });

    return nextOptions;
};

export default GroupOptions;
