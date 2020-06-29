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
  var max = options.length - 1;

  if (key === 'ArrowDown') {
    newHighlighted = highlighted >= max ? 0 : highlighted + 1;
  } else if (key === 'ArrowUp') {
    newHighlighted = highlighted <= 0 ? max : highlighted - 1;
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