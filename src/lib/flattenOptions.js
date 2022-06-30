export default function flattenOptions(options) {
    let index = 0;

    return options.map((option) => {
        if (option.type === 'group') {
            return option.items.map((o) => ({
                ...o,
                group: option.name,
                index: index++,
            }));
        }

        return { ...option, index: index++ };
    }).flat();
}
