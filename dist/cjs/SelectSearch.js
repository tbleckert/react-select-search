"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _fuse = _interopRequireDefault(require("fuse.js"));

var _reactOnclickoutside = _interopRequireDefault(require("react-onclickoutside"));

var _FlattenOptions = _interopRequireDefault(require("./lib/FlattenOptions"));

var _GroupOptions = _interopRequireDefault(require("./lib/GroupOptions"));

var _createClasses = _interopRequireDefault(require("./lib/createClasses"));

var _findByValue = _interopRequireDefault(require("./lib/findByValue"));

var _toString = _interopRequireDefault(require("./lib/toString"));

var _Value = _interopRequireDefault(require("./Components/Value"));

var _Options = _interopRequireDefault(require("./Components/Options"));

var _Context = _interopRequireDefault(require("./Context"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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
      if (_this.props.disabled) {
        return;
      }

      _this.setState({
        focus: false,
        highlighted: null,
        search: ''
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onFocus", function () {
      if (_this.props.disabled) {
        return;
      }

      _this.setState({
        focus: true,
        options: _this.state.defaultOptions,
        search: ''
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
      var value = e.target.value;

      var options = _this.getNewOptionsList(_this.state.defaultOptions, (0, _toString.default)(value));

      _this.setState({
        search: value,
        options: options
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
      focus: false
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
    return _this;
  }

  _createClass(SelectSearch, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          autofocus = _this$props.autofocus,
          search = _this$props.search;

      if (autofocus && search && this.valueRef.current) {
        this.valueRef.current.focus();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var _this$state = this.state,
          focus = _this$state.focus,
          highlighted = _this$state.highlighted;
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
      var newOptions = options;

      if (options && options.length > 0 && value && value.length > 0) {
        var fuse = new _fuse.default(options, this.props.fuse);
        newOptions = fuse.search(value).map(function (item, index) {
          return Object.assign({}, item, {
            index: index
          });
        });
      }

      return newOptions;
    }
  }, {
    key: "getOptionsForRender",
    value: function getOptionsForRender() {
      var _this2 = this;

      var _this$props2 = this.props,
          multiple = _this$props2.multiple,
          maxOptions = _this$props2.maxOptions;

      var _this$state2 = this.state,
          options = _this$state2.options,
          state = _objectWithoutProperties(_this$state2, ["options"]);

      var mappedOptions = options.map(function (option, i) {
        var selected = multiple && Array.isArray(state.value) && state.value.indexOf(option.value) >= 0 || option.value === state.value;
        var highlighted = i === state.highlighted;
        var className = _this2.theme.classes.option;

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
          onChange: function onChange() {
            return _this2.onChange(option.value);
          },
          optionProps: {
            className: className,
            onClick: function onClick() {
              return _this2.onChange(option.value);
            },
            role: 'menuitem',
            'data-selected': selected ? 'true' : null,
            'data-highlighted': highlighted ? 'true' : null,
            disabled: _this2.props.disabled
          },
          key: "".concat(option.value, "-option")
        });
      });

      if (maxOptions) {
        mappedOptions = mappedOptions.slice(0, maxOptions);
      }

      return (0, _GroupOptions.default)(mappedOptions);
    }
  }, {
    key: "getValueProps",
    value: function getValueProps(value) {
      var _this$props3 = this.props,
          searchEnabled = _this$props3.search,
          autoComplete = _this$props3.autoComplete,
          disabled = _this$props3.disabled;
      var _this$state3 = this.state,
          search = _this$state3.search,
          focus = _this$state3.focus;
      var val = value ? value.name : '';
      return {
        disabled: disabled,
        option: value,
        state: this.state,
        className: this.theme.classes.search,
        tabIndex: '0',
        onFocus: this.onFocus,
        onClick: this.onFocus,
        readOnly: !this.props.search,
        value: searchEnabled && (search || focus) ? search : val,
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
      var _this$state4 = this.state,
          defaultOptions = _this$state4.defaultOptions,
          options = _this$state4.options,
          focus = _this$state4.focus;
      var _this$props4 = this.props,
          search = _this$props4.search,
          multiple = _this$props4.multiple,
          disabled = _this$props4.disabled;
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

      return _react.default.createElement(_Context.default.Provider, {
        value: this.theme
      }, _react.default.createElement("div", {
        ref: this.parentRef,
        className: className
      }, (search || !multiple) && _react.default.createElement(_Value.default, _extends({
        ref: this.valueRef
      }, valueProps)), options.length > 0 && (focus || multiple) && _react.default.createElement("div", {
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
  maxOptions: null,
  fuse: {
    keys: ['name', 'groupName'],
    threshold: 0.3
  },
  className: 'select-search-box',
  autoComplete: 'on',
  autofocus: false,
  renderOption: null,
  renderGroupHeader: null,
  renderValue: null,
  onChange: null,
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
  placeholder: _propTypes.default.string,
  maxOptions: _propTypes.default.number,
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
  autofocus: _propTypes.default.bool,
  // eslint-disable-next-line react/forbid-prop-types
  fuse: _propTypes.default.object,
  renderOption: _propTypes.default.func,
  renderGroupHeader: _propTypes.default.func,
  renderValue: _propTypes.default.func,
  onChange: _propTypes.default.func,
  disabled: _propTypes.default.bool
};
var _default = SelectSearch;
exports.default = _default;