"use strict";

exports.__esModule = true;
exports["default"] = highlightReducer;

function highlightReducer(highlighted, _ref) {
  var key = _ref.key,
      options = _ref.options;
  var max = options.length - 1;
  var newHighlighted = key === 'ArrowDown' ? highlighted + 1 : highlighted - 1;

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