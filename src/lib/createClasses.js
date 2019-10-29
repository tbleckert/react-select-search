const classes = {
    main: null,
    search: 'search',
    select: 'select',
    options: 'options',
    row: 'row',
    option: 'option',
    group: 'group',
    groupHeader: 'group-header',
};

function e(baseClass, className) {
    if (className === null) {
        return baseClass;
    }

    return `${baseClass.split(' ')[0].trim()}__${className}`;
}

export default function createClasses(baseClass) {
    const returnObj = {};
    const classesArray = Object.entries(classes);

    classesArray.map(([key, cls]) => [key, e(baseClass, cls)]).forEach(([key, cls]) => {
        returnObj[key] = cls;
    });

    return returnObj;
}
