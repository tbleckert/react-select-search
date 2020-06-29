export default function highlightReducer(highlighted, value) {
    if (!value) {
        return -1;
    }

    const { key, options } = value;

    if (!options) {
        return highlighted;
    }

    let newHighlighted = -1;
    const max = options.length - 1;

    if (key === 'ArrowDown') {
        newHighlighted = (highlighted >= max) ? 0 : highlighted + 1;
    } else if (key === 'ArrowUp') {
        newHighlighted = (highlighted <= 0) ? max : highlighted - 1;
    }

    const option = options[newHighlighted];

    if (option && option.disabled) {
        return highlightReducer(newHighlighted, { key, options });
    }

    return newHighlighted;
}
