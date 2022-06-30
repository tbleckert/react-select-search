export default function getDisplayValue(option, options, placeholder) {
    if (!option && !placeholder) {
        return options && options.length ? options[0].name || '' : '';
    }

    if (!option && !Array.isArray(option)) {
        return '';
    }

    return Array.isArray(option)
        ? option
              .map((o) => o.name)
              .filter(Boolean)
              .join(', ')
        : option.name || '';
}
