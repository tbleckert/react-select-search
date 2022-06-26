import getValue from './getValue';

export default function getValues(options) {
    return (Array.isArray(options)) ? options.map((o) => getValue(o)).filter((v) => v !== null) : getValue(options);
}
