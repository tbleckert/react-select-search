"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _FlattenOptions = _interopRequireDefault(require("./lib/FlattenOptions"));

var _GroupOptions = _interopRequireDefault(require("./lib/GroupOptions"));

var _createClasses = _interopRequireDefault(require("./lib/createClasses"));

var _findByValue = _interopRequireDefault(require("./lib/findByValue"));

var _toString = _interopRequireDefault(require("./lib/toString"));

var _cancelablePromise = _interopRequireDefault(require("./lib/cancelablePromise"));

var _Value = _interopRequireDefault(require("./Components/Value"));

var _Options = _interopRequireDefault(require("./Components/Options"));

var _Context = _interopRequireDefault(require("./Context"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SelectSearch =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(SelectSearch, _React$PureComponent);

  function SelectSearch(props) {
    var _this;

    _classCallCheck(this, SelectSearch);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SelectSearch).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "onBlur", function (e) {
      var relatedTarget = e.relatedTarget;
      var parent = !relatedTarget ? null : relatedTarget.closest(".".concat(_this.theme.classes.main));

      if (!parent || parent !== _this.parentRef.current) {
        _this.handleBlur();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onFocus", function () {
      if (_this.props.disabled || _this.state.focus) {
        return;
      }

      _this.setState({
        focus: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onChange", function (value) {
      var currentValue = _this.getValue().slice();

      var option;

      if (!value) {
        var index = _this.state.highlighted;

        if (index === null || _this.state.options.length - 1 < index) {
          return;
        }

        option = _this.state.options[index];
      } else {
        option = (0, _findByValue.default)(_this.state.defaultOptions, value);
      }

      if (_this.props.multiple) {
        var currentIndex = currentValue.indexOf(option.value);

        if (currentIndex > -1) {
          currentValue.splice(currentIndex, 1);
        } else {
          currentValue.push(option.value);
        }
      } else {
        currentValue = option.value;
      }

      var highlighted = _this.props.multiple ? _this.state.highlighted : null;

      if (typeof _this.props.onChange === 'function') {
        _this.props.onChange(currentValue, option);
      }

      _this.setState({
        value: currentValue,
        highlighted: highlighted,
        focus: _this.props.multiple
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onSearch", function (e) {
      return _this.setState({
        search: e.target.value
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onKeyPress", function (e) {
      if (e.key === 'Enter') {
        _this.onChange();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onKeyDown", function (e) {
      /** Arrow Down */
      if (e.key === 'ArrowDown') {
        _this.handleArrowDown();
      }
      /** Arrow Up */


      if (e.key === 'ArrowUp') {
        _this.handleArrowUp();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onKeyUp", function (e) {
      if (e.key === 'Escape') {
        _this.handleBlur();
      }
    });

    var options = props.options,
        _value = props.value,
        defaultValue = props.defaultValue,
        multiple = props.multiple,
        className = props.className,
        renderOption = props.renderOption,
        renderValue = props.renderValue,
        renderGroupHeader = props.renderGroupHeader,
        onChange = props.onChange,
        placeholder = props.placeholder;
    _this.controlledValue = _value !== undefined && typeof onChange === 'function';
    var val = (0, _toString.default)(_this.controlledValue ? _value : defaultValue);
    var stateValue = !val && multiple ? [] : val;
    var flattenedOptions = (0, _FlattenOptions.default)(options);

    if (!stateValue && !placeholder && flattenedOptions.length && !_this.props.multiple) {
      stateValue = flattenedOptions[0].value;
    }

    _this.state = {
      search: '',
      value: stateValue,
      defaultOptions: flattenedOptions,
      options: [],
      highlighted: null,
      focus: false,
      error: false,
      searching: false
    };
    _this.theme = {
      multiple: _this.props.multiple,
      search: _this.props.search,
      classes: typeof className === 'string' ? (0, _createClasses.default)(className) : className,
      renderers: {
        option: renderOption,
        value: renderValue,
        groupHeader: renderGroupHeader
      }
    }; // eslint-disable-next-line react/prop-types

    _this.parentRef = _this.props.innerRef || _react.default.createRef();
    _this.valueRef = _react.default.createRef();
    _this.searchPromise = null;
    return _this;
  }

  _createClass(SelectSearch, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          autoFocus = _this$props.autoFocus,
          search = _this$props.search,
          disabled = _this$props.disabled;

      if (!disabled && autoFocus && search && this.valueRef.current) {
        this.valueRef.current.focus();
        this.onFocus();
      }

      this.search();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var _this$state = this.state,
          focus = _this$state.focus,
          search = _this$state.search;
      var prevFocus = prevState.focus,
          prevSearch = prevState.search;
      var multiple = this.props.multiple;

      if (search !== prevSearch || prevFocus !== focus && focus && !multiple) {
        this.search();
      }

      if (prevFocus !== focus && !focus) {
        this.valueRef.current.blur();
      }
    }
  }, {
    key: "getNewOptionsList",
    value: function getNewOptionsList(options, value) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        var filterOptions = _this2.props.filterOptions;
        var fuseOptions = _typeof(_this2.props.fuse) === 'object' ? _this2.props.fuse : {
          keys: ['name', 'groupName'],
          threshold: 0.3
        };

        var newOptions = _this2.fuzzySearch(options, value, fuseOptions);

        if (typeof filterOptions === 'function') {
          newOptions.then(function (fuzzyOptions) {
            var result = filterOptions(fuzzyOptions, {
              value: _this2.getValue(),
              search: _this2.state.search,
              selected: _this2.state.selected,
              highlighted: _this2.state.highlighted,
              allOptions: _this2.state.defaultOptions
            });
            Promise.resolve(result).then(resolve).catch(reject);
          }).catch(reject);
        } else {
          resolve(Promise.resolve(newOptions));
        }
      });
    }
  }, {
    key: "getOptionsForRender",
    value: function getOptionsForRender() {
      var _this3 = this;

      var multiple = this.props.multiple;
      var _this$state2 = this.state,
          options = _this$state2.options,
          focus = _this$state2.focus,
          highlighted = _this$state2.highlighted;
      var value = this.getValue();
      var mappedOptions = options.map(function (option, i) {
        var selected = multiple && Array.isArray(value) && value.indexOf(option.value) >= 0 || option.value === value;
        var isHighlighted = i === highlighted;
        var className = _this3.theme.classes.option;

        if (isHighlighted) {
          className += ' is-highlighted';
        }

        if (selected) {
          className += ' is-selected';
        }

        return _objectSpread({}, option, {
          option: option,
          selected: selected,
          focus: focus,
          highlighted: isHighlighted,
          disabled: option.disabled,
          optionProps: {
            className: className,
            onClick: function onClick() {
              return _this3.onChange(option.value);
            },
            tabIndex: -1,
            role: 'menuitem',
            'data-selected': selected ? 'true' : null,
            'data-highlighted': highlighted ? 'true' : null,
            disabled: _this3.props.disabled || option.disabled
          },
          key: "".concat(option.value, "-option")
        });
      });
      return (0, _GroupOptions.default)(mappedOptions);
    }
  }, {
    key: "getValueProps",
    value: function getValueProps(value) {
      var _this$props2 = this.props,
          searchEnabled = _this$props2.search,
          autoComplete = _this$props2.autoComplete,
          disabled = _this$props2.disabled,
          multiple = _this$props2.multiple;
      var _this$state3 = this.state,
          focus = _this$state3.focus,
          error = _this$state3.error,
          searching = _this$state3.searching;
      var search = this.state.search;
      var val = value ? value.name : '';

      if (!focus && !multiple) {
        search = val;
      }

      return {
        disabled: disabled,
        error: error,
        searching: searching,
        option: value,
        className: this.theme.classes.input,
        tabIndex: '0',
        onFocus: this.onFocus,
        onBlur: this.onBlur,
        readOnly: !this.props.search,
        value: searchEnabled ? search : val,
        placeholder: this.props.placeholder,
        onChange: searchEnabled ? this.onSearch : null,
        onKeyDown: this.onKeyDown,
        onKeyUp: this.onKeyUp,
        onKeyPress: this.onKeyPress,
        type: searchEnabled ? 'search' : null,
        autoComplete: searchEnabled ? autoComplete : null,
        'aria-label': searchEnabled ? 'Search' : 'Select'
      };
    }
  }, {
    key: "getValue",
    value: function getValue() {
      var value = null;

      if (this.controlledValue) {
        value = this.props.value;
      } else {
        value = this.state.value;
      }

      if (!value && this.props.multiple) {
        value = [];
      } else if (this.props.multiple && !Array.isArray(value)) {
        value = [value];
      } else if (!value && !this.props.placeholder && this.state.defaultOptions.length) {
        var _this$state$defaultOp = _slicedToArray(this.state.defaultOptions, 1),
            option = _this$state$defaultOp[0];

        value = option.value;
      }

      return value;
    }
  }, {
    key: "search",
    value: function search() {
      var _this4 = this;

      if (this.searchPromise) {
        this.searchPromise.cancel();
      }

      var _this$state4 = this.state,
          defaultOptions = _this$state4.defaultOptions,
          search = _this$state4.search;
      var promise = this.getNewOptionsList(defaultOptions, (0, _toString.default)(search));
      this.searchPromise = (0, _cancelablePromise.default)(promise);
      this.setState({
        searching: true
      });
      this.searchPromise.promise.then(function (options) {
        _this4.setState({
          options: options,
          searching: false
        });
      }).catch(function (error) {
        _this4.setState({
          error: error,
          searching: false
        });
      });
    }
  }, {
    key: "fuzzySearch",
    value: function fuzzySearch(options, value, fuseOptions) {
      var _this5 = this;

      return new Promise(function (resolve, reject) {
        if (_this5.props.fuse && options && options.length > 0 && value && value.length > 0) {
          Promise.resolve().then(function () {
            return _interopRequireWildcard(require('fuse.js'));
          }).then(function (_ref) {
            var Fuse = _ref.default;
            var fuse = new Fuse(options, fuseOptions);
            var newOptions = fuse.search(value).map(function (item, index) {
              return Object.assign({}, item, {
                index: index
              });
            });
            resolve(newOptions);
          }).catch(reject);
        } else {
          resolve(options);
        }
      });
    }
  }, {
    key: "handleArrowDown",
    value: function handleArrowDown() {
      if (this.state.options.length < 1) {
        return;
      }

      var highlighted = null;

      if (this.state.highlighted != null) {
        highlighted = this.state.highlighted + 1;
      } else {
        highlighted = 0;
      }

      if (highlighted > this.state.options.length - 1) {
        highlighted = 0;
      }

      this.setState({
        highlighted: highlighted
      });
    }
  }, {
    key: "handleArrowUp",
    value: function handleArrowUp() {
      if (this.state.options.length < 1) {
        return;
      }

      var highlighted = this.state.options.length - 1;

      if (this.state.highlighted != null) {
        highlighted = this.state.highlighted - 1;
      }

      if (highlighted < 0) {
        highlighted = this.state.options.length - 1;
      }

      this.setState({
        highlighted: highlighted
      });
    }
  }, {
    key: "handleBlur",
    value: function handleBlur() {
      this.setState({
        focus: false,
        highlighted: null,
        search: ''
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state5 = this.state,
          defaultOptions = _this$state5.defaultOptions,
          focus = _this$state5.focus,
          searching = _this$state5.searching;
      var _this$props3 = this.props,
          search = _this$props3.search,
          multiple = _this$props3.multiple,
          disabled = _this$props3.disabled;
      var selectedOption = (0, _findByValue.default)(defaultOptions, this.getValue());
      var mappedOptions = this.getOptionsForRender();
      var valueProps = this.getValueProps(selectedOption);
      var className = this.theme.classes.main;

      if (search) {
        className += " ".concat(this.theme.classes.main, "--search");
      }

      if (multiple) {
        className += " ".concat(this.theme.classes.main, "--multiple");
      }

      if (disabled) {
        className += ' is-disabled';
      }

      if (focus) {
        className += ' has-focus';
      }

      if (searching) {
        className += ' is-searching';
      }

      return _react.default.createElement(_Context.default.Provider, {
        value: this.theme
      }, _react.default.createElement("div", {
        ref: this.parentRef,
        className: className
      }, (search || !multiple) && _react.default.createElement(_Value.default, _extends({
        ref: this.valueRef
      }, valueProps)), !disabled && _react.default.createElement("div", {
        className: this.theme.classes.select
      }, _react.default.createElement(_Options.default, {
        options: mappedOptions
      }))));
    }
  }]);

  return SelectSearch;
}(_react.default.PureComponent);

_defineProperty(SelectSearch, "defaultProps", {
  search: false,
  value: undefined,
  defaultValue: undefined,
  multiple: false,
  placeholder: '',
  fuse: true,
  className: 'select-search-box',
  autoComplete: 'on',
  autoFocus: false,
  renderOption: null,
  renderGroupHeader: null,
  renderValue: null,
  onChange: null,
  filterOptions: null,
  disabled: false
});

var optionType = _propTypes.default.shape({
  name: _propTypes.default.string.isRequired,
  value: _propTypes.default.string.isRequired
});

SelectSearch.propTypes = {
  options: _propTypes.default.arrayOf(_propTypes.default.oneOfType([optionType, _propTypes.default.shape({
    name: _propTypes.default.string.isRequired,
    type: _propTypes.default.oneOf(['group']).isRequired,
    items: _propTypes.default.arrayOf(optionType).isRequired
  })])).isRequired,
  defaultValue: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.array]),
  value: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.array]),
  multiple: _propTypes.default.bool,
  search: _propTypes.default.bool,
  disabled: _propTypes.default.bool,
  placeholder: _propTypes.default.string,
  className: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.shape({
    main: _propTypes.default.string,
    value: _propTypes.default.string,
    search: _propTypes.default.string,
    select: _propTypes.default.string,
    options: _propTypes.default.string,
    optionRow: _propTypes.default.string,
    option: _propTypes.default.string,
    group: _propTypes.default.string,
    groupHeader: _propTypes.default.string
  })]),
  autoComplete: _propTypes.default.oneOf(['on', 'off']),
  autoFocus: _propTypes.default.bool,
  // eslint-disable-next-line react/forbid-prop-types
  fuse: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.shape({
    keys: _propTypes.default.arrayOf(_propTypes.default.string).isRequired,
    threshold: _propTypes.default.number.isRequired
  })]),
  renderOption: _propTypes.default.func,
  renderGroupHeader: _propTypes.default.func,
  renderValue: _propTypes.default.func,
  onChange: _propTypes.default.func,
  filterOptions: _propTypes.default.func
};
var _default = SelectSearch;
exports.default = _default;