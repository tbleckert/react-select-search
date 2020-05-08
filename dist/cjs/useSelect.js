"use strict";

exports.__esModule = true;
exports["default"] = useSelectSearch;

var _react = require("react");

var _highlightReducer = _interopRequireDefault(require("./highlightReducer"));

var _getDisplayValue = _interopRequireDefault(require("./lib/getDisplayValue"));

var _flattenOptions = _interopRequireDefault(require("./lib/flattenOptions"));

var _groupOptions = _interopRequireDefault(require("./lib/groupOptions"));

var _getNewValue = _interopRequireDefault(require("./lib/getNewValue"));

var _getOption = _interopRequireDefault(require("./lib/getOption"));

var _search = _interopRequireDefault(require("./search"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function useSelectSearch(_ref) {
  var _ref$value = _ref.value,
      defaultValue = _ref$value === void 0 ? null : _ref$value,
      _ref$disabled = _ref.disabled,
      disabled = _ref$disabled === void 0 ? false : _ref$disabled,
      _ref$multiple = _ref.multiple,
      multiple = _ref$multiple === void 0 ? false : _ref$multiple,
      _ref$search = _ref.search,
      canSearch = _ref$search === void 0 ? false : _ref$search,
      _ref$fuse = _ref.fuse,
      fuse = _ref$fuse === void 0 ? false : _ref$fuse,
      defaultOptions = _ref.options,
      _ref$onChange = _ref.onChange,
      onChange = _ref$onChange === void 0 ? function () {} : _ref$onChange,
      _ref$getOptions = _ref.getOptions,
      getOptions = _ref$getOptions === void 0 ? null : _ref$getOptions,
      _ref$allowEmpty = _ref.allowEmpty,
      allowEmpty = _ref$allowEmpty === void 0 ? true : _ref$allowEmpty,
      _ref$closeOnSelect = _ref.closeOnSelect,
      closeOnSelect = _ref$closeOnSelect === void 0 ? true : _ref$closeOnSelect;
  var ref = (0, _react.useRef)(null);
  var flatDefaultOptions = (0, _react.useMemo)(function () {
    return (0, _flattenOptions["default"])(defaultOptions);
  }, [defaultOptions]);

  var _useState = (0, _react.useState)([]),
      flat = _useState[0],
      setOptions = _useState[1];

  var _useState2 = (0, _react.useState)([]),
      addedOptions = _useState2[0],
      setAddedOptions = _useState2[1];

  var _useState3 = (0, _react.useState)(defaultValue),
      value = _useState3[0],
      setValue = _useState3[1];

  var option = (0, _react.useMemo)(function () {
    var newOption = (0, _getOption["default"])(value, [].concat(flatDefaultOptions, addedOptions));

    if (!newOption && !allowEmpty) {
      newOption = flatDefaultOptions[0];
    }

    return newOption;
  }, [value, flatDefaultOptions, addedOptions, allowEmpty]);

  var _useState4 = (0, _react.useState)(''),
      search = _useState4[0],
      setSearch = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      focus = _useState5[0],
      setFocus = _useState5[1];

  var _useState6 = (0, _react.useState)(false),
      searching = _useState6[0],
      setSearching = _useState6[1];

  var _useReducer = (0, _react.useReducer)(_highlightReducer["default"], -1),
      highlighted = _useReducer[0],
      setHighlighted = _useReducer[1];

  var options = (0, _react.useMemo)(function () {
    return (0, _groupOptions["default"])(flat);
  }, [flat]);
  var displayValue = (0, _react.useMemo)(function () {
    return (0, _getDisplayValue["default"])(option);
  }, [option]);

  var onBlur = function onBlur() {
    setFocus(false);
    setHighlighted(false);

    if (ref.current) {
      ref.current.blur();
    }

    if (!multiple) {
      setSearch('');
      setOptions(flatDefaultOptions);
    }
  };

  var onFocus = function onFocus() {
    return setFocus(true);
  };

  var onSelect = function onSelect(val) {
    var newOption = (0, _getOption["default"])(val, flat);
    var newOptions = (0, _getNewValue["default"])(newOption, option, multiple);
    var values = multiple ? newOptions.map(function (i) {
      return i.value;
    }) : newOptions.value;
    setAddedOptions(multiple ? newOptions : [newOptions]);
    setValue(values);
    onChange(values, newOptions);
  };

  var onMouseDown = function onMouseDown(e) {
    if (!closeOnSelect) {
      e.preventDefault();
    }

    onSelect(e.currentTarget.value);
  };

  var onKeyDown = function onKeyDown(e) {
    return setHighlighted({
      key: e.key,
      options: flat
    });
  };

  var onKeyPress = function onKeyPress(_ref2) {
    var key = _ref2.key;

    if (key === 'Enter') {
      var newOption = flat[highlighted];

      if (newOption) {
        onSelect(newOption.value);

        if (!multiple) {
          onBlur();
        }
      }
    }
  };

  var onKeyUp = function onKeyUp(_ref3) {
    var key = _ref3.key;

    if (key === 'Escape') {
      onBlur();
    }
  };

  var onSearch = function onSearch(_ref4) {
    var target = _ref4.target;
    var inputVal = target.value;
    setSearch(inputVal);
    var searchableOption = flatDefaultOptions;

    if (getOptions && inputVal.length) {
      setSearching(true);
      searchableOption = getOptions(inputVal);
    }

    Promise.resolve(searchableOption).then(function (foundOptions) {
      if (inputVal.length) {
        var newOptions = (0, _search["default"])(inputVal, foundOptions, fuse);
        setOptions(newOptions === false ? foundOptions : newOptions);
      } else {
        setOptions(foundOptions);
      }
    })["catch"](function () {
      return setOptions(flatDefaultOptions);
    })["finally"](function () {
      return setSearching(false);
    });
  };

  var valueProps = {
    tabIndex: '0',
    readOnly: !canSearch,
    onChange: canSearch ? onSearch : null,
    onBlur: onBlur,
    onFocus: onFocus,
    onKeyPress: onKeyPress,
    onKeyDown: onKeyDown,
    onKeyUp: onKeyUp,
    ref: ref
  };
  var optionProps = {
    tabIndex: '-1',
    onMouseDown: onMouseDown
  };
  (0, _react.useEffect)(function () {
    setValue(defaultValue);
  }, [defaultValue]);
  (0, _react.useEffect)(function () {
    setOptions(flatDefaultOptions);
  }, [flatDefaultOptions]);
  return [{
    value: option,
    highlighted: highlighted,
    options: options,
    disabled: disabled,
    displayValue: displayValue,
    focus: focus,
    search: search,
    searching: searching
  }, valueProps, optionProps, setValue];
}