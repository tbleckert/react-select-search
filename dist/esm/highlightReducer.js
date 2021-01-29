export default function highlightReducer(highlighted, {
  key,
  options
}) {
  const max = options.length - 1;
  let newHighlighted = key === 'ArrowDown' ? highlighted + 1 : highlighted - 1;

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