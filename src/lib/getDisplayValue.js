export default function getDisplayValue(value) {
    if (value && typeof value === 'object') {
        if (Array.isArray(value)) {
            return value.map((singleOption) => singleOption.name).join(', ');
        }

        return value.name;
    }

    return '';
}
