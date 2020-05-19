export default function highlightReducer(highlighted, value) {
    if (!value) {
        return -1;
    }

    const { key, options } = value;

    if (!options) {
        return highlighted;
    }

    let newHighlighted = -1;

    if (key === 'ArrowDown') {
        newHighlighted = highlighted + 1;
    } else if (key === 'ArrowUp') {
        newHighlighted = highlighted - 1;
    }

    if (newHighlighted < 0) {
        newHighlighted = options.length - 1;
    } else if (newHighlighted > options.length - 1) {
        newHighlighted = 0;
    }

    const option = options[newHighlighted];

    if (option && option.disabled) {
        return highlightReducer(newHighlighted, { key, options });
    }

    return newHighlighted;
}
