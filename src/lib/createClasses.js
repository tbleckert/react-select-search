const classes = {
    main: null,
    modifier: null,
    value: 'value',
    input: 'input',
    select: 'select',
    options: 'options',
    row: 'row',
    option: 'option',
    group: 'group',
    groupHeader: 'group-header',
};

function e(baseClass, className, key) {
    if (key === 'main') {
        return baseClass.split(' ')[0].trim();
    }

    if (key === 'modifier') {
        const classNames = baseClass.split(' ');

        if (classNames.length > 1) {
            return classNames[1].trim();
        }

        return '';
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
