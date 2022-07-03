export default function getDisplayValue(option, options, placeholder) {
    if (!option && !placeholder) {
        return options && options.length ? options[0].name || '' : '';
    }

    const isMultiple = Array.isArray(option);

    if (!option && !isMultiple) {
        return '';
    }

    return isMultiple
        ? option
              .map((o) => o.name)
              .filter(Boolean)
              .join(', ')
        : option.name || '';
}
