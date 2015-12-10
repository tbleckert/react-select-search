'use strict';

import React from 'react';
import Fuse from 'fuse.js';

const displayName  = 'SelectSearch';
const propTypes    = {
    options:        React.PropTypes.array.isRequired,
    className:      React.PropTypes.string.isRequired,
    search:         React.PropTypes.bool.isRequired,
    value:          React.PropTypes.string,
    placeholder:    React.PropTypes.string,
    multiple:       React.PropTypes.bool.isRequired,
    height:         React.PropTypes.number,
    name:           React.PropTypes.string,
    fuse:           React.PropTypes.object.isRequired,
    valueChanged:   React.PropTypes.func.isRequired,
    optionSelected: React.PropTypes.func.isRequired,
    onMount:        React.PropTypes.func.isRequired,
    onBlur:         React.PropTypes.func.isRequired,
    onFocus:        React.PropTypes.func.isRequired,
    renderOption:   React.PropTypes.func.isRequired
};

const defaultProps = {
    options:        [],
    className:      'select-search-box',
    search:         true,
    value:          null,
    placeholder:    null,
    multiple:       false,
    height:         200,
    name:           null,
    fuse: {
        keys:           ['name'],
        threshold:      0.3
    },
    valueChanged:   function () {},
    optionSelected: function () {},
    onMount:        function () {},
    onBlur:         function () {},
    onFocus:        function () {},
    renderOption:   function (option) {
        return option.name;
    }
};

class Component extends React.Component {

    constructor(props) {
        super(props);

        this.hideTimer    = null;
        this.focus        = false;
        this.selected     = null;
        this.classes      = {};
        this.itemHeight   = null;
        this.selectHeight = null;

        this.state = {
            search:  null,
            value:   (!props.value && props.multiple) ? [] : props.value,
            options: props.options
        };

        this.bind();
    }

    bind() {
        this.bound = {
            documentClick: this.documentClick.bind(this),
            onFocus:       this.onFocus.bind(this),
            onBlur:        this.onBlur.bind(this),
            onChange:      this.onChange.bind(this),
            onKeyDown:     this.onKeyDown.bind(this),
            onKeyPress:    this.onKeyPress.bind(this) 
        };
    }

    componentWillMount() {
        this.classes = {
            container: (this.props.multiple) ? this.props.className + ' ' + this.m('multiple', this.props.className) : this.props.className,
            search:    this.e('search'),
            select:    this.e('select'),
            options:   this.e('options'),
            option:    this.e('option'),
            out:       this.e('out'),
            label:     this.e('label'),
            focus:     (this.props.multiple) ? this.props.className + ' ' + this.m('multiple focus', this.props.className) : this.props.className + ' ' + this.m('focus', this.props.className)
        };
    }

    componentDidMount() {
        this.props.onMount.call(this);

        if (!this.props.search) {
            document.addEventListener('click', this.bound.documentClick);
        }
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.bound.documentClick);
    }

    componentDidUpdate(prevProps, prevState) {
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

    documentClick(e) {
        if (e.target.className.indexOf(this.props.className) < 0) {
            this.onBlur();
        }
    }

    filterOptions(options, value) {
        if (options && options.length > 0 && value && value.length > 0) {
            var fuse         = new Fuse(options, this.props.fuse),
                foundOptions = fuse.search(value);

            return foundOptions;
        }

        return options;
    }

    e(element, base) {
        base || (base = this.props.className);

        return base + '__' + element;
    }

    m(modifier, base) {
        modifier = modifier.split(' ');
        var finalClass = [];

        modifier.forEach(function (className) {
            finalClass.push(base + '--' + className);
        });

        return finalClass.join(' ');
    }

    onChange(e) {
        var value = e.target.value, foundOptions = this.filterOptions(this.props.options, value);

        this.selected = null;

        this.setState({options: foundOptions, search: value});
    }

    onFocus() {
        var className, element, viewportHeight, elementPos;

        clearTimeout(this.hideTimer);

        this.focus = true;
        this.setState({search: null, options: this.props.options});
        this.refs.container.className = this.classes.focus;

        if (!this.props.multiple && this.refs.hasOwnProperty('select')) {
            element   = this.refs.select;
            className = this.classes.select + ' ' + this.m('display', this.classes.select);

            element.className = className + ' ' + this.m('prehide', this.classes.select);

            setTimeout(function () {
                viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
                elementPos     = element.getBoundingClientRect();
                this.selectHeight  = viewportHeight - elementPos.top - 20;

                element.style.maxHeight = this.selectHeight + 'px';

                if (!this.itemHeight) {
                    this.itemHeight = element.querySelector('.' + this.classes.option).offsetHeight;
                }

                element.className = className;
                element.scrollTop = 0;
            }.bind(this), 50);
        }

        this.props.onFocus.call(this);
    }

    onBlur(e) {
        var element, option;

        this.focus = false;
        this.selected = null;

        option = this.findByValue(this.props.options, this.state.value);

        if (option) {
            this.setState({search: option.name});
        }

        this.refs.container.className = this.classes.container;
        this.props.onBlur.call(this);

        if (!this.props.multiple && this.refs.hasOwnProperty('select')) {
            element = this.refs.select;
            element.className = this.classes.select + ' ' + this.m('prehide', this.classes.select) + ' ' + this.m('display', this.classes.select);

            this.hideTimer = setTimeout(function () {
                element.className = this.classes.select;
                this.setState({options: []});
            }.bind(this), 200);
        }
    }

    onKeyPress(e) {
        if (!this.state.options || this.state.options.length < 1) {
            return;
        }

        if (e.key === 'Enter') {
            e.preventDefault();

            var selectedOption = (this.selected) ? this.optionByIndex(this.selected) : this.optionByIndex(0);

            if (selectedOption) {
                this.chooseOption(selectedOption.value);
            }
        }
    }

    onKeyDown(e) {
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

    scrollToSelected() {
        var select = this.refs.select;
        select.scrollTop = this.itemHeight * this.selected;
    }

    optionByIndex(index) {
        var options = this.refs.selectOptions,
            option  = options.querySelector('ul > li:nth-child(' + (index + 1) + ')'),
            value;

        if (option) {
            value  = option.getAttribute('data-value');
            option = this.findByValue(this.props.options, value);

            return option;
        }

        return false;
    }

    findByValue(source, value) {
        if ((!source || source.length < 1) && (!this.state.search || this.state.search.length < 1)) {
            source = this.props.options;
        }

        return source.filter(function (object) {
            return object.value === value;
        })[0];
    }

    selectOption(value, down) {
        var optionsParent = this.refs.selectOptions,
            options       = optionsParent.childNodes,
            className     = this.classes.option,
            selectedClass = className + ' ' + className + '--' + 'hover',
            totalOptions  = options.length,
            selected      = null,
            selectedNodeName,
            i,
            node;

        for (i = 0; i < totalOptions; i += 1) {
            node = options[i];

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

    chooseOption(value) {
        var currentValue = this.state.value,
            search,
            option;

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

        this.setState({value: currentValue, search: search, options: this.props.options});
        this.props.valueChanged.call(this, option, this.state, this.props);

        if (!this.props.search) {
            this.onBlur();
        }
    }

    removeOption(value) {
        if (!value) {
            return false;
        }

        var option = this.findByValue(this.props.options, value),
            value  = this.state.value;

        if (!option || value.indexOf(option.value) < 0) {
            return false;
        }

        value.splice(value.indexOf(option.value), 1);

        this.props.valueChanged(null, this.state, this.props);
        this.setState({value: value, search: null});
    }

    renderOptions() {
        var foundOptions,
            select = null,
            option = null,
            options = [],
            selectStyle = {};

        foundOptions = this.state.options;

        if (foundOptions && foundOptions.length > 0) {
            if (this.state.value && !this.props.multiple) {
                option = this.findByValue(this.props.options, this.state.value);

                if (option) {
                    options.push(<li className={this.classes.option + ' ' + this.m('selected', this.classes.option)} onClick={this.chooseOption.bind(this, option.value)} key={option.value + '-option'} data-value={option.value} dangerouslySetInnerHTML={{__html: this.props.renderOption(option)}} />);
                }
            }

            foundOptions.forEach(function (element) {
                if (this.props.multiple) {
                    if (this.state.value.indexOf(element.value) < 0) {
                        options.push(<li className={this.classes.option} onClick={this.chooseOption.bind(this, element.value)} key={element.value + '-option'} data-value={element.value} dangerouslySetInnerHTML={{__html: this.props.renderOption(element)}} />);
                    } else {
                        options.push(<li className={this.classes.option + ' ' + this.m('selected', this.classes.option)} onClick={this.removeOption.bind(this, element.value)} key={element.value + '-option'} data-value={element.value} dangerouslySetInnerHTML={{__html: this.props.renderOption(element)}} />);
                    }
                } else {
                    if (element.value !== this.state.value) {
                        options.push(<li className={this.classes.option} onClick={this.chooseOption.bind(this, element.value)} key={element.value + '-option'} data-value={element.value} dangerouslySetInnerHTML={{__html: this.props.renderOption(element)}} />);
                    }
                }
            }.bind(this));

            if (options.length > 0) {
                select = (
                    <ul ref="selectOptions" className={this.classes.options}>
                        {options}
                    </ul>
                );
            }
        }

        if (this.props.multiple) {
            selectStyle.height = this.props.height;
        }

        return (
            <div ref="select" className={this.classes.select} style={selectStyle}>
                {select}
            </div>
        );
    }

    renderOutElement() {
        var option = null,
            finalValue,
            finalValueOptions;

        if (this.props.multiple) {
            if (this.state.value) {
                finalValueOptions = [];

                this.state.value.forEach(function (value, i) {
                    option = this.findByValue(this.props.options, value);
                    finalValueOptions.push(<option key={i} value={option.value}>{option.name}</option>);
                }.bind(this));

                finalValue = (
                    <select defaultValue={this.state.value} className={this.classes.out} name={this.props.name} multiple>
                        {finalValueOptions}
                    </select>
                );
            } else {
                finalValue = (
                    <select className={this.classes.out} name={this.props.name} multiple>
                        <option>Nothing selected</option>
                    </select>
                );
            }
        } else {
            finalValue = <input type="hidden" defaultValue={this.props.value} ref="outInput" name={this.props.name} />;
        }

        return finalValue;
    }

    renderSearchField() {
        var option,
            searchValue,
            searchField,
            labelValue,
            labelClassName;

        if (this.props.search) {
            if (this.focus) {
                searchValue = null;
            } else {
                if (this.state.value && !this.state.search) {
                    option      = this.findByValue(this.props.options, this.state.value);
                    searchValue = (option) ? option.name : this.state.search;
                } else {
                    searchValue = this.state.search;
                }
            }

            searchField = <input ref="search" onFocus={this.bound.onFocus} onKeyDown={this.bound.onKeyDown} onKeyPress={this.bound.onKeyPress} onBlur={this.bound.onBlur} className={this.classes.search} type="search" value={searchValue} onChange={this.bound.onChange} placeholder={this.props.placeholder} />;
        } else {
            if (!this.state.value) {
                labelValue     = this.props.placeholder;
                labelClassName = this.classes.search + ' ' + this.m('placeholder', this.classes.search);
            } else {
                option         = this.findByValue(this.props.options, this.state.value);
                labelValue     = option.name;
                labelClassName = this.classes.search;
            }

            searchField = <strong onClick={this.bound.onFocus} className={labelClassName}>{labelValue}</strong>;
        }

        return searchField;
    }

    render() {
        return (
            <div className={this.classes.container} ref="container">
                {this.renderOutElement()}
                {this.renderSearchField()}
                {this.renderOptions()}
            </div>
        );
    }
};

Component.displayName  = displayName;
Component.propTypes    = propTypes;
Component.defaultProps = defaultProps;

export default Component;