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

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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

    _defineProperty(_assertThisInitialized(_this), "onBlur", function () {
      var _this$props = _this.props,
          disabled = _this$props.disabled,
          multiple = _this$props.multiple,
          alwaysRenderOptions = _this$props.alwaysRenderOptions;
      var _this$state = _this.state,
          focus = _this$state.focus,
          search = _this$state.search;

      if (disabled || !focus) {
        return;
      }

      if (multiple || alwaysRenderOptions) {
        _this.setState({
          focus: false,
          highlighted: null
        });

        return;
      }

      _this.setState({
        focus: false,
        highlighted: null,
        options: _this.state.defaultOptions,
        search: ''
      });
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
      if (_this.props.disabled) {
        return;
      }

      var currentValue = _this.getValue().slice();

      var option;

      if (!value) {
        var index = _this.state.highlighted;

        if (!index || _this.state.options.length - 1 < index) {
          index = 0;
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

      var options = _this.state.defaultOptions;
      var highlighted = _this.props.multiple ? _this.state.highlighted : null;

      if (typeof _this.props.onChange === 'function') {
        _this.props.onChange(currentValue, option);
      }

      _this.setState({
        value: currentValue,
        options: options,
        highlighted: highlighted,
        focus: _this.props.multiple
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onSearch", function (e) {
      if (_this.searchPromise) {
        _this.searchPromise.cancel();
      }

      var value = e.target.value;
      var defaultOptions = _this.state.defaultOptions;

      var promise = _this.getNewOptionsList(defaultOptions, (0, _toString.default)(value));

      _this.searchPromise = (0, _cancelablePromise.default)(promise);

      _this.setState({
        search: value,
        searching: true
      });

      _this.searchPromise.promise.then(function (options) {
        _this.setState({
          options: options,
          searching: false
        });
      }).catch(function (error) {
        _this.setState({
          error: error,
          searching: false
        });
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onKeyPress", function (e) {
      if (!_this.state.options || _this.state.options.length < 1) {
        return;
      }
      /** Enter */


      if (e.keyCode === 13) {
        _this.handleEnter();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onKeyDown", function (e) {
      if (!_this.state.focus) {
        return;
      }
      /** Tab */


      if (e.keyCode === 9) {
        _this.onBlur();

        return;
      }
      /** Arrow Down */


      if (e.keyCode === 40) {
        _this.handleArrowDown();
      }
      /** Arrow Up */


      if (e.keyCode === 38) {
        _this.handleArrowUp();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onKeyUp", function (e) {
      /** Esc */
      if (e.keyCode === 27) {
        _this.handleEsc();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleClickOutside", function () {
      _this.onBlur();
    });

    var _options = props.options,
        _value = props.value,
        defaultValue = props.defaultValue,
        _multiple = props.multiple,
        className = props.className,
        renderOption = props.renderOption,
        renderValue = props.renderValue,
        renderGroupHeader = props.renderGroupHeader,
        onChange = props.onChange,
        placeholder = props.placeholder;
    _this.controlledValue = _value !== undefined && typeof onChange === 'function';
    var val = (0, _toString.default)(_this.controlledValue ? _value : defaultValue);
    var stateValue = !val && _multiple ? [] : val;
    var flattenedOptions = (0, _FlattenOptions.default)(_options);

    if (!stateValue && !placeholder && flattenedOptions.length) {
      stateValue = flattenedOptions[0].value;
    }

    _this.state = {
      search: '',
      value: stateValue,
      defaultOptions: flattenedOptions,
      options: flattenedOptions,
      highlighted: null,
      focus: false,
      error: false,
      searching: false
    };
    _this.theme = {
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
      var _this$props2 = this.props,
          autoFocus = _this$props2.autoFocus,
          search = _this$props2.search;

      if (autoFocus && search && this.valueRef.current) {
        this.valueRef.current.focus();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var _this$state2 = this.state,
          focus = _this$state2.focus,
          highlighted = _this$state2.highlighted;
      var prevFocus = prevState.focus,
          prevHighlighted = prevState.highlighted;

      if (prevFocus !== focus) {
        if (focus) {
          this.handleFocus();
        } else {
          this.handleBlur();
        }
      }

      if (highlighted !== null && highlighted !== prevHighlighted) {
        this.scrollToType('highlighted');
      }
    }
  }, {
    key: "getNewOptionsList",
    value: function getNewOptionsList(options, value) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        var filterOptions = _this2.props.filterOptions;

        var newOptions = _this2.fuzzySearch(options, value);

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

      var _this$state3 = this.state,
          options = _this$state3.options,
          state = _objectWithoutProperties(_this$state3, ["options"]);

      var mappedOptions = options.map(function (option, i) {
        var selected = multiple && Array.isArray(state.value) && state.value.indexOf(option.value) >= 0 || option.value === state.value;
        var highlighted = i === state.highlighted;
        var className = _this3.theme.classes.option;

        if (highlighted) {
          className += ' is-highlighted';
        }

        if (selected) {
          className += ' is-selected';
        }

        return _objectSpread({}, option, {
          option: option,
          selected: selected,
          highlighted: highlighted,
          disabled: option.disabled,
          onChange: function onChange() {
            return _this3.onChange(option.value);
          },
          optionProps: {
            className: className,
            onClick: function onClick() {
              return _this3.onChange(option.value);
            },
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
      var _this$props3 = this.props,
          searchEnabled = _this$props3.search,
          autoComplete = _this$props3.autoComplete,
          disabled = _this$props3.disabled,
          multiple = _this$props3.multiple,
          alwaysRenderOptions = _this$props3.alwaysRenderOptions;
      var _this$state4 = this.state,
          focus = _this$state4.focus,
          error = _this$state4.error,
          searching = _this$state4.searching;
      var search = this.state.search;
      var val = value ? value.name : '';

      if (!focus && !(multiple || alwaysRenderOptions)) {
        search = val;
      }

      return {
        disabled: disabled,
        error: error,
        searching: searching,
        option: value,
        className: this.theme.classes.search,
        tabIndex: '0',
        onFocus: this.onFocus,
        onClick: this.onFocus,
        readOnly: !this.props.search,
        value: searchEnabled ? search : val,
        placeholder: this.props.placeholder,
        onChange: searchEnabled ? this.onSearch : null,
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
      }

      return value;
    }
  }, {
    key: "fuzzySearch",
    value: function fuzzySearch(options, value) {
      var _this4 = this;

      return new Promise(function (resolve, reject) {
        if (_this4.props.fuse && options && options.length > 0 && value && value.length > 0) {
          var fuseOptions = _typeof(_this4.props.fuse) === 'object' ? _this4.props.fuse : {
            keys: ['name', 'groupName'],
            threshold: 0.3
          };
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
    key: "handleEnter",
    value: function handleEnter() {
      this.onChange();
    }
  }, {
    key: "handleEsc",
    value: function handleEsc() {
      this.onBlur();
    }
  }, {
    key: "handleFocus",
    value: function handleFocus() {
      document.addEventListener('keydown', this.onKeyDown);
      document.addEventListener('keypress', this.onKeyPress);
      document.addEventListener('keyup', this.onKeyUp);

      if (!this.props.multiple) {
        this.scrollToType('selected');
      }
    }
  }, {
    key: "handleBlur",
    value: function handleBlur() {
      document.removeEventListener('keydown', this.onKeyDown);
      document.removeEventListener('keypress', this.onKeyPress);
      document.removeEventListener('keyup', this.onKeyUp);
    }
  }, {
    key: "scrollToType",
    value: function scrollToType(type) {
      if (!this.parentRef.current) {
        return;
      }

      var parent = this.parentRef.current;
      var element = parent.querySelector("[data-".concat(type, "=\"true\"]"));

      if (element) {
        element.scrollIntoView({
          behavior: 'auto',
          block: 'center'
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state5 = this.state,
          defaultOptions = _this$state5.defaultOptions,
          options = _this$state5.options,
          focus = _this$state5.focus,
          searching = _this$state5.searching;
      var _this$props4 = this.props,
          search = _this$props4.search,
          multiple = _this$props4.multiple,
          disabled = _this$props4.disabled,
          alwaysRenderOptions = _this$props4.alwaysRenderOptions;
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
        className += " ".concat(this.theme.classes.main, "--disabled");
      }

      if (focus) {
        className += ' has-focus';
      }

      if (searching) {
        className += ' is-searching';
      }

      var showOptions = options.length > 0 && (focus || multiple);

      if (!showOptions && alwaysRenderOptions) {
        showOptions = true;
      }

      return _react.default.createElement(_Context.default.Provider, {
        value: this.theme
      }, _react.default.createElement("div", {
        ref: this.parentRef,
        className: className
      }, (search || !multiple) && _react.default.createElement(_Value.default, _extends({
        ref: this.valueRef
      }, valueProps)), showOptions && _react.default.createElement("div", {
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
  alwaysRenderOptions: undefined,
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
  alwaysRenderOptions: _propTypes.default.bool,
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
  modifier: _propTypes.default.string,
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