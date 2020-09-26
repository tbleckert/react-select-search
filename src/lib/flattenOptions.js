export default function flattenOptions(options) {
    if (!Array.isArray(options)) {
        return [];
    }

    const nextOptions = [];

    options.forEach((option, index) => {
        if ('type' in option && option.type === 'group') {
            const id = `${option.name.replace(/\s+/g, '-').toLowerCase()}-${index}`;

            option.items.forEach((groupOption) => {
                nextOptions.push({
                    ...groupOption,
                    groupId: id,
                    groupName: option.name,
                });
            });

            return;
        }

        nextOptions.push({ ...option, index });
    });

    return nextOptions;
}
