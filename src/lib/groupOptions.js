export default function groupOptions(options) {
    const nextOptions = [];

    options.forEach((option) => {
        if (option.group) {
            const group = nextOptions.findIndex((o) => o.type === 'group' && o.name === option.group);

            if (group >= 0) {
                nextOptions[group].items.push(option);
            } else {
                nextOptions.push({
                    items: [option],
                    type: 'group',
                    name: option.group,
                });
            }
        } else {
            nextOptions.push(option);
        }
    });

    return nextOptions;
}
