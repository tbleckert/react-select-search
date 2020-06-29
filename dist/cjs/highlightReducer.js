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

  var newHighlighted = key === 'ArrowDown' ? highlighted + 1 : highlighted - 1;
  var max = options.length - 1;

  if (newHighlighted < 0) {
    newHighlighted = max;
  } else if (newHighlighted > max) {
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