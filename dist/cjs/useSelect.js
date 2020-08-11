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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
      closeOnSelect = _ref$closeOnSelect === void 0 ? true : _ref$closeOnSelect,
      _ref$closable = _ref.closable,
      closable = _ref$closable === void 0 ? true : _ref$closable;
  var ref = (0, _react.useRef)(null);
  var flatDefaultOptions = (0, _react.useMemo)(function () {
    return (0, _flattenOptions["default"])(defaultOptions);
  }, [defaultOptions]);

  var _useState = (0, _react.useState)({
    flat: [],
    addedOptions: [],
    value: defaultValue,
    search: '',
    focus: false,
    searching: false,
    highlighted: -1,
    changed: false
  }),
      state = _useState[0],
      setState = _useState[1];

  var flat = state.flat,
      addedOptions = state.addedOptions,
      value = state.value,
      search = state.search,
      focus = state.focus,
      searching = state.searching,
      highlighted = state.highlighted;
  var option = (0, _react.useMemo)(function () {
    var newOption = (0, _getOption["default"])(value, [].concat(flatDefaultOptions, addedOptions));

    if (!newOption && !allowEmpty && !multiple) {
      newOption = flatDefaultOptions[0];
    }

    return newOption;
  }, [value, flatDefaultOptions, addedOptions, allowEmpty, multiple]);
  var options = (0, _react.useMemo)(function () {
    return (0, _groupOptions["default"])(flat);
  }, [flat]);
  var displayValue = (0, _react.useMemo)(function () {
    return (0, _getDisplayValue["default"])(option);
  }, [option]);
  var onBlur = (0, _react.useCallback)(function () {
    setState(function (oldState) {
      return _objectSpread(_objectSpread({}, oldState), {}, {
        focus: false,
        search: '',
        flat: flatDefaultOptions,
        highlighted: -1
      });
    });

    if (ref.current) {
      ref.current.blur();
    }
  }, [flatDefaultOptions, ref]);

  var setFocus = function setFocus(newFocus) {
    return setState(function (oldState) {
      return _objectSpread(_objectSpread({}, oldState), {}, {
        focus: newFocus
      });
    });
  };

  var onClick = function onClick() {
    return setFocus(!focus);
  };

  var onFocus = function onFocus() {
    return setFocus(true);
  };

  var onSelect = (0, _react.useCallback)(function (id) {
    setState(function (prevState) {
      var prevFlat = prevState.flat,
          prevHighlighted = prevState.highlighted; // eslint-disable-next-line no-underscore-dangle

      var item = id ? prevFlat.find(function (i) {
        return i._id === id;
      }) : prevFlat[prevHighlighted];

      if (!item) {
        return prevState;
      }

      var values = (0, _getNewValue["default"])(item.value, prevState.value, multiple);
      var newOptions = (0, _getOption["default"])(values, prevFlat);
      return _objectSpread(_objectSpread({}, prevState), {}, {
        addedOptions: multiple ? newOptions : [newOptions],
        value: values,
        changed: [values, newOptions]
      });
    });
  }, [multiple]);
  var onMouseDown = (0, _react.useCallback)(function (e) {
    if (!closeOnSelect) {
      e.preventDefault();
    }

    onSelect(e.currentTarget.value);
  }, [onSelect, closeOnSelect, multiple]);
  var onKeyDown = (0, _react.useCallback)(function (e) {
    var key = e.key;

    if (key === 'ArrowDown' || key === 'ArrowUp') {
      e.preventDefault();
      setState(function (oldState) {
        return _objectSpread(_objectSpread({}, oldState), {}, {
          highlighted: (0, _highlightReducer["default"])(oldState.highlighted, {
            key: key,
            options: oldState.flat
          })
        });
      });
    }
  }, []);
  var onKeyPress = (0, _react.useCallback)(function (_ref2) {
    var key = _ref2.key;

    if (key === 'Enter') {
      onSelect();

      if (closable && closeOnSelect) {
        onBlur();
      }
    }
  }, [onSelect, multiple, closeOnSelect, onBlur]);
  var onKeyUp = (0, _react.useCallback)(function (_ref3) {
    var key = _ref3.key;

    if (key === 'Escape') {
      onBlur();
    }
  }, [onBlur]);

  var onSearch = function onSearch(_ref4) {
    var target = _ref4.target;
    var inputVal = target.value;
    var newState = {
      search: inputVal
    };
    var searchableOption = flatDefaultOptions;

    if (getOptions && inputVal.length) {
      newState.searching = true;
      searchableOption = getOptions(inputVal);
    }

    setState(function (oldState) {
      return _objectSpread(_objectSpread({}, oldState), newState);
    });
    Promise.resolve(searchableOption).then(function (foundOptions) {
      var newOptions = foundOptions;

      if (inputVal.length) {
        newOptions = (0, _search["default"])(inputVal, foundOptions, fuse);
      }

      setState(function (oldState) {
        return _objectSpread(_objectSpread({}, oldState), {}, {
          flat: newOptions === false ? foundOptions : newOptions,
          searching: false
        });
      });
    })["catch"](function () {
      return setState(function (oldState) {
        return _objectSpread(_objectSpread({}, oldState), {}, {
          flat: flatDefaultOptions,
          searching: false
        });
      });
    });
  };

  var valueProps = {
    tabIndex: '0',
    readOnly: !canSearch,
    onChange: canSearch ? onSearch : null,
    disabled: disabled,
    onMouseDown: onClick,
    onBlur: onBlur,
    onFocus: onFocus,
    onKeyPress: onKeyPress,
    onKeyDown: onKeyDown,
    onKeyUp: onKeyUp,
    ref: ref
  };
  var optionProps = (0, _react.useMemo)(function () {
    return {
      tabIndex: '-1',
      onMouseDown: onMouseDown,
      onKeyDown: onKeyDown,
      onKeyPress: onKeyPress,
      onBlur: onBlur
    };
  }, [onMouseDown, onKeyDown, onKeyPress, onBlur]);
  (0, _react.useEffect)(function () {
    setState(function (oldState) {
      return _objectSpread(_objectSpread({}, oldState), {}, {
        value: defaultValue
      });
    });
  }, [defaultValue]);
  (0, _react.useEffect)(function () {
    setState(function (oldState) {
      return _objectSpread(_objectSpread({}, oldState), {}, {
        flat: flatDefaultOptions
      });
    });
  }, [flatDefaultOptions]);
  (0, _react.useEffect)(function () {
    if (state.changed !== false) {
      setState(function (oldState) {
        return _objectSpread(_objectSpread({}, oldState), {}, {
          changed: false
        });
      });
      onChange.apply(void 0, state.changed);
    }
  }, [state.changed, onChange]);
  return [{
    value: option,
    highlighted: highlighted,
    options: options,
    disabled: disabled,
    displayValue: displayValue,
    focus: focus,
    search: search,
    searching: searching
  }, valueProps, optionProps, function (newValue) {
    return setState(function (oldState) {
      return _objectSpread(_objectSpread({}, oldState), {}, {
        value: newValue
      });
    });
  }];
}