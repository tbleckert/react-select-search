import isSame from './isSame';

export default function getOption(value, options) {
    if (Array.isArray(value)) {
        return value
            .map((v) => options.find((o) => isSame(o.value, v)))
            .filter((o) => o);
    }

    return options.find((o) => isSame(o.value, value)) || null;
}
