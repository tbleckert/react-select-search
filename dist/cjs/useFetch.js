"use strict";

exports.__esModule = true;
exports["default"] = useFetch;

var _react = require("react");

var _debounce = _interopRequireDefault(require("./lib/debounce"));

var _flattenOptions = _interopRequireDefault(require("./lib/flattenOptions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function useFetch(q, defaultOptions, _ref) {
  var debounceTime = _ref.debounceTime,
      getOptions = _ref.getOptions,
      filter = _ref.filter;

  var _useState = (0, _react.useState)(false),
      fetching = _useState[0],
      setFetching = _useState[1];

  var _useState2 = (0, _react.useState)(defaultOptions),
      options = _useState2[0],
      setOptions = _useState2[1];

  var fetch = (0, _react.useMemo)(function () {
    if (!getOptions) {
      return function (s) {
        return setOptions(filter(s, defaultOptions));
      };
    }

    return (0, _debounce["default"])(function (s) {
      var optionsReq = getOptions(s, defaultOptions);
      setFetching(true);
      Promise.resolve(optionsReq).then(function (newOptions) {
        setOptions(filter(s, (0, _flattenOptions["default"])(newOptions)));
      })["finally"](function () {
        return setFetching(false);
      });
    }, debounceTime);
  }, [getOptions, debounceTime, filter, defaultOptions]);
  (0, _react.useEffect)(function () {
    return setOptions(defaultOptions);
  }, [defaultOptions]);
  (0, _react.useEffect)(function () {
    return fetch(q);
  }, [fetch, q]);
  return {
    options: options,
    setOptions: setOptions,
    fetching: fetching
  };
}