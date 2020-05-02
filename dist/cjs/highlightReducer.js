"use strict";

exports.__esModule = true;
exports["default"] = highlightReducer;

function highlightReducer(highlighted, value) {
  if (!value) {
    return -1;
  }

  var key = value.key,
      options = value.options;

  if (!options || key !== 'ArrowDown' && key !== 'ArrowUp') {
    return highlighted;
  }

  var newHighlighted = -1;

  if (key === 'ArrowDown' && highlighted < options.length - 1) {
    newHighlighted = highlighted + 1;
  } else if (key === 'ArrowDown' && highlighted === options.length - 1) {
    newHighlighted = 0;
  } else if (key === 'ArrowUp' && highlighted > 0) {
    newHighlighted = highlighted - 1;
  } else if (key === 'ArrowUp' && highlighted === 0) {
    newHighlighted = options.length - 1;
  }

  var option = options[newHighlighted];

  if (option && option.disabled) {
    return highlightReducer(newHighlighted, {
      key: key,
      options: options
    });
  }

  return newHighlighted;
}