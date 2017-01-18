'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _fuse = require('fuse.js');

var _fuse2 = _interopRequireDefault(_fuse);

var _reactOnclickoutside = require('react-onclickoutside');

var _reactOnclickoutside2 = _interopRequireDefault(_reactOnclickoutside);

var _Bem = require('./Bem');

var _Bem2 = _interopRequireDefault(_Bem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var displayName = 'SelectSearch';
var propTypes = {
    options: _react2.default.PropTypes.array.isRequired,
    className: _react2.default.PropTypes.string.isRequired,
    search: _react2.default.PropTypes.bool.isRequired,
    placeholder: _react2.default.PropTypes.string,
    multiple: _react2.default.PropTypes.bool.isRequired,
    height: _react2.default.PropTypes.number,
    name: _react2.default.PropTypes.string,
    fuse: _react2.default.PropTypes.object.isRequired,
    onChange: _react2.default.PropTypes.func.isRequired,
    onHighlight: _react2.default.PropTypes.func.isRequired,
    onMount: _react2.default.PropTypes.func.isRequired,
    onBlur: _react2.default.PropTypes.func.isRequired,
    onFocus: _react2.default.PropTypes.func.isRequired,
    renderOption: _react2.default.PropTypes.func.isRequired,
    value: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.array])
};

var defaultProps = {
    options: [],
    className: 'select-search-box',
    search: true,
    value: '',
    placeholder: null,
    multiple: false,
    height: 200,
    name: null,
    onHighlight: function onHighlight() {},
    onMount: function onMount() {},
    onBlur: function onBlur() {},
    onFocus: function onFocus() {},
    onChange: function onChange() {},
    renderOption: function renderOption(option) {
        return option.name;
    },
    fuse: {
        keys: ['name'],
        threshold: 0.3
    }
};

var Component = function (_React$Component) {
    _inherits(Component, _React$Component);

    /**
     * Component setup
     * -------------------------------------------------------------------------*/
    function Component(props) {
        _classCallCheck(this, Component);

        var _this = _possibleConstructorReturn(this, (Component.__proto__ || Object.getPrototypeOf(Component)).call(this, props));

        var options = props.options;
        var value = !props.value && props.multiple ? [] : props.value;
        var search = '';

        if (value) {
            var option = _this.findByValue(options, value);

            if (option) {
                search = option.name;
            }
        }

        _this.placeSelectedFirst(options, value);

        _this.state = {
            search: search,
            value: value,
            defaultOptions: props.options,
            options: options,
            highlighted: null,
            focus: false
        };

        _this.classes = {
            container: _this.props.multiple ? _this.props.className + ' ' + _Bem2.default.m(_this.props.className, 'multiple') : _this.props.className,
            search: _Bem2.default.e(_this.props.className, 'search'),
            select: _Bem2.default.e(_this.props.className, 'select'),
            options: _Bem2.default.e(_this.props.className, 'options'),
            option: _Bem2.default.e(_this.props.className, 'option'),
            out: _Bem2.default.e(_this.props.className, 'out'),
            label: _Bem2.default.e(_this.props.className, 'label'),
            focus: _this.props.multiple ? _this.props.className + ' ' + _Bem2.default.m(_this.props.className, 'multiple focus') : _this.props.className + ' ' + _Bem2.default.m(_this.props.className, 'focus')
        };

        _this.classes.focus += ' ' + _Bem2.default.m(_this.props.className, 'select');
        _this.classes.container += ' ' + _Bem2.default.m(_this.props.className, 'select');

        _this.bind();
        return _this;
    }

    _createClass(Component, [{
        key: 'bind',
        value: function bind() {
            this.bound = {
                onClickOut: this.onClickOut.bind(this),
                onFocus: this.onFocus.bind(this),
                onBlur: this.onBlur.bind(this),
                onChange: this.onChange.bind(this),
                onKeyPress: this.onKeyPress.bind(this),
                onKeyDown: this.onKeyDown.bind(this),
                onKeyUp: this.onKeyUp.bind(this),
                toggle: this.toggle.bind(this)
            };
        }

        /**
         * Component lifecycle
         * -------------------------------------------------------------------------*/

    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {}
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.options) {
                this.setState({
                    options: nextProps.options,
                    defaultOptions: nextProps.options
                });
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.props.onMount.call(null, this.publishOption(), this.state, this.props);
            this.scrollToSelected();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            document.removeEventListener('keydown', this.bound.onKeyDown);
            document.removeEventListener('keypress', this.bound.onKeyPress);
            document.removeEventListener('keyup', this.bound.onKeyUp);
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            /* Fire callbacks */
            if (this.state.focus && this.state.focus != prevState.focus) {
                this.handleFocus();
                this.props.onFocus.call(null, this.publishOption(), this.state, this.props);
            }

            if (!this.state.focus && this.state.focus != prevState.focus) {
                this.handleBlur();
                this.props.onBlur.call(null, this.publishOption(), this.state, this.props);
            }

            if (this.state.highlighted !== prevState.highlighted) {
                this.props.onHighlight.call(null, this.state.options[this.state.highlighted], this.state, this.props);
            }

            this.scrollToSelected();
        }

        /**
         * DOM event handlers
         * -------------------------------------------------------------------------*/

    }, {
        key: 'onClickOut',
        value: function onClickOut() {
            this.onBlur();
        }
    }, {
        key: 'onBlur',
        value: function onBlur() {
            if (this.props.search && !this.props.multiple) {
                this.refs.search.blur();
            }

            var search = '';

            if (this.state.value && this.props.search && !this.props.multiple) {
                var option = this.findByValue(null, this.state.value);
                search = option.name;
            }

            this.setState({ focus: false, highlighted: null, search: search });
        }
    }, {
        key: 'onFocus',
        value: function onFocus() {
            this.setState({ focus: true, options: this.state.defaultOptions, search: '' });
        }
    }, {
        key: 'onChange',
        value: function onChange(e) {
            var value = e.target.value;

            if (!value) {
                value = '';
            }

            var options = this.state.defaultOptions;
            options = this.getNewOptionsList(options, value);

            this.placeSelectedFirst(options);

            this.setState({ search: value, options: options });
        }
    }, {
        key: 'onKeyPress',
        value: function onKeyPress(e) {
            if (!this.state.options || this.state.options.length < 1) {
                return;
            }

            /** Enter */
            if (e.keyCode === 13) {
                return this.handleEnter();
            }
        }
    }, {
        key: 'onKeyDown',
        value: function onKeyDown(e) {
            if (!this.state.focus) {
                return;
            }

            /** Tab */
            if (e.keyCode === 9) {
                return this.onBlur();
            }

            /** Arrow Down */
            if (e.keyCode === 40) {
                this.handleArrowDown();
            }

            /** Arrow Up */
            if (e.keyCode === 38) {
                this.handleArrowUp();
            }
        }
    }, {
        key: 'onKeyUp',
        value: function onKeyUp(e) {
            /** Esc */
            if (e.keyCode === 27) {
                this.handleEsc();
            }
        }

        /**
         * Keyboard actions
         * -------------------------------------------------------------------------*/

    }, {
        key: 'handleArrowDown',
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

            this.setState({ highlighted: highlighted });
        }
    }, {
        key: 'handleArrowUp',
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

            this.setState({ highlighted: highlighted });
        }
    }, {
        key: 'handleEnter',
        value: function handleEnter() {
            this.chooseOption();
        }
    }, {
        key: 'handleEsc',
        value: function handleEsc() {
            this.onBlur();
        }

        /**
         * Custom methods
         * -------------------------------------------------------------------------*/

    }, {
        key: 'publishOption',
        value: function publishOption(value) {
            if (typeof value === 'undefined') {
                value = this.state.value;
            }

            if (this.props.multiple) {
                return this.publishOptionMultiple(value);
            }

            return this.publishOptionSingle(value);
        }
    }, {
        key: 'publishOptionSingle',
        value: function publishOptionSingle(value) {
            return this.findByValue(null, value);
        }
    }, {
        key: 'publishOptionMultiple',
        value: function publishOptionMultiple(value) {
            var _this2 = this;

            return value.map(function (value) {
                return _this2.findByValue(null, value);
            });
        }
    }, {
        key: 'handleFocus',
        value: function handleFocus() {
            document.addEventListener('keydown', this.bound.onKeyDown);
            document.addEventListener('keypress', this.bound.onKeyPress);
            document.addEventListener('keyup', this.bound.onKeyUp);

            if (this.state.options.length > 0 && !this.props.multiple) {
                var element = this.refs.select;
                var viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
                var elementPos = element.getBoundingClientRect();
                var selectHeight = viewportHeight - elementPos.top - 20;

                element.style.maxHeight = selectHeight + 'px';
            }
        }
    }, {
        key: 'handleBlur',
        value: function handleBlur() {
            document.removeEventListener('keydown', this.bound.onKeyDown);
            document.removeEventListener('keypress', this.bound.onKeyPress);
            document.removeEventListener('keyup', this.bound.onKeyUp);
        }
    }, {
        key: 'findIndexByOption',
        value: function findIndexByOption(searchOption, options) {
            if (!options) {
                options = this.state.options;
            }

            if (options.length < 1) {
                return -1;
            }

            var index = -1;

            options.some(function (option, i) {
                if (option.value === searchOption.value) {
                    index = i;
                    return true;
                }

                return false;
            });

            return index;
        }
    }, {
        key: 'findByValue',
        value: function findByValue(source, value) {
            if (!source || source.length < 1) {
                source = this.state.defaultOptions;
            }

            if (!source) {
                return null;
            }

            return source.filter(function (object) {
                return object.value === value;
            })[0];
        }
    }, {
        key: 'toggle',
        value: function toggle() {
            if (this.state.focus) {
                this.onBlur();
            } else {
                this.onFocus();
            }
        }
    }, {
        key: 'placeSelectedFirst',
        value: function placeSelectedFirst(options, value) {
            if (!value && this.state) {
                value = this.state.value;
            }

            if (this.props.multiple || !value) {
                return options;
            }

            var option = this.findByValue(options, value);

            if (!option) {
                return options;
            }

            var index = this.findIndexByOption(option, options);

            if (index < 0 || index > options.length - 1) {
                return options;
            }

            options.splice(index, 1);
            options.splice(0, 0, option);

            return options;
        }
    }, {
        key: 'chooseOption',
        value: function chooseOption(value) {
            var _this3 = this;

            var currentValue = this.state.value;
            var option = void 0;
            var search = void 0;

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

            this.placeSelectedFirst(options, option.value);

            this.setState({ value: currentValue, search: search, options: options, highlighted: highlighted, focus: this.props.multiple });

            setTimeout(function () {
                _this3.props.onChange.call(null, _this3.publishOption(currentValue), _this3.state, _this3.props);
            }, 50);

            if (this.props.search && !this.props.multiple) {
                this.refs.search.blur();
            }
        }
    }, {
        key: 'removeOption',
        value: function removeOption(value) {
            var _this4 = this;

            if (!value) {
                return false;
            }

            var option = this.findByValue(this.state.defaultOptions, value);
            value = this.state.value;

            if (!option || value.indexOf(option.value) < 0) {
                return false;
            }

            value.splice(value.indexOf(option.value), 1);

            this.setState({ value: value, search: '' });

            setTimeout(function () {
                _this4.props.onChange.call(null, _this4.publishOption(value), _this4.state, _this4.props);
            }, 50);
        }
    }, {
        key: 'getNewOptionsList',
        value: function getNewOptionsList(options, value) {
            if (options && options.length > 0 && value && value.length > 0) {
                var fuse = new _fuse2.default(options, this.props.fuse);
                var foundOptions = fuse.search(value);

                return foundOptions;
            }

            return options;
        }
    }, {
        key: 'scrollToSelected',
        value: function scrollToSelected() {
            if (this.props.multiple || this.state.highlighted == null || !this.refs.select || !this.state.focus || this.state.options.length < 1) {
                return;
            }

            var selectedItem = this.refs.selectOptions.querySelector('.' + _Bem2.default.m(this.classes.option, 'hover'));

            this.refs.select.scrollTop = selectedItem.offsetTop;
        }

        /**
         * Component render
         * -------------------------------------------------------------------------*/

    }, {
        key: 'renderOption',
        value: function renderOption() {}
    }, {
        key: 'renderOptions',
        value: function renderOptions() {
            var _this5 = this;

            var select = null;
            var options = [];
            var selectStyle = {};
            var foundOptions = this.state.options;

            if (foundOptions && foundOptions.length > 0) {
                foundOptions.forEach(function (element, i) {
                    var className = _this5.classes.option;

                    if (_this5.state.highlighted === i) {
                        className += ' ' + _Bem2.default.m(_this5.classes.option, 'hover');
                    }

                    if (_this5.props.multiple && _this5.state.value.indexOf(element.value) >= 0 || element.value === _this5.state.value) {
                        className += ' ' + _Bem2.default.m(_this5.classes.option, 'selected');
                    }

                    if (_this5.props.multiple) {
                        if (_this5.state.value.indexOf(element.value) < 0) {
                            options.push(_react2.default.createElement(
                                'li',
                                { className: className, onClick: _this5.chooseOption.bind(_this5, element.value), key: element.value + '-option', 'data-value': element.value },
                                _this5.props.renderOption(element, _this5.state, _this5.props)
                            ));
                        } else {
                            options.push(_react2.default.createElement(
                                'li',
                                { className: className, onClick: _this5.removeOption.bind(_this5, element.value), key: element.value + '-option', 'data-value': element.value },
                                _this5.props.renderOption(element, _this5.state, _this5.props)
                            ));
                        }
                    } else {
                        if (element.value === _this5.state.value) {
                            options.push(_react2.default.createElement(
                                'li',
                                { className: className, key: element.value + '-option', 'data-value': element.value },
                                _this5.props.renderOption(element)
                            ));
                        } else {
                            options.push(_react2.default.createElement(
                                'li',
                                { className: className, onClick: _this5.chooseOption.bind(_this5, element.value), key: element.value + '-option', 'data-value': element.value },
                                _this5.props.renderOption(element, _this5.state, _this5.props)
                            ));
                        }
                    }
                });

                if (options.length > 0) {
                    select = _react2.default.createElement(
                        'ul',
                        { ref: 'selectOptions', className: this.classes.options },
                        options
                    );
                }
            }

            if (this.props.multiple) {
                selectStyle.height = this.props.height;
            }

            var className = this.classes.select;

            if (this.state.focus) {
                className += ' ' + _Bem2.default.m(this.classes.select, 'display');
            }

            return _react2.default.createElement(
                'div',
                { ref: 'select', className: className, style: selectStyle },
                select
            );
        }
    }, {
        key: 'renderOutElement',
        value: function renderOutElement() {
            var _this6 = this;

            var option = null;
            var outElement = void 0;

            if (this.props.multiple) {
                if (this.state.value) {
                    (function () {
                        var finalValueOptions = [];

                        _this6.state.value.forEach(function (value, i) {
                            option = this.findByValue(this.state.defaultOptions, value);
                            finalValueOptions.push(_react2.default.createElement(
                                'option',
                                { key: i, value: option.value },
                                option.name
                            ));
                        }.bind(_this6));

                        outElement = _react2.default.createElement(
                            'select',
                            { value: _this6.state.value, className: _this6.classes.out, name: _this6.props.name, readOnly: true, multiple: true },
                            finalValueOptions
                        );
                    })();
                } else {
                    outElement = _react2.default.createElement(
                        'select',
                        { className: this.classes.out, name: this.props.name, readOnly: true, multiple: true },
                        _react2.default.createElement(
                            'option',
                            null,
                            'Nothing selected'
                        )
                    );
                }
            } else {
                if (this.props.search) {
                    outElement = _react2.default.createElement('input', { type: 'hidden', defaultValue: this.state.value, ref: 'outInput', name: this.props.name });
                } else {
                    var outStyle = {
                        opacity: 0,
                        position: 'absolute',
                        top: '-9999px',
                        left: '-9999px'
                    };

                    outElement = _react2.default.createElement('input', { type: 'text', onFocus: this.bound.onFocus, style: outStyle, value: this.state.value, readOnly: true, ref: 'outInput', name: this.props.name });
                }
            }

            return outElement;
        }
    }, {
        key: 'renderSearchField',
        value: function renderSearchField() {
            var searchField = null;

            if (this.props.search) {
                var name = null;

                searchField = _react2.default.createElement('input', { name: name, ref: 'search', onFocus: this.bound.onFocus, onKeyPress: this.bound.onKeyPress, className: this.classes.search, type: 'search', value: this.state.search, onChange: this.bound.onChange, placeholder: this.props.placeholder });
            } else {
                var option = void 0;
                var labelValue = void 0;
                var labelClassName = void 0;

                if (!this.state.value) {
                    labelValue = this.props.placeholder;
                    labelClassName = this.classes.search + ' ' + _Bem2.default.m(this.classes.search, 'placeholder');
                } else {
                    option = this.findByValue(this.state.defaultOptions, this.state.value);
                    labelValue = option.name;
                    labelClassName = this.classes.search;
                }

                searchField = _react2.default.createElement(
                    'strong',
                    { onClick: this.bound.toggle, className: labelClassName },
                    labelValue
                );
            }

            return searchField;
        }
    }, {
        key: 'render',
        value: function render() {
            var className = this.state.focus ? this.classes.focus : this.classes.container;

            return _react2.default.createElement(
                'div',
                { className: className, ref: 'container' },
                this.renderOutElement(),
                this.renderSearchField(),
                this.renderOptions()
            );
        }
    }]);

    return Component;
}(_react2.default.Component);

Component.displayName = displayName;
Component.propTypes = propTypes;
Component.defaultProps = defaultProps;

// add clickOutside method to close dropdowns when opening another
Component = (0, _reactOnclickoutside2.default)(Component, {
    handleClickOutside: function handleClickOutside(instance) {
        return instance.bound.onClickOut;
    }
});

exports.default = Component;