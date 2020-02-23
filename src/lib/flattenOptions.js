import getGroupId from './getGroupId';

export default function flattenOptions(options) {
    if (!Array.isArray(options)) {
        return [];
    }

    const nextOptions = [];

    options.forEach((option, index) => {
        if ('type' in option && option.type === 'group') {
            const id = getGroupId(option);

            option.items.forEach((groupOption) => {
                const nextGroupOption = Object.assign({}, groupOption);

                nextGroupOption.groupId = id;
                nextGroupOption.groupName = option.name;

                nextOptions.push(nextGroupOption);
            });
        } else {
            nextOptions.push(Object.assign({}, option, { index }));
        }
    });

    return nextOptions;
};
