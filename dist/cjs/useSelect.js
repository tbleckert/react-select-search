"use strict";

exports.__esModule = true;
exports["default"] = useSelect;

var _react = require("react");

var _groupOptions = _interopRequireDefault(require("./lib/groupOptions"));

var _highlightReducer = _interopRequireDefault(require("./highlightReducer"));

var _getOption = _interopRequireDefault(require("./lib/getOption"));

var _getDisplayValue = _interopRequireDefault(require("./lib/getDisplayValue"));

var _useFilter = _interopRequireDefault(require("./useFilter"));

var _useFetch2 = _interopRequireDefault(require("./useFetch"));

var _getValue = _interopRequireDefault(require("./lib/getValue"));

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
      _ref$closeOnSelect = _ref.closeOnSelect,
      closeOnSelect = _ref$closeOnSelect === void 0 ? true : _ref$closeOnSelect,
      _ref$getOptions = _ref.getOptions,
      getOptions = _ref$getOptions === void 0 ? null : _ref$getOptions,
      _ref$filterOptions = _ref.filterOptions,
      filterOptions = _ref$filterOptions === void 0 ? null : _ref$filterOptions,
      _ref$fuse = _ref.fuse,
      fuse = _ref$fuse === void 0 ? false : _ref$fuse,
      _ref$onChange = _ref.onChange,
      onChange = _ref$onChange === void 0 ? function () {} : _ref$onChange,
      _ref$onFocus = _ref.onFocus,
      _onFocus = _ref$onFocus === void 0 ? function () {} : _ref$onFocus,
      _ref$onBlur = _ref.onBlur,
      _onBlur = _ref$onBlur === void 0 ? function () {} : _ref$onBlur,
      _ref$debounce = _ref.debounce,
      debounce = _ref$debounce === void 0 ? 0 : _ref$debounce;

  var ref = (0, _react.useRef)(null);
  var valueRef = (0, _react.useRef)(undefined);

  var _useState = (0, _react.useState)(null),
      value = _useState[0],
      setValue = _useState[1];

  var _useState2 = (0, _react.useState)(''),
      search = _useState2[0],
      setSearch = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      focus = _useState3[0],
      setFocus = _useState3[1];

  var _useReducer = (0, _react.useReducer)(_highlightReducer["default"], -1),
      highlighted = _useReducer[0],
      dispatchHighlighted = _useReducer[1];

  var filter = (0, _useFilter["default"])(filterOptions, fuse);

  var _useFetch = (0, _useFetch2["default"])(search, defaultOptions, {
    getOptions: getOptions,
    filter: filter,
    debounceTime: debounce
  }),
      options = _useFetch.options,
      fetching = _useFetch.fetching;

  var snapshot = (0, _react.useMemo)(function () {
    return {
      options: (0, _groupOptions["default"])(options),
      option: value,
      displayValue: (0, _getDisplayValue["default"])(value),
      value: (0, _getValue["default"])(value),
      search: search,
      fetching: fetching,
      focus: focus,
      highlighted: highlighted,
      disabled: disabled
    };
  }, [disabled, fetching, focus, options, highlighted, search, value]);
  var onSelect = (0, _react.useCallback)(function (newValue) {
    var newOption = (0, _getOption["default"])(newValue, value, Array.isArray(value) ? [].concat(value, options) : options, multiple);
    setValue(newOption);
    onChange((0, _getValue["default"])(newOption), newOption);

    if (closeOnSelect) {
      ref.current.blur();
    }
  }, [closeOnSelect, multiple, onChange, value, options]);
  var onMouseDown = (0, _react.useCallback)(function (e) {
    e.preventDefault();
    onSelect(e.currentTarget.value);
  }, [onSelect]);
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

      if (closeOnSelect) {
        ref.current.blur();
      }
    }
  }, [options, highlighted, closeOnSelect, onSelect]);
  var valueProps = (0, _react.useMemo)(function () {
    return {
      tabIndex: '0',
      readOnly: !canSearch,
      onFocus: function onFocus(e) {
        setFocus(true);

        _onFocus(e);
      },
      onBlur: function onBlur(e) {
        setFocus(false);
        setSearch('');

        _onBlur(e);
      },
      onKeyPress: onKeyPress,
      onKeyDown: onKeyDown,
      onKeyUp: function onKeyUp(e) {
        if (e.key === 'Escape') {
          e.preventDefault();
          ref.current.blur();
        }
      },
      onChange: canSearch ? function (_ref2) {
        var target = _ref2.target;
        return setSearch(target.value);
      } : null,
      disabled: disabled,
      ref: ref
    };
  }, [canSearch, _onFocus, _onBlur, onKeyPress, onKeyDown, disabled, ref]);
  var optionProps = (0, _react.useMemo)(function () {
    return {
      tabIndex: '-1',
      onMouseDown: onMouseDown
    };
  }, [onMouseDown]);
  (0, _react.useEffect)(function () {
    if (valueRef.current === defaultValue) {
      return;
    }

    valueRef.current = defaultValue;
    setValue((0, _getOption["default"])(defaultValue, null, options, multiple));
  }, [defaultValue, multiple, options]);
  return [snapshot, valueProps, optionProps, setValue];
}