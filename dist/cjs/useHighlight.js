"use strict";

exports.__esModule = true;
exports["default"] = useHighlight;

var _react = require("react");

var _highlightReducer = _interopRequireDefault(require("./highlightReducer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function useHighlight(defaultHighlighted, options, onSelect, ref) {
  var _useReducer = (0, _react.useReducer)(_highlightReducer["default"], defaultHighlighted),
      highlighted = _useReducer[0],
      dispatchHighlighted = _useReducer[1];

  var onKeyDown = (0, _react.useCallback)(function (e) {
    var key = e.key;

    if (['ArrowDown', 'ArrowUp'].includes(key)) {
      e.preventDefault();
      dispatchHighlighted({
        key: key,
        options: options
      });
    }
  }, [options]);
  var onKeyPress = (0, _react.useCallback)(function (e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      var selected = options[highlighted];

      if (selected) {
        onSelect(selected.value);
      }
    }
  }, [options, highlighted, onSelect]);
  var onKeyUp = (0, _react.useCallback)(function (e) {
    if (e.key === 'Escape') {
      e.preventDefault();
      ref.current.blur();
    }
  }, [ref]);
  return [highlighted, {
    onKeyPress: onKeyPress,
    onKeyDown: onKeyDown,
    onKeyUp: onKeyUp
  }];
}