export default function highlightReducer(highlighted, value) {
    if (!value) {
        return -1;
    }

    const { key, options } = value;

    if (key !== 'ArrowDown' && key !== 'ArrowUp') {
        return highlighted;
    }

    let newHighlighted = null;

    if (key === 'ArrowDown' && highlighted < options.length) {
        newHighlighted = highlighted + 1;
    } else if (key === 'ArrowDown' && highlighted >= options.length - 1) {
        newHighlighted = 0;
    } else if (key === 'ArrowUp' && highlighted > 0) {
        newHighlighted = highlighted - 1;
    } else if (key === 'ArrowUp' && highlighted <= 0) {
        newHighlighted = options.length - 1;
    }

    const option = options[newHighlighted];

    if (option && option.disabled) {
        return highlightReducer(newHighlighted, { key, options });
    }

    return newHighlighted;
}
