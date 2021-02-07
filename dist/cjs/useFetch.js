"use strict";

exports.__esModule = true;
exports["default"] = useFetch;

var _react = require("react");

var _debounce = _interopRequireDefault(require("./lib/debounce"));

var _flattenOptions = _interopRequireDefault(require("./lib/flattenOptions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function useFetch(q, defaultOptions, _ref) {
  var debounceTime = _ref.debounceTime,
      filterOptions = _ref.filterOptions,
      getOptions = _ref.getOptions;

  var _useState = (0, _react.useState)(false),
      fetching = _useState[0],
      setFetching = _useState[1];

  var _useState2 = (0, _react.useState)(function () {
    return (0, _flattenOptions["default"])(defaultOptions);
  }),
      options = _useState2[0],
      setOptions = _useState2[1];

  var fetch = (0, _react.useMemo)(function () {
    var filter = filterOptions || function (op) {
      return function () {
        return op;
      };
    };

    if (!getOptions) {
      return function (s) {
        return setOptions((0, _flattenOptions["default"])(filter(defaultOptions)(s)));
      };
    }

    return (0, _debounce["default"])(function (s) {
      var optionsReq = getOptions(s, defaultOptions);
      setFetching(true);
      Promise.resolve(optionsReq).then(function (newOptions) {
        setOptions((0, _flattenOptions["default"])(filter(newOptions)(s)));
      })["finally"](function () {
        return setFetching(false);
      });
    }, debounceTime);
  }, [filterOptions, defaultOptions, getOptions, debounceTime]);
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