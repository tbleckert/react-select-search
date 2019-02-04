const FlattenOptions = (options) => {
    const nextOptions = [];

    options.forEach((option, index) => {
        if ({}.hasOwnProperty.call(option, 'type') && option.type === 'group') {
            const id = Math.random().toString(36).substr(2, 9);

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

export default FlattenOptions;
