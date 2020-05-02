export default function highlightReducer(highlighted, value) {
  if (!value) {
    return -1;
  }

  const {
    key,
    options
  } = value;

  if (!options || key !== 'ArrowDown' && key !== 'ArrowUp') {
    return highlighted;
  }

  let newHighlighted = -1;

  if (key === 'ArrowDown' && highlighted < options.length - 1) {
    newHighlighted = highlighted + 1;
  } else if (key === 'ArrowDown' && highlighted === options.length - 1) {
    newHighlighted = 0;
  } else if (key === 'ArrowUp' && highlighted > 0) {
    newHighlighted = highlighted - 1;
  } else if (key === 'ArrowUp' && highlighted === 0) {
    newHighlighted = options.length - 1;
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