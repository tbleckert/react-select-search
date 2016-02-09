'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _fuse = require('fuse.js');

var _fuse2 = _interopRequireDefault(_fuse);

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
    valueChanged: _react2.default.PropTypes.func.isRequired,
    optionSelected: _react2.default.PropTypes.func.isRequired,
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
    value: null,
    placeholder: null,
    multiple: false,
    height: 200,
    name: null,
    valueChanged: function valueChanged() {},
    optionSelected: function optionSelected() {},
    onMount: function onMount() {},
    onBlur: function onBlur() {},
    onFocus: function onFocus() {},
    renderOption: function renderOption(option) {
        return option.name;
    },
    fuse: {
        keys: ['name'],
        threshold: 0.3
    }
};

var Component = (function (_React$Component) {
    _inherits(Component, _React$Component);

    function Component(props) {
        _classCallCheck(this, Component);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Component).call(this, props));

        _this.hideTimer = null;
        _this.focus = false;
        _this.selected = null;
        _this.classes = {};
        _this.itemHeight = null;
        _this.selectHeight = null;

        _this.state = {
            search: null,
            value: !props.value && props.multiple ? [] : props.value,
            defaultOptions: props.options,
            options: props.options
        };

        _this.bind();
        return _this;
    }

    _createClass(Component, [{
        key: 'bind',
        value: function bind() {
            this.bound = {
                documentClick: this.documentClick.bind(this),
                onFocus: this.onFocus.bind(this),
                onBlur: this.onBlur.bind(this),
                onChange: this.onChange.bind(this),
                onKeyDown: this.onKeyDown.bind(this),
                onKeyPress: this.onKeyPress.bind(this)
            };
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.classes = {
                container: this.props.multiple ? this.props.className + ' ' + this.m('multiple', this.props.className) : this.props.className,
                search: this.e('search'),
                select: this.e('select'),
                options: this.e('options'),
                option: this.e('option'),
                out: this.e('out'),
                label: this.e('label'),
                focus: this.props.multiple ? this.props.className + ' ' + this.m('multiple focus', this.props.className) : this.props.className + ' ' + this.m('focus', this.props.className)
            };
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.props.onMount.call(this);

            if (!this.props.search) {
                document.addEventListener('click', this.bound.documentClick);
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            document.removeEventListener('click', this.bound.documentClick);
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            if (this.refs.hasOwnProperty('search') && this.state.value !== prevState.value) {
                this.refs.search.blur();
            }

            if (this.refs.hasOwnProperty('outInput') && this.state.value !== prevState.value) {
                var outElement = this.refs.outInput,
                    event;

                outElement.value = this.state.value;

                if ('createEvent' in document) {
                    event = document.createEvent('HTMLEvents');
                    event.initEvent('change', true, true);
                    outElement.dispatchEvent(event);
                } else {
                    outElement.fireEvent('onchange');
                }
            }
        }
    }, {
        key: 'documentClick',
        value: function documentClick(e) {
            if (e.target.className.indexOf(this.props.className) < 0) {
                this.onBlur();
            }
        }
    }, {
        key: 'filterOptions',
        value: function filterOptions(options, value) {
            if (options && options.length > 0 && value && value.length > 0) {
                var fuse = new _fuse2.default(options, this.props.fuse),
                    foundOptions = fuse.search(value);

                return foundOptions;
            }

            return options;
        }
    }, {
        key: 'e',
        value: function e(element, base) {
            base || (base = this.props.className);

            return base + '__' + element;
        }
    }, {
        key: 'm',
        value: function m(modifier, base) {
            modifier = modifier.split(' ');
            var finalClass = [];

            modifier.forEach(function (className) {
                finalClass.push(base + '--' + className);
            });

            return finalClass.join(' ');
        }
    }, {
        key: 'onChange',
        value: function onChange(e) {
            var value = e.target.value;
            var foundOptions = this.filterOptions(this.props.options, value);

            this.selected = null;

            this.setState({ options: foundOptions, search: value });
        }
    }, {
        key: 'onFocus',
        value: function onFocus() {
            var _this2 = this;

            clearTimeout(this.hideTimer);

            this.focus = true;
            this.setState({ search: null, options: this.props.options });
            this.refs.container.className = this.classes.focus;

            if (!this.props.multiple && this.refs.hasOwnProperty('select')) {
                (function () {
                    var element = _this2.refs.select;
                    var className = _this2.classes.select + ' ' + _this2.m('display', _this2.classes.select);

                    element.className = className + ' ' + _this2.m('prehide', _this2.classes.select);

                    setTimeout((function () {
                        var viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
                        var elementPos = element.getBoundingClientRect();
                        this.selectHeight = viewportHeight - elementPos.top - 20;

                        element.style.maxHeight = this.selectHeight + 'px';

                        if (!this.itemHeight) {
                            this.itemHeight = element.querySelector('.' + this.classes.option).offsetHeight;
                        }

                        element.className = className;
                        element.scrollTop = 0;
                    }).bind(_this2), 50);
                })();
            }

            this.props.onFocus.call(this);
        }
    }, {
        key: 'onBlur',
        value: function onBlur(e) {
            var _this3 = this;

            this.focus = false;
            this.selected = null;

            var option = this.findByValue(this.props.options, this.state.value);

            if (option) {
                this.setState({ search: option.name });
            }

            this.refs.container.className = this.classes.container;
            this.props.onBlur.call(this);

            if (!this.props.multiple && this.refs.hasOwnProperty('select')) {
                (function () {
                    var element = _this3.refs.select;
                    element.className = _this3.classes.select + ' ' + _this3.m('prehide', _this3.classes.select) + ' ' + _this3.m('display', _this3.classes.select);

                    _this3.hideTimer = setTimeout((function () {
                        element.className = this.classes.select;
                        this.setState({ options: [] });
                    }).bind(_this3), 200);
                })();
            }
        }
    }, {
        key: 'onKeyPress',
        value: function onKeyPress(e) {
            if (!this.state.options || this.state.options.length < 1) {
                return;
            }

            if (e.key === 'Enter') {
                e.preventDefault();

                var selectedOption = this.selected ? this.optionByIndex(this.selected) : this.optionByIndex(0);

                if (selectedOption) {
                    this.chooseOption(selectedOption.value);
                }
            }
        }
    }, {
        key: 'onKeyDown',
        value: function onKeyDown(e) {
            if (!this.state.options || this.state.options.length < 1) {
                return;
            }

            if (e.key === 'ArrowDown') {
                e.preventDefault();

                if (typeof this.selected === 'undefined' || this.selected === null) {
                    if (this.state.value) {
                        this.selectOption(1, true);
                    } else {
                        this.selectOption(0, true);
                    }
                } else {
                    this.selectOption(this.selected + 1, true);
                }
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();

                if (typeof this.selected === 'undefined' || this.selected === null) {
                    this.selectOption(this.state.options.length - 1);
                } else {
                    this.selectOption(this.selected - 1);
                }
            }

            this.scrollToSelected();
        }
    }, {
        key: 'scrollToSelected',
        value: function scrollToSelected() {
            var select = this.refs.select;
            select.scrollTop = this.itemHeight * this.selected;
        }
    }, {
        key: 'optionByIndex',
        value: function optionByIndex(index) {
            var options = this.refs.selectOptions;
            var option = options.querySelector('ul > li:nth-child(' + (index + 1) + ')');

            if (option) {
                var value = option.getAttribute('data-value');
                option = this.findByValue(this.props.options, value);

                return option;
            }

            return false;
        }
    }, {
        key: 'findByValue',
        value: function findByValue(source, value) {
            if ((!source || source.length < 1) && (!this.state.search || this.state.search.length < 1)) {
                source = this.props.options;
            }

            return source.filter(function (object) {
                return object.value === value;
            })[0];
        }
    }, {
        key: 'selectOption',
        value: function selectOption(value, down) {
            var selectedNodeName;

            var optionsParent = this.refs.selectOptions;
            var options = optionsParent.childNodes;
            var className = this.classes.option;
            var selectedClass = className + ' ' + className + '--' + 'hover';
            var totalOptions = options.length;
            var selected = null;

            for (var i = 0; i < totalOptions; i += 1) {
                var node = options[i];

                if (i === value) {
                    if (node.getAttribute('data-value') === this.state.value) {
                        node.className = className + ' ' + className + '--' + 'selected';
                    } else {
                        node.className = selectedClass;
                    }

                    selectedNodeName = node.textContent;
                    selected = i;
                } else {
                    if (node.getAttribute('data-value') === this.state.value) {
                        node.className = className + ' ' + className + '--' + 'selected';
                    } else {
                        node.className = className;
                    }
                }
            }

            if (!selectedNodeName) {
                selectedNodeName = this.state.search;
            }

            this.selected = selected;
            this.props.optionSelected(selected, this.state, this.props);
        }
    }, {
        key: 'chooseOption',
        value: function chooseOption(value) {
            var currentValue = this.state.value;
            var option = undefined;
            var search = undefined;

            if (!value) {
                option = this.state.options[0];
            } else {
                option = this.findByValue(this.props.options, value);
            }

            if (this.props.multiple) {
                if (!currentValue) {
                    currentValue = [];
                }

                currentValue.push(option.value);

                search = null;
            } else {
                currentValue = option.value;
                search = option.name;
            }

            this.setState({ value: currentValue, search: search, options: this.props.options });
            this.props.valueChanged.call(this, option, this.state, this.props);

            if (!this.props.search) {
                this.onBlur();
            }
        }
    }, {
        key: 'removeOption',
        value: function removeOption(value) {
            if (!value) {
                return false;
            }

            var option = this.findByValue(this.props.options, value);
            value = this.state.value;

            if (!option || value.indexOf(option.value) < 0) {
                return false;
            }

            value.splice(value.indexOf(option.value), 1);

            this.props.valueChanged(null, this.state, this.props);
            this.setState({ value: value, search: null });
        }
    }, {
        key: 'renderOptions',
        value: function renderOptions() {
            var select = null;
            var option = null;
            var options = [];
            var selectStyle = {};
            var foundOptions = this.state.options;

            if (foundOptions && foundOptions.length > 0) {
                if (this.state.value && !this.props.multiple) {
                    option = this.findByValue(this.props.options, this.state.value);

                    if (option) {
                        options.push(_react2.default.createElement('li', { className: this.classes.option + ' ' + this.m('selected', this.classes.option), onClick: this.chooseOption.bind(this, option.value), key: option.value + '-option', 'data-value': option.value, dangerouslySetInnerHTML: { __html: this.props.renderOption(option) } }));
                    }
                }

                foundOptions.forEach((function (element) {
                    if (this.props.multiple) {
                        if (this.state.value.indexOf(element.value) < 0) {
                            options.push(_react2.default.createElement('li', { className: this.classes.option, onClick: this.chooseOption.bind(this, element.value), key: element.value + '-option', 'data-value': element.value, dangerouslySetInnerHTML: { __html: this.props.renderOption(element) } }));
                        } else {
                            options.push(_react2.default.createElement('li', { className: this.classes.option + ' ' + this.m('selected', this.classes.option), onClick: this.removeOption.bind(this, element.value), key: element.value + '-option', 'data-value': element.value, dangerouslySetInnerHTML: { __html: this.props.renderOption(element) } }));
                        }
                    } else {
                        if (element.value !== this.state.value) {
                            options.push(_react2.default.createElement('li', { className: this.classes.option, onClick: this.chooseOption.bind(this, element.value), key: element.value + '-option', 'data-value': element.value, dangerouslySetInnerHTML: { __html: this.props.renderOption(element) } }));
                        }
                    }
                }).bind(this));

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

            return _react2.default.createElement(
                'div',
                { ref: 'select', className: this.classes.select, style: selectStyle },
                select
            );
        }
    }, {
        key: 'renderOutElement',
        value: function renderOutElement() {
            var _this4 = this;

            var option = null;
            var finalValue = undefined;

            if (this.props.multiple) {
                if (this.state.value) {
                    (function () {
                        var finalValueOptions = [];

                        _this4.state.value.forEach((function (value, i) {
                            option = this.findByValue(this.props.options, value);
                            finalValueOptions.push(_react2.default.createElement(
                                'option',
                                { key: i, value: option.value },
                                option.name
                            ));
                        }).bind(_this4));

                        finalValue = _react2.default.createElement(
                            'select',
                            { value: _this4.state.value, className: _this4.classes.out, name: _this4.props.name, readOnly: true, multiple: true },
                            finalValueOptions
                        );
                    })();
                } else {
                    finalValue = _react2.default.createElement(
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
                finalValue = _react2.default.createElement('input', { type: 'hidden', defaultValue: this.props.value, ref: 'outInput', name: this.props.name });
            }

            return finalValue;
        }
    }, {
        key: 'renderSearchField',
        value: function renderSearchField() {
            var option = undefined;
            var searchValue = undefined;
            var searchField = undefined;
            var labelValue = undefined;
            var labelClassName = undefined;

            if (this.props.search) {
                if (this.focus) {
                    searchValue = null;
                } else {
                    if (this.state.value && !this.state.search) {
                        option = this.findByValue(this.props.options, this.state.value);
                        searchValue = option ? option.name : this.state.search;
                    } else {
                        searchValue = this.state.search;
                    }
                }

                searchField = _react2.default.createElement('input', { ref: 'search', onFocus: this.bound.onFocus, onKeyDown: this.bound.onKeyDown, onKeyPress: this.bound.onKeyPress, onBlur: this.bound.onBlur, className: this.classes.search, type: 'search', value: searchValue, onChange: this.bound.onChange, placeholder: this.props.placeholder });
            } else {
                if (!this.state.value) {
                    labelValue = this.props.placeholder;
                    labelClassName = this.classes.search + ' ' + this.m('placeholder', this.classes.search);
                } else {
                    option = this.findByValue(this.props.options, this.state.value);
                    labelValue = option.name;
                    labelClassName = this.classes.search;
                }

                searchField = _react2.default.createElement(
                    'strong',
                    { onClick: this.bound.onFocus, className: labelClassName },
                    labelValue
                );
            }

            return searchField;
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: this.classes.container, ref: 'container' },
                this.renderOutElement(),
                this.renderSearchField(),
                this.renderOptions()
            );
        }
    }]);

    return Component;
})(_react2.default.Component);

;

Component.displayName = displayName;
Component.propTypes = propTypes;
Component.defaultProps = defaultProps;

exports.default = Component;