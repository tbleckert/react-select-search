"use strict";

exports.__esModule = true;
exports["default"] = useSelect;

var _react = require("react");

var _flattenOptions = _interopRequireDefault(require("./lib/flattenOptions"));

var _groupOptions = _interopRequireDefault(require("./lib/groupOptions"));

var _highlightReducer = _interopRequireDefault(require("./highlightReducer"));

var _getOption = _interopRequireDefault(require("./lib/getOption"));

var _getNewValue = _interopRequireDefault(require("./lib/getNewValue"));

var _getDisplayValue = _interopRequireDefault(require("./lib/getDisplayValue"));

var _debounce = _interopRequireDefault(require("./lib/debounce"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function useSelect(_ref) {
  var _ref$value = _ref.value,
      defaultValue = _ref$value === void 0 ? null : _ref$value,
      _ref$options = _ref.options,
      defaultOptions = _ref$options === void 0 ? [] : _ref$options,
      _ref$search = _ref.search,
      canSearch = _ref$search === void 0 ? false : _ref$search,
      _ref$multiple = _ref.multiple,
      multiple = _ref$multiple === void 0 ? false : _ref$multiple,
      _ref$disabled = _ref.disabled,
      disabled = _ref$disabled === void 0 ? false : _ref$disabled,
      _ref$allowEmpty = _ref.allowEmpty,
      allowEmpty = _ref$allowEmpty === void 0 ? true : _ref$allowEmpty,
      _ref$closeOnSelect = _ref.closeOnSelect,
      closeOnSelect = _ref$closeOnSelect === void 0 ? true : _ref$closeOnSelect,
      _ref$getOptions = _ref.getOptions,
      getOptions = _ref$getOptions === void 0 ? null : _ref$getOptions,
      _ref$onChange = _ref.onChange,
      onChange = _ref$onChange === void 0 ? function () {} : _ref$onChange,
      _ref$debounce = _ref.debounce,
      debounceTime = _ref$debounce === void 0 ? 0 : _ref$debounce;
  var ref = (0, _react.useRef)(null);
  var flattenedOptions = (0, _react.useMemo)(function () {
    return (0, _flattenOptions["default"])(defaultOptions);
  }, [defaultOptions]);

  var _useState = (0, _react.useState)(defaultValue),
      value = _useState[0],
      setValue = _useState[1];

  var _useState2 = (0, _react.useState)(''),
      search = _useState2[0],
      setSearch = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      fetching = _useState3[0],
      setFetching = _useState3[1];

  var _useState4 = (0, _react.useState)(false),
      focus = _useState4[0],
      setFocus = _useState4[1];

  var _useReducer = (0, _react.useReducer)(_highlightReducer["default"], -1),
      highlighted = _useReducer[0],
      dispatchHighlighted = _useReducer[1];

  var _useState5 = (0, _react.useState)(flattenedOptions),
      options = _useState5[0],
      setOptions = _useState5[1];

  var _useState6 = (0, _react.useState)(function () {
    return (0, _getOption["default"])(value, options);
  }),
      option = _useState6[0],
      setOption = _useState6[1];

  var groupedOptions = (0, _react.useMemo)(function () {
    return (0, _groupOptions["default"])(options);
  }, [options]);
  var fetchOptions = (0, _react.useMemo)(function () {
    return (0, _debounce["default"])(function (q) {
      var optionsReq = getOptions(q, flattenedOptions, value);
      setFetching(true);
      Promise.resolve(optionsReq).then(function (newOptions) {
        return setOptions((0, _flattenOptions["default"])(newOptions));
      })["finally"](function () {
        return setFetching(false);
      });
    }, debounceTime);
  }, [flattenedOptions, value, getOptions, debounceTime]);
  var snapshot = {
    options: groupedOptions,
    option: option,
    displayValue: (0, _getDisplayValue["default"])(!option && !allowEmpty && options.length ? options[0] : option),
    value: value,
    search: search,
    fetching: fetching,
    focus: focus,
    highlighted: highlighted,
    disabled: disabled
  };

  var onFocus = function onFocus() {
    return setFocus(true);
  };

  var onBlur = function onBlur() {
    setFocus(false);
    setOptions(flattenedOptions);
    setSearch('');

    if (ref.current) {
      ref.current.blur();
    }
  };

  var onSelect = function onSelect(id) {
    // eslint-disable-next-line no-underscore-dangle,eqeqeq
    var item = id ? options.find(function (i) {
      return i.value == id;
    }) : options[highlighted];

    if (!item) {
      return;
    }

    var newValues = (0, _getNewValue["default"])(item.value, value, multiple);
    var newOption = (0, _getOption["default"])(newValues, options);
    setValue(newValues);
    setOption(newOption);
    onChange(newValues, newOption);
  };

  var onMouseDown = function onMouseDown(e) {
    if (!closeOnSelect) {
      e.preventDefault();
    }

    onSelect(e.currentTarget.value);
  };

  var onKeyDown = function onKeyDown(e) {
    var key = e.key;

    if (key === 'ArrowDown' || key === 'ArrowUp') {
      e.preventDefault();
      dispatchHighlighted({
        key: key,
        options: options
      });
    }
  };

  var onKeyPress = function onKeyPress(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSelect();

      if (closeOnSelect) {
        onBlur();
      }
    }
  };

  var onKeyUp = function onKeyUp(_ref2) {
    var key = _ref2.key;

    if (key === 'Escape') {
      onBlur();
    }
  };

  var onSearch = function onSearch(_ref3) {
    var target = _ref3.target;
    return setSearch(target.value);
  };

  var valueProps = {
    tabIndex: '0',
    readOnly: !canSearch,
    onFocus: onFocus,
    onBlur: onBlur,
    onKeyPress: onKeyPress,
    onKeyDown: onKeyDown,
    onKeyUp: onKeyUp,
    onChange: canSearch ? onSearch : null,
    disabled: disabled,
    ref: ref
  };
  var optionProps = {
    tabIndex: '-1',
    onMouseDown: onMouseDown,
    onKeyDown: onKeyDown,
    onKeyPress: onKeyPress,
    onBlur: onBlur
  };
  (0, _react.useEffect)(function () {
    return setValue(defaultValue);
  }, [defaultValue]);
  (0, _react.useEffect)(function () {
    return setOptions(flattenedOptions);
  }, [flattenedOptions]);
  (0, _react.useEffect)(function () {
    fetchOptions(search);
  }, [search, fetchOptions]);
  return [snapshot, valueProps, optionProps, setValue];
}