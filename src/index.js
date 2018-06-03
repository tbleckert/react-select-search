import React from 'react';
import PropTypes from 'prop-types';
import Fuse from 'fuse.js';
import onClickOutside from 'react-onclickoutside';
import Bem from './Bem';
import FlattenOptions from './FlattenOptions';
import GroupOptions from './GroupOptions';

class SelectSearch extends React.Component {
    static defaultProps = {
        className: 'select-search-box',
        search: true,
        value: '',
        placeholder: null,
        multiple: false,
        height: 200,
        name: null,
        autofocus: false,
        onHighlight: () => {},
        onMount: () => {},
        onBlur: () => {},
        onFocus: () => {},
        onChange: () => {},
        renderOption: option => option.name,
        renderGroupHeader: title => title,
        renderValue: label => label,
        fuse: {
            keys: ['name', 'groupName'],
            threshold: 0.3,
        },
    };

    /**
     * Component setup
     * -------------------------------------------------------------------------*/
    constructor(props) {
        super(props);

        const { options, value, multiple } = props;
        const stateValue = (!value && multiple) ? [] : value;
        const flattenedOptions = FlattenOptions(options);

        let search = '';

        if (stateValue) {
            const option = this.findByValue(flattenedOptions, stateValue);

            if (option) {
                search = option.name;
            }
        }

        this.state = {
            search,
            value: stateValue,
            defaultOptions: flattenedOptions,
            options: flattenedOptions,
            highlighted: null,
            focus: false,
        };

        this.classes = {
            container: (this.props.multiple) ? `${this.props.className} ${Bem.m(this.props.className, 'multiple')}` : this.props.className,
            search: Bem.e(this.props.className, 'search'),
            select: Bem.e(this.props.className, 'select'),
            options: Bem.e(this.props.className, 'options'),
            option: Bem.e(this.props.className, 'option'),
            row: Bem.e(this.props.className, 'row'),
            group: Bem.e(this.props.className, 'group'),
            groupHeader: Bem.e(this.props.className, 'group-header'),
            out: Bem.e(this.props.className, 'out'),
            label: Bem.e(this.props.className, 'label'),
            focus: (this.props.multiple) ? `${this.props.className} ${Bem.m(this.props.className, 'multiple focus')}` : `${this.props.className} ${Bem.m(this.props.className, 'focus')}`,
        };

        this.classes.focus += ` ${Bem.m(this.props.className, 'select')}`;
        this.classes.container += ` ${Bem.m(this.props.className, 'select')}`;

        this.container = React.createRef();
        this.selectOptions = React.createRef();
        this.select = React.createRef();
        this.search = React.createRef();
        this.outInput = React.createRef();
    }

    /**
     * Component lifecycle
     * -------------------------------------------------------------------------*/
    componentDidMount() {
        this.props.onMount.call(null, this.publishOption(), this.state, this.props);
        this.scrollToSelected();

        if (this.search.current && this.props.autofocus === true) {
            this.search.current.focus();
        }
    }

    componentWillReceiveProps(nextProps) {
        const nextState = {};

        if (nextProps.options !== this.state.defaultOptions) {
            const flattenedOptions = FlattenOptions(nextProps.options);

            nextState.options = flattenedOptions;
            nextState.defaultOptions = flattenedOptions;
        }

        if (nextProps.value !== this.state.value) {
            nextState.value = nextProps.value;
        }

        this.setState(nextState);
    }

    componentDidUpdate(prevProps, prevState) {
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
            this.props.onHighlight.call(
                null,
                this.state.options[this.state.highlighted],
                this.state,
                this.props,
            );
        }

        this.scrollToSelected();
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.onKeyDown);
        document.removeEventListener('keypress', this.onKeyPress);
        document.removeEventListener('keyup', this.onKeyUp);
    }

    /**
     * DOM event handlers
     * -------------------------------------------------------------------------*/
    handleClickOutside = () => {
        this.onBlur();
    }

    onBlur = () => {
        if (this.props.search && !this.props.multiple) {
            this.search.current.blur();
        }

        let search = '';

        if (this.state.value && this.props.search && !this.props.multiple) {
            const option = this.findByValue(null, this.state.value);
            search = option.name;
        }

        this.setState({ focus: false, highlighted: null, search });
    }

    onFocus = () => {
        this.setState({ focus: true, options: this.state.defaultOptions, search: '' });
    }

    onChange = (e) => {
        let { value } = e.target;

        if (!value) {
            value = '';
        }

        let options = this.state.defaultOptions;
        options = this.getNewOptionsList(options, value);

        this.setState({ search: value, options });
    }

    onKeyPress = (e) => {
        if (!this.state.options || this.state.options.length < 1) {
            return;
        }

        /** Enter */
        if (e.keyCode === 13) {
            this.handleEnter();
        }
    }

    onKeyDown = (e) => {
        if (!this.state.focus) {
            return;
        }

        /** Tab */
        if (e.keyCode === 9) {
            this.onBlur();
            return;
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

    onKeyUp = (e) => {
        /** Esc */
        if (e.keyCode === 27) {
            this.handleEsc();
        }
    }

    /**
     * Keyboard actions
     * -------------------------------------------------------------------------*/
    handleArrowDown() {
        if (this.state.options.length < 1) {
            return;
        }

        let highlighted = null;

        if (this.state.highlighted != null) {
            highlighted = this.state.highlighted + 1;
        } else {
            highlighted = 0;
        }

        if (highlighted > this.state.options.length - 1) {
            highlighted = 0;
        }

        this.setState({ highlighted });
    }

    handleArrowUp() {
        if (this.state.options.length < 1) {
            return;
        }

        let highlighted = this.state.options.length - 1;

        if (this.state.highlighted != null) {
            highlighted = this.state.highlighted - 1;
        }

        if (highlighted < 0) {
            highlighted = this.state.options.length - 1;
        }

        this.setState({ highlighted });
    }

    handleEnter() {
        this.chooseOption();
    }

    handleEsc() {
        this.onBlur();
    }

    /**
     * Custom methods
     * -------------------------------------------------------------------------*/
    publishOption(value) {
        let publishValue = value;

        if (typeof (value) === 'undefined') {
            publishValue = this.state.value;
        }

        if (this.props.multiple) {
            return this.publishOptionMultiple(publishValue);
        }

        return this.publishOptionSingle(publishValue);
    }

    publishOptionSingle(value) {
        return this.findByValue(null, value);
    }

    publishOptionMultiple(value) {
        return value.map(publishValue => this.findByValue(null, publishValue));
    }

    handleFocus() {
        document.addEventListener('keydown', this.onKeyDown);
        document.addEventListener('keypress', this.onKeyPress);
        document.addEventListener('keyup', this.onKeyUp);

        if (this.state.options.length > 0 && !this.props.multiple) {
            const element = this.select.current;
            const { clientHeight } = document.documentElement;
            const viewportHeight = Math.max(clientHeight, window.innerHeight || 0);
            const elementPos = element.getBoundingClientRect();
            const selectHeight = viewportHeight - elementPos.top - 20;

            element.style.maxHeight = `${selectHeight}px`;

            this.scrollToSelected(true, 'selected');
        }
    }

    handleBlur() {
        document.removeEventListener('keydown', this.onKeyDown);
        document.removeEventListener('keypress', this.onKeyPress);
        document.removeEventListener('keyup', this.onKeyUp);
    }

    findIndexByOption(searchOption, options) {
        let searchOptions = options;

        if (!options) {
            searchOptions = this.state.options;
        }

        if (searchOptions.length < 1) {
            return -1;
        }

        let index = -1;

        searchOptions.some((option, i) => {
            if (option.value === searchOption.value) {
                index = i;
                return true;
            }

            return false;
        });

        return index;
    }

    findByValue(source, value) {
        let findSource = source;

        if (!source || source.length < 1) {
            findSource = this.state.defaultOptions;
        }

        if (!findSource) {
            return null;
        }

        return findSource.filter(object => object.value === value)[0];
    }

    toggle = () => {
        if (this.state.focus) {
            this.onBlur();
        } else {
            this.onFocus();
        }
    }

    chooseOption(value) {
        let currentValue = this.state.value;
        let option;
        let search;

        if (!value) {
            let index = this.state.highlighted;

            if (!index || (this.state.options.length - 1) < index) {
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

        const options = this.state.defaultOptions;
        const highlighted = (this.props.multiple) ? this.state.highlighted : null;

        this.setState({
            value: currentValue,
            search,
            options,
            highlighted,
            focus: this.props.multiple,
        });

        setTimeout(() => {
            const publishOption = this.publishOption(currentValue);
            this.props.onChange.call(null, publishOption, this.state, this.props);
        }, 50);

        if (this.props.search && !this.props.multiple) {
            this.search.current.blur();
        }
    }

    removeOption(value) {
        if (!value) {
            return false;
        }

        const option = this.findByValue(this.state.defaultOptions, value);
        const optionValue = this.state.value;

        if (!option || optionValue.indexOf(option.value) < 0) {
            return false;
        }

        optionValue.splice(optionValue.indexOf(option.value), 1);

        this.setState({ value: optionValue, search: '' });

        setTimeout(() => {
            this.props.onChange.call(null, this.publishOption(optionValue), this.state, this.props);
        }, 50);

        return true;
    }

    getNewOptionsList(options, value) {
        if (options && options.length > 0 && value && value.length > 0) {
            const fuse = new Fuse(options, this.props.fuse);

            return fuse.search(value);
        }

        return options;
    }

    scrollToSelected(force = false, selected = 'hover') {
        if (
            !force && (
                this.props.multiple ||
                this.state.highlighted == null ||
                !this.select.current ||
                !this.selectOptions.current ||
                !this.state.focus ||
                this.state.options.length < 1
            )
        ) {
            return;
        }

        const selectedItem = this.selectOptions.current.querySelector(`.${Bem.m(this.classes.option, selected)}`);

        if (selectedItem) {
            this.select.current.scrollTop = selectedItem.offsetTop;
        }
    }

    /**
     * Component render
     * -------------------------------------------------------------------------*/
    renderOption(option, stateValue, multiple) {
        const elementVal = option.value;

        let element = null;
        let className = this.classes.option;

        className += ` ${this.classes.row}`;

        if (this.state.highlighted === option.index) {
            className += ` ${Bem.m(this.classes.option, 'hover')}`;
        }

        if (
            (multiple && stateValue.indexOf(elementVal) >= 0) ||
            elementVal === stateValue
        ) {
            className += ` ${Bem.m(this.classes.option, 'selected')}`;
        }

        if (this.props.multiple) {
            if (this.state.value.indexOf(option.value) < 0) {
                element = <li role="menuitem" className={className} onClick={() => this.chooseOption(option.value)} key={`${option.value}-option`} data-value={option.value}>{this.props.renderOption(option, this.state, this.props)}</li>;
            } else {
                element = <li role="menuitem" className={className} onClick={() => this.removeOption(option.value)} key={`${option.value}-option`} data-value={option.value}>{this.props.renderOption(option, this.state, this.props)}</li>;
            }
        } else if (option.value === this.state.value) {
            element = <li role="menuitem" className={className} key={`${option.value}-option`} data-value={option.value}>{this.props.renderOption(option)}</li>;
        } else {
            element = <li role="menuitem" className={className} onClick={() => this.chooseOption(option.value)} key={`${option.value}-option`} data-value={option.value}>{this.props.renderOption(option, this.state, this.props)}</li>;
        }

        return element;
    }

    renderOptions() {
        let select = null;
        const selectStyle = {};
        const options = [];
        const { multiple } = this.props;
        const { value: stateValue, options: foundOptions } = this.state;

        if (foundOptions && foundOptions.length > 0) {
            const groupedOptions = GroupOptions(foundOptions);

            if (groupedOptions && groupedOptions.length) {
                groupedOptions.forEach((option) => {
                    if ({}.hasOwnProperty.call(option, 'type') && option.type === 'group') {
                        const subOptions = [];

                        option.items.forEach((groupOption) => {
                            subOptions.push(this.renderOption(groupOption, stateValue, multiple));
                        });

                        options.push((
                            <li className={this.classes.row} key={option.groupId}>
                                <div className={this.classes.group}>
                                    <div className={this.classes.groupHeader}>{this.props.renderGroupHeader(option.name)}</div>
                                    <ul className={this.classes.options}>
                                        {subOptions}
                                    </ul>
                                </div>
                            </li>
                        ));
                    } else {
                        options.push(this.renderOption(option, stateValue, multiple));
                    }
                });

                if (options.length > 0) {
                    select = (
                        <ul ref={this.selectOptions} className={this.classes.options}>
                            {options}
                        </ul>
                    );
                }
            }
        }

        if (this.props.multiple) {
            selectStyle.height = this.props.height;
        }

        let className = this.classes.select;

        if (this.state.focus) {
            className += ` ${Bem.m(this.classes.select, 'display')}`;
        }

        return (
            <div ref={this.select} className={className} style={selectStyle}>
                {select}
            </div>
        );
    }

    renderOutElement() {
        let option = null;
        let outElement;

        if (this.props.multiple) {
            if (this.state.value) {
                const finalValueOptions = [];

                this.state.value.forEach((value) => {
                    option = this.findByValue(this.state.defaultOptions, value);
                    finalValueOptions.push((
                        <option key={option.value} value={option.value}>{option.name}</option>
                    ));
                });

                outElement = (
                    <select
                        value={this.state.value}
                        className={this.classes.out}
                        name={this.props.name}
                        readOnly
                        multiple
                    >
                        {finalValueOptions}
                    </select>
                );
            } else {
                outElement = (
                    <select className={this.classes.out} name={this.props.name} readOnly multiple>
                        <option>Nothing selected</option>
                    </select>
                );
            }
        } else if (this.props.search) {
            outElement = <input type="hidden" defaultValue={this.state.value} ref={this.outInput} name={this.props.name} />;
        } else {
            const outStyle = {
                opacity: 0,
                position: 'absolute',
                top: '-9999px',
                left: '-9999px',
            };

            outElement = <input type="text" onFocus={this.onFocus} style={outStyle} value={this.state.value} readOnly ref={this.outInput} name={this.props.name} />;
        }

        return outElement;
    }

    renderSearchField() {
        let searchField = null;

        if (this.props.search) {
            const name = null;

            searchField = <input name={name} ref={this.search} onFocus={this.onFocus} onKeyPress={this.onKeyPress} className={this.classes.search} type="search" value={this.state.search} onChange={this.onChange} placeholder={this.props.placeholder} />;
        } else {
            let option;
            let labelValue;
            let labelClassName;

            if (!this.state.value) {
                labelValue = this.props.placeholder;
                labelClassName = `${this.classes.search} ${Bem.m(this.classes.search, 'placeholder')}`;
            } else {
                option = this.findByValue(this.state.defaultOptions, this.state.value);

                if (!option) {
                    option = this.state.defaultOptions[0];
                }

                labelValue = option.name;
                labelClassName = this.classes.search;
            }

            searchField = (
                <div tabIndex={0} role="button" onClick={this.toggle} className={labelClassName}>
                    {this.props.renderValue(labelValue, option, this.state, this.props)}
                </div>
            );
        }

        return searchField;
    }

    render() {
        const className = (this.state.focus) ? this.classes.focus : this.classes.container;

        return (
            <div className={className} ref={this.container}>
                {this.renderOutElement()}
                {this.renderSearchField()}
                {this.renderOptions()}
            </div>
        );
    }
}

SelectSearch.propTypes = {
    options: PropTypes.array.isRequired,
    className: PropTypes.string,
    search: PropTypes.bool,
    placeholder: PropTypes.string,
    multiple: PropTypes.bool,
    height: PropTypes.number,
    name: PropTypes.string,
    autofocus: PropTypes.bool,
    fuse: PropTypes.object,
    onChange: PropTypes.func,
    onHighlight: PropTypes.func,
    onMount: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    renderOption: PropTypes.func,
    renderValue: PropTypes.func,
    renderGroupHeader: PropTypes.func,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array,
    ]),
};

export default onClickOutside(SelectSearch);
