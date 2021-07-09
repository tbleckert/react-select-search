export default function flattenOptions(options) {
    return options.map((option, i) => {
        if (option.type === 'group') {
            const id = `${option.name.replace(/\s+/g, '-').toLowerCase()}-${i}`;

            return option.items.map((item) => ({
                ...item,
                groupId: id,
                groupName: option.name,
            }));
        }

        return { ...option, index: i };
    }).flat();
}
