"use strict";

exports.__esModule = true;
exports["default"] = highlightReducer;

function highlightReducer(highlighted, value) {
  if (!value) {
    return -1;
  }

  var key = value.key,
      options = value.options;

  if (!options) {
    return highlighted;
  }

  var newHighlighted = -1;

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

  var option = options[newHighlighted];

  if (option && option.disabled) {
    return highlightReducer(newHighlighted, {
      key: key,
      options: options
    });
  }

  return newHighlighted;
}