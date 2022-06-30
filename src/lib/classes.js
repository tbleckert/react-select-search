const getClassName = (str, className) =>
    typeof className === 'string' ? `${className}-${str}` : className[str];

export default function classes(classNames, className) {
    if (typeof classNames === 'string')
        return getClassName(classNames, className);

    return Object.entries(classNames)
        .filter(([cls, display]) => cls && display)
        .map(([cls]) => getClassName(cls, className))
        .join(' ');
}
