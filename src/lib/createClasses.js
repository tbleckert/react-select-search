const classes = {
    main: null,
    variant: null,
    focus: '!has-focus',
    disabled: '!is-disabled',
    searching: '!is-searching',
    value: 'value',
    input: 'input',
    select: 'select',
    options: 'options',
    row: 'row',
    option: 'option',
    optionSelected: '!is-selected',
    optionDisabled: '!is-disabled',
    optionHighlighted: '!is-highlighted',
    group: 'group',
    groupHeader: 'group-header',
};

function e(baseClass, className, key) {
    if (key === 'main') {
        return baseClass.split(' ')[0].trim();
    }

    if (key === 'variant') {
        const classNames = baseClass.split(' ');

        classNames.shift();

        if (classNames.length > 0) {
            return classNames.join(' ').trim();
        }

        return '';
    }

    if (className.indexOf('!') === 0) {
        return className.replace('!', '');
    }

    return `${baseClass.split(' ')[0].trim()}__${className}`;
}

export default function createClasses(baseClass) {
    const returnObj = {};
    const classesArray = Object.entries(classes);

    classesArray.map(([key, cls]) => [key, e(baseClass, cls, key)]).forEach(([key, cls]) => {
        returnObj[key] = cls;
    });

    return returnObj;
}
