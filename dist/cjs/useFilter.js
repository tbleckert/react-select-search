"use strict";

exports.__esModule = true;
exports["default"] = useFilter;

var _react = require("react");

var _flattenOptions = _interopRequireDefault(require("./lib/flattenOptions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function useFilter(filter) {
  return (0, _react.useCallback)(function (q, o) {
    var nextOptions = o;

    if (filter) {
      nextOptions = filter(q, nextOptions);
    }

    return (0, _flattenOptions["default"])(nextOptions);
  }, [filter]);
}