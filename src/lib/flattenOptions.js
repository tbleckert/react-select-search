export default function flattenOptions(options) {
    if (!Array.isArray(options)) {
        return [];
    }

    const nextOptions = [];

    options.forEach((option, index) => {
        if ('type' in option && option.type === 'group') {
            const id = `${option.name.replace(/\s+/g, '-').toLowerCase()}-${index}`;

            option.items.forEach((groupOption) => {
                const nextGroupOption = { ...groupOption };

                nextGroupOption.groupId = id;
                nextGroupOption.groupName = option.name;

                nextOptions.push(nextGroupOption);
            });

            return;
        }

        nextOptions.push({ ...option, index });
    });

    return nextOptions;
}
