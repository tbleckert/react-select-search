"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _fuse = _interopRequireDefault(require("fuse.js"));

var _reactOnclickoutside = _interopRequireDefault(require("react-onclickoutside"));

var _Bem = _interopRequireDefault(require("./Bem"));

var _FlattenOptions = _interopRequireDefault(require("./FlattenOptions"));

var _GroupOptions = _interopRequireDefault(require("./GroupOptions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } _setPrototypeOf(subClass.prototype, superClass && superClass.prototype); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.getPrototypeOf || function _getPrototypeOf(o) { return o.__proto__; }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SelectSearch =
/*#__PURE__*/
function (_React$Component) {
  /**
   * Component setup
   * -------------------------------------------------------------------------*/
  function SelectSearch(props) {
    var _this;

    _classCallCheck(this, SelectSearch);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SelectSearch).call(this, props));

    _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleClickOutside", function () {
      _this.onBlur();
    }), "onBlur", function () {
      if (_this.props.search && !_this.props.multiple) {
        _this.search.current.blur();
      }

      var search = '';

      if (_this.state.value && _this.props.search && !_this.props.multiple) {
        var option = _this.findByValue(null, _this.state.value);

        search = option.name;
      }

      _this.setState({
        focus: false,
        highlighted: null,
        search: search
      });
    }), "onFocus", function () {
      _this.setState({
        focus: true,
        options: _this.state.defaultOptions,
        search: ''
      });
    }), "onChange", function (e) {
      var value = e.target.value;

      if (!value) {
        value = '';
      }

      var options = _this.state.defaultOptions;
      options = _this.getNewOptionsList(options, value);

      _this.setState({
        search: value,
        options: options
      });
    }), "onKeyPress", function (e) {
      if (!_this.state.options || _this.state.options.length < 1) {
        return;
      }
      /** Enter */


      if (e.keyCode === 13) {
        _this.handleEnter();
      }
    }), "onKeyDown", function (e) {
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
    }), "onKeyUp", function (e) {
      /** Esc */
      if (e.keyCode === 27) {
        _this.handleEsc();
      }
    }), "toggle", function () {
      if (_this.state.focus) {
        _this.onBlur();
      } else {
        _this.onFocus();
      }
    });

    var _options = props.options,
        _value = props.value,
        multiple = props.multiple;
    var stateValue = !_value && multiple ? [] : _value;
    var flattenedOptions = (0, _FlattenOptions.default)(_options);
    var _search = '';

    if (stateValue) {
      var option = _this.findByValue(flattenedOptions, stateValue);

      if (option) {
        _search = option.name;
      }
    }

    _this.state = {
      search: _search,
      value: stateValue,
      defaultOptions: flattenedOptions,
      options: flattenedOptions,
      highlighted: null,
      focus: false
    };
    _this.classes = {
      container: _this.props.multiple ? "".concat(_this.props.className, " ").concat(_Bem.default.m(_this.props.className, 'multiple')) : _this.props.className,
      search: _Bem.default.e(_this.props.className, 'search'),
      select: _Bem.default.e(_this.props.className, 'select'),
      options: _Bem.default.e(_this.props.className, 'options'),
      option: _Bem.default.e(_this.props.className, 'option'),
      row: _Bem.default.e(_this.props.className, 'row'),
      group: _Bem.default.e(_this.props.className, 'group'),
      groupHeader: _Bem.default.e(_this.props.className, 'group-header'),
      out: _Bem.default.e(_this.props.className, 'out'),
      label: _Bem.default.e(_this.props.className, 'label'),
      focus: _this.props.multiple ? "".concat(_this.props.className, " ").concat(_Bem.default.m(_this.props.className, 'multiple focus')) : "".concat(_this.props.className, " ").concat(_Bem.default.m(_this.props.className, 'focus'))
    };
    _this.classes.focus += " ".concat(_Bem.default.m(_this.props.className, 'select'));
    _this.classes.container += " ".concat(_Bem.default.m(_this.props.className, 'select'));
    _this.container = _react.default.createRef();
    _this.selectOptions = _react.default.createRef();
    _this.select = _react.default.createRef();
    _this.search = _react.default.createRef();
    _this.outInput = _react.default.createRef();
    return _this;
  }
  /**
   * Component lifecycle
   * -------------------------------------------------------------------------*/


  _createClass(SelectSearch, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.onMount.call(null, this.publishOption(), this.state, this.props);
      this.scrollToSelected();

      if (this.search.current && this.props.autofocus === true) {
        this.search.current.focus();
      }
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var nextState = {};

      if (nextProps.options !== this.state.defaultOptions) {
        var flattenedOptions = (0, _FlattenOptions.default)(nextProps.options);
        nextState.options = flattenedOptions;
        nextState.defaultOptions = flattenedOptions;
      }

      if (nextProps.value !== this.state.value) {
        nextState.value = nextProps.value;
      }

      this.setState(nextState);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      /* Fire callbacks */
      if (this.state.focus && this.state.focus !== prevState.focus) {
        this.handleFocus();
        this.props.onFocus.call(null, this.publishOption(), this.state, this.props);
      }

      if (!this.state.focus && this.state.focus !== prevState.focus) {
        this.handleBlur();
        this.props.onBlur.call(null, this.publishOption(), this.state, this.props);
      }

      if (this.state.highlighted !== prevState.highlighted) {
        this.props.onHighlight.call(null, this.state.options[this.state.highlighted], this.state, this.props);
      }

      this.scrollToSelected();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.removeEventListener('keydown', this.onKeyDown);
      document.removeEventListener('keypress', this.onKeyPress);
      document.removeEventListener('keyup', this.onKeyUp);
    }
    /**
     * DOM event handlers
     * -------------------------------------------------------------------------*/

  }, {
    key: "handleArrowDown",

    /**
     * Keyboard actions
     * -------------------------------------------------------------------------*/
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
      this.chooseOption();
    }
  }, {
    key: "handleEsc",
    value: function handleEsc() {
      this.onBlur();
    }
    /**
     * Custom methods
     * -------------------------------------------------------------------------*/

  }, {
    key: "publishOption",
    value: function publishOption(value) {
      var publishValue = value;

      if (typeof value === 'undefined') {
        publishValue = this.state.value;
      }

      if (this.props.multiple) {
        return this.publishOptionMultiple(publishValue);
      }

      return this.publishOptionSingle(publishValue);
    }
  }, {
    key: "publishOptionSingle",
    value: function publishOptionSingle(value) {
      return this.findByValue(null, value);
    }
  }, {
    key: "publishOptionMultiple",
    value: function publishOptionMultiple(value) {
      var _this2 = this;

      return value.map(function (publishValue) {
        return _this2.findByValue(null, publishValue);
      });
    }
  }, {
    key: "handleFocus",
    value: function handleFocus() {
      document.addEventListener('keydown', this.onKeyDown);
      document.addEventListener('keypress', this.onKeyPress);
      document.addEventListener('keyup', this.onKeyUp);

      if (this.state.options.length > 0 && !this.props.multiple) {
        var element = this.select.current;
        var clientHeight = document.documentElement.clientHeight;
        var viewportHeight = Math.max(clientHeight, window.innerHeight || 0);
        var elementPos = element.getBoundingClientRect();
        var selectHeight = viewportHeight - elementPos.top - 20;
        element.style.maxHeight = "".concat(selectHeight, "px");
        this.scrollToSelected(true, 'selected');
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
    key: "findIndexByOption",
    value: function findIndexByOption(searchOption, options) {
      var searchOptions = options;

      if (!options) {
        searchOptions = this.state.options;
      }

      if (searchOptions.length < 1) {
        return -1;
      }

      var index = -1;
      searchOptions.some(function (option, i) {
        if (option.value === searchOption.value) {
          index = i;
          return true;
        }

        return false;
      });
      return index;
    }
  }, {
    key: "findByValue",
    value: function findByValue(source, value) {
      var findSource = source;

      if (!source || source.length < 1) {
        findSource = this.state.defaultOptions;
      }

      if (!findSource) {
        return null;
      }

      return findSource.filter(function (object) {
        return object.value === value;
      })[0];
    }
  }, {
    key: "chooseOption",
    value: function chooseOption(value) {
      var _this3 = this;

      var currentValue = this.state.value;
      var option;
      var search;

      if (!value) {
        var index = this.state.highlighted;

        if (!index || this.state.options.length - 1 < index) {
          index = 0;
        }

        option = this.state.options[index];
      } else {
        option = this.findByValue(this.state.defaultOptions, value);
      }

      if (this.props.multiple) {
        if (!currentValue) {
          currentValue = [];
        }

        currentValue.push(option.value);
        search = '';
      } else {
        currentValue = option.value;
        search = option.name;
      }

      var options = this.state.defaultOptions;
      var highlighted = this.props.multiple ? this.state.highlighted : null;
      this.setState({
        value: currentValue,
        search: search,
        options: options,
        highlighted: highlighted,
        focus: this.props.multiple
      });
      setTimeout(function () {
        var publishOption = _this3.publishOption(currentValue);

        _this3.props.onChange.call(null, publishOption, _this3.state, _this3.props);
      }, 50);

      if (this.props.search && !this.props.multiple) {
        this.search.current.blur();
      }
    }
  }, {
    key: "removeOption",
    value: function removeOption(value) {
      var _this4 = this;

      if (!value) {
        return false;
      }

      var option = this.findByValue(this.state.defaultOptions, value);
      var optionValue = this.state.value;

      if (!option || optionValue.indexOf(option.value) < 0) {
        return false;
      }

      optionValue.splice(optionValue.indexOf(option.value), 1);
      this.setState({
        value: optionValue,
        search: ''
      });
      setTimeout(function () {
        _this4.props.onChange.call(null, _this4.publishOption(optionValue), _this4.state, _this4.props);
      }, 50);
      return true;
    }
  }, {
    key: "getNewOptionsList",
    value: function getNewOptionsList(options, value) {
      if (options && options.length > 0 && value && value.length > 0) {
        var fuse = new _fuse.default(options, this.props.fuse);
        return fuse.search(value);
      }

      return options;
    }
  }, {
    key: "scrollToSelected",
    value: function scrollToSelected() {
      var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var selected = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'hover';

      if (!force && (this.props.multiple || this.state.highlighted == null || !this.select.current || !this.selectOptions.current || !this.state.focus || this.state.options.length < 1)) {
        return;
      }

      var selectedItem = this.selectOptions.current.querySelector(".".concat(_Bem.default.m(this.classes.option, selected)));

      if (selectedItem) {
        this.select.current.scrollTop = selectedItem.offsetTop;
      }
    }
    /**
     * Component render
     * -------------------------------------------------------------------------*/

  }, {
    key: "renderOption",
    value: function renderOption(option, stateValue, multiple) {
      var _this5 = this;

      var elementVal = option.value;
      var element = null;
      var className = this.classes.option;
      className += " ".concat(this.classes.row);

      if (this.state.highlighted === option.index) {
        className += " ".concat(_Bem.default.m(this.classes.option, 'hover'));
      }

      if (multiple && stateValue.indexOf(elementVal) >= 0 || elementVal === stateValue) {
        className += " ".concat(_Bem.default.m(this.classes.option, 'selected'));
      }

      if (this.props.multiple) {
        if (this.state.value.indexOf(option.value) < 0) {
          element = _react.default.createElement("li", {
            role: "menuitem",
            className: className,
            onClick: function onClick() {
              return _this5.chooseOption(option.value);
            },
            key: "".concat(option.value, "-option"),
            "data-value": option.value
          }, this.props.renderOption(option, this.state, this.props));
        } else {
          element = _react.default.createElement("li", {
            role: "menuitem",
            className: className,
            onClick: function onClick() {
              return _this5.removeOption(option.value);
            },
            key: "".concat(option.value, "-option"),
            "data-value": option.value
          }, this.props.renderOption(option, this.state, this.props));
        }
      } else if (option.value === this.state.value) {
        element = _react.default.createElement("li", {
          role: "menuitem",
          className: className,
          key: "".concat(option.value, "-option"),
          "data-value": option.value
        }, this.props.renderOption(option));
      } else {
        element = _react.default.createElement("li", {
          role: "menuitem",
          className: className,
          onClick: function onClick() {
            return _this5.chooseOption(option.value);
          },
          key: "".concat(option.value, "-option"),
          "data-value": option.value
        }, this.props.renderOption(option, this.state, this.props));
      }

      return element;
    }
  }, {
    key: "renderOptions",
    value: function renderOptions() {
      var _this6 = this;

      var select = null;
      var selectStyle = {};
      var options = [];
      var multiple = this.props.multiple;
      var _this$state = this.state,
          stateValue = _this$state.value,
          foundOptions = _this$state.options;

      if (foundOptions && foundOptions.length > 0) {
        var groupedOptions = (0, _GroupOptions.default)(foundOptions);

        if (groupedOptions && groupedOptions.length) {
          groupedOptions.forEach(function (option) {
            if ({}.hasOwnProperty.call(option, 'type') && option.type === 'group') {
              var subOptions = [];
              option.items.forEach(function (groupOption) {
                subOptions.push(_this6.renderOption(groupOption, stateValue, multiple));
              });
              options.push(_react.default.createElement("li", {
                className: _this6.classes.row,
                key: option.groupId
              }, _react.default.createElement("div", {
                className: _this6.classes.group
              }, _react.default.createElement("div", {
                className: _this6.classes.groupHeader
              }, _this6.props.renderGroupHeader(option.name)), _react.default.createElement("ul", {
                className: _this6.classes.options
              }, subOptions))));
            } else {
              options.push(_this6.renderOption(option, stateValue, multiple));
            }
          });

          if (options.length > 0) {
            select = _react.default.createElement("ul", {
              ref: this.selectOptions,
              className: this.classes.options
            }, options);
          }
        }
      }

      if (this.props.multiple) {
        selectStyle.height = this.props.height;
      }

      var className = this.classes.select;

      if (this.state.focus) {
        className += " ".concat(_Bem.default.m(this.classes.select, 'display'));
      }

      return _react.default.createElement("div", {
        ref: this.select,
        className: className,
        style: selectStyle
      }, select);
    }
  }, {
    key: "renderOutElement",
    value: function renderOutElement() {
      var _this7 = this;

      var option = null;
      var outElement;

      if (this.props.multiple) {
        if (this.state.value) {
          var finalValueOptions = [];
          this.state.value.forEach(function (value) {
            option = _this7.findByValue(_this7.state.defaultOptions, value);
            finalValueOptions.push(_react.default.createElement("option", {
              key: option.value,
              value: option.value
            }, option.name));
          });
          outElement = _react.default.createElement("select", {
            value: this.state.value,
            className: this.classes.out,
            name: this.props.name,
            readOnly: true,
            multiple: true
          }, finalValueOptions);
        } else {
          outElement = _react.default.createElement("select", {
            className: this.classes.out,
            name: this.props.name,
            readOnly: true,
            multiple: true
          }, _react.default.createElement("option", null, "Nothing selected"));
        }
      } else if (this.props.search) {
        outElement = _react.default.createElement("input", {
          type: "hidden",
          defaultValue: this.state.value,
          ref: this.outInput,
          name: this.props.name
        });
      } else {
        var outStyle = {
          opacity: 0,
          position: 'absolute',
          top: '-9999px',
          left: '-9999px'
        };
        outElement = _react.default.createElement("input", {
          type: "text",
          onFocus: this.onFocus,
          style: outStyle,
          value: this.state.value,
          readOnly: true,
          ref: this.outInput,
          name: this.props.name
        });
      }

      return outElement;
    }
  }, {
    key: "renderSearchField",
    value: function renderSearchField() {
      var searchField = null;

      if (this.props.search) {
        var name = null;
        searchField = _react.default.createElement("input", {
          name: name,
          ref: this.search,
          onFocus: this.onFocus,
          onKeyPress: this.onKeyPress,
          className: this.classes.search,
          type: "search",
          value: this.state.search,
          onChange: this.onChange,
          placeholder: this.props.placeholder
        });
      } else {
        var option;
        var labelValue;
        var labelClassName;

        if (!this.state.value) {
          labelValue = this.props.placeholder;
          labelClassName = "".concat(this.classes.search, " ").concat(_Bem.default.m(this.classes.search, 'placeholder'));
        } else {
          option = this.findByValue(this.state.defaultOptions, this.state.value);

          if (!option) {
            option = this.state.defaultOptions[0];
          }

          labelValue = option.name;
          labelClassName = this.classes.search;
        }

        searchField = _react.default.createElement("div", {
          tabIndex: 0,
          role: "button",
          onClick: this.toggle,
          className: labelClassName
        }, this.props.renderValue(labelValue, option, this.state, this.props));
      }

      return searchField;
    }
  }, {
    key: "render",
    value: function render() {
      var className = this.state.focus ? this.classes.focus : this.classes.container;
      return _react.default.createElement("div", {
        className: className,
        ref: this.container
      }, this.renderOutElement(), this.renderSearchField(), this.renderOptions());
    }
  }]);

  _inherits(SelectSearch, _React$Component);

  return SelectSearch;
}(_react.default.Component);

_defineProperty(SelectSearch, "defaultProps", {
  className: 'select-search-box',
  search: true,
  value: '',
  placeholder: null,
  multiple: false,
  height: 200,
  name: null,
  autofocus: false,
  onHighlight: function onHighlight() {},
  onMount: function onMount() {},
  onBlur: function onBlur() {},
  onFocus: function onFocus() {},
  onChange: function onChange() {},
  renderOption: function renderOption(option) {
    return option.name;
  },
  renderGroupHeader: function renderGroupHeader(title) {
    return title;
  },
  renderValue: function renderValue(label) {
    return label;
  },
  fuse: {
    keys: ['name', 'groupName'],
    threshold: 0.3
  }
});

var _default = (0, _reactOnclickoutside.default)(SelectSearch);

exports.default = _default;