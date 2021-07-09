"use strict";

exports.__esModule = true;
exports["default"] = useClassName;

var _react = require("react");

function useClassName(className) {
  return (0, _react.useCallback)(function (key) {
    if (typeof className === 'function') {
      return className(key);
    }

    if (key.indexOf('container') === 0) {
      return key.replace('container', className);
    }

    if (key.indexOf('is-') === 0 || key.indexOf('has-') === 0) {
      return key;
    }

    return className.split(' ')[0] + "__" + key;
  }, [className]);
}