export default function highlightReducer(highlighted, value) {
  if (!value) {
    return -1;
  }

  const {
    key,
    options
  } = value;

  if (!options) {
    return highlighted;
  }

  let newHighlighted = key === 'ArrowDown' ? highlighted + 1 : highlighted - 1;
  const max = options.length - 1;

  if (newHighlighted < 0) {
    newHighlighted = max;
  } else if (newHighlighted > max) {
    newHighlighted = 0;
  }

  const option = options[newHighlighted];

  if (option && option.disabled) {
    return highlightReducer(newHighlighted, {
      key,
      options
    });
  }

  return newHighlighted;
}