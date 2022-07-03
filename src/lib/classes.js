const isString = (str) => typeof str === 'string';
const getClassName = (str, className) =>
    isString(className) ? `${className}-${str}` : className[str];

export default function classes(classNames, className) {
    if (isString(classNames)) return getClassName(classNames, className);

    return Object.entries(classNames)
        .filter(([cls, display]) => cls && display)
        .map(([cls]) => getClassName(cls, className))
        .join(' ');
}
