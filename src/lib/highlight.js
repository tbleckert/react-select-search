export default function highlight(current, dir, options) {
    const max = options.length - 1;
    let option = null;
    let i = -1;
    let newHighlighted = current;

    while (i++ <= max && (!option || option.disabled)) {
        newHighlighted =
            dir === 'down' ? newHighlighted + 1 : newHighlighted - 1;

        if (newHighlighted < 0) {
            newHighlighted = max;
        } else if (newHighlighted > max) {
            newHighlighted = 0;
        }

        option = options[newHighlighted];
    }

    return newHighlighted;
}
