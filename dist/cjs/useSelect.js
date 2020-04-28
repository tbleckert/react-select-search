"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useSelectSearch;

var _react = require("react");

var _highlightReducer = _interopRequireDefault(require("./highlightReducer"));

var _getDisplayValue = _interopRequireDefault(require("./lib/getDisplayValue"));

var _flattenOptions = _interopRequireDefault(require("./lib/flattenOptions"));

var _groupOptions = _interopRequireDefault(require("./lib/groupOptions"));

var _getNewValue = _interopRequireDefault(require("./lib/getNewValue"));

var _getOption = _interopRequireDefault(require("./lib/getOption"));

var _search = _interopRequireDefault(require("./search"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function useSelectSearch({
  value: defaultValue = null,
  disabled = false,
  multiple = false,
  search: canSearch = false,
  fuse = false,
  options: defaultOptions,
  onChange = () => {},
  getOptions = null,
  allowEmpty = true
}) {
  const ref = (0, _react.useRef)(null);
  const [flatDefaultOptions, setFlatDefaultOptions] = (0, _react.useState)((0, _flattenOptions.default)(defaultOptions));
  const [flat, setOptions] = (0, _react.useState)([]);
  const [value, setValue] = (0, _react.useState)((0, _getOption.default)(defaultValue, flatDefaultOptions));
  const [search, setSearch] = (0, _react.useState)('');
  const [focus, setFocus] = (0, _react.useState)(false);
  const [searching, setSearching] = (0, _react.useState)(false);
  const [highlighted, setHighlighted] = (0, _react.useReducer)(_highlightReducer.default, -1);
  const options = (0, _react.useMemo)(() => (0, _groupOptions.default)(flat), [flat]);
  const displayValue = (0, _getDisplayValue.default)(value);

  const onBlur = () => {
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

  const onFocus = () => setFocus(true);

  const onSelect = val => {
    const option = (0, _getOption.default)(val, flat);
    const newValue = (0, _getNewValue.default)(option, value, multiple);
    setValue(newValue);

    if (multiple) {
      onChange(newValue.map(i => i.value), newValue);
    } else {
      onChange(option.value, option);
    }
  };

  const onMouseDown = e => onSelect(e.currentTarget.value);

  const onKeyDown = e => setHighlighted({
    key: e.key,
    options: flat
  });

  const onKeyPress = ({
    key
  }) => {
    if (key === 'Enter') {
      const option = flat[highlighted];

      if (option) {
        onSelect(option.value);

        if (!multiple) {
          onBlur();
        }
      }
    }
  };

  const onKeyUp = ({
    key
  }) => {
    if (key === 'Escape') {
      onBlur();
    }
  };

  const onSearch = ({
    target
  }) => {
    const {
      value: inputVal
    } = target;
    setSearch(inputVal);
    let searchableOption = flatDefaultOptions;

    if (getOptions && inputVal.length) {
      setSearching(true);
      searchableOption = getOptions(inputVal);
    }

    Promise.resolve(searchableOption).then(foundOptions => {
      if (inputVal.length) {
        const newOptions = (0, _search.default)(inputVal, foundOptions, fuse);
        setOptions(newOptions === false ? foundOptions : newOptions);
      } else {
        setOptions(foundOptions);
      }
    }).catch(() => setOptions(flatDefaultOptions)).finally(() => setSearching(false));
  };

  const valueProps = {
    tabIndex: '0',
    readOnly: !canSearch,
    onBlur,
    onFocus,
    onKeyPress,
    onKeyDown,
    onKeyUp,
    ref
  };

  if (canSearch) {
    valueProps.onChange = onSearch;
  }

  const optionProps = {
    tabIndex: '-1',
    onMouseDown
  };
  (0, _react.useEffect)(() => {
    if (defaultValue && flatDefaultOptions) {
      const option = (0, _getOption.default)(defaultValue, flatDefaultOptions);
      setValue(option);
    } else if (!defaultValue && flatDefaultOptions && !allowEmpty) {
      setValue(flatDefaultOptions[0]);
    }
  }, [defaultValue]);
  (0, _react.useEffect)(() => {
    const flatOptions = (0, _flattenOptions.default)(defaultOptions);
    setOptions(flatOptions);
    setFlatDefaultOptions(flatOptions);
  }, [defaultOptions]);
  return [{
    value,
    highlighted,
    options,
    disabled,
    displayValue,
    focus,
    search,
    searching
  }, valueProps, optionProps, setValue];
}