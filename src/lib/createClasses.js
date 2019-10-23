const classes = {
    main: null,
    search: 'search',
    select: 'select',
    options: 'options',
    option: 'option',
    group: 'group',
    groupHeader: 'group-header',
};

function e(baseClass, className) {
    if (className === null) {
        return baseClass;
    }

    return `${baseClass}__${className}`;
}

export default function createClasses(baseClass) {
    const classesArray = Object.entries(classes);

    return Object.fromEntries(classesArray.map(([key, cls]) => [key, e(baseClass, cls)]));
}
