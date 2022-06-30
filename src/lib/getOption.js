export default function getOption(value, options) {
    if (Array.isArray(value)) {
        return value
            .map((v) => options.find((o) => String(o.value) === String(v)))
            .filter((o) => o);
    }

    return options.find((o) => String(o.value) === String(value)) || null;
}
