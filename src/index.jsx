import React from 'react';
import PropTypes from 'prop-types';
import Fuse from 'fuse.js';
import onClickOutside from 'react-onclickoutside';
import FlattenOptions from './lib/FlattenOptions';
import GroupOptions from './lib/GroupOptions';
import createClasses from './lib/createClasses';
import Value from './Components/Value';
import Options from './Components/Options';
import Context from './Context';

class SelectSearch extends React.PureComponent {
    static defaultProps = {
        search: false,
        value: '',
        multiple: false,
        placeholder: '',
        maxOptions: null,
        fuse: {
            keys: ['name', 'groupName'],
            threshold: 0.3,
        },
        className: 'select-search-box',
        autoComplete: 'on',
        autofocus: false,
        renderOption: option => option.name,
        renderGroupHeader: title => title,
        renderValue: null,
    };

    constructor(props) {
        super(props);

        const {
            options,
            value,
            multiple,
            className,
            renderOption,
            renderValue,
            renderGroupHeader,
        } = props;

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

        this.theme = {
            classes: (typeof className === 'string') ? createClasses(className) : className,
            renderers: {
                option: renderOption,
                value: renderValue,
                groupHeader: renderGroupHeader,
            },
        };

        this.parentRef = React.createRef();
        this.valueRef = React.createRef();
    }

    componentDidMount() {
        const { autofocus, search } = this.props;

        if (autofocus && search && this.valueRef.current) {
            this.valueRef.current.focus();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { focus, highlighted } = this.state;
        const { prevFocus, prevHighlighted } = prevState;

        if (prevFocus !== focus) {
            if (focus) {
                this.handleFocus();
            } else {
                this.handleBlur();
            }
        }

        if (highlighted !== null && highlighted !== prevHighlighted) {
            this.scrollToHighlighted();
        }
    }

    onBlur = () => {
        const { multiple } = this.props;
        const { value } = this.state;
        let search = '';

        if (value && !multiple) {
            const option = this.findByValue(null, value);

            if (option) {
                search = option.name;
            }
        }

        this.setState({ focus: false, highlighted: null, search });
    };

    onFocus = () => {
        this.setState({ focus: true, options: this.state.defaultOptions, search: '' });
    };

    onChange = (value) => {
        let currentValue = this.state.value.slice();
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

            const currentIndex = currentValue.indexOf(option.value);

            if (currentIndex > -1) {
                currentValue.splice(currentIndex, 1);
            } else {
                currentValue.push(option.value);
            }

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
    };

    onSearch = (e) => {
        let { value } = e.target;

        if (!value) {
            value = '';
        }

        let options = this.state.defaultOptions;
        options = this.getNewOptionsList(options, value);

        this.setState({ search: value, options });
    };

    onKeyPress = (e) => {
        if (!this.state.options || this.state.options.length < 1) {
            return;
        }

        /** Enter */
        if (e.keyCode === 13) {
            this.handleEnter();
        }
    };

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
    };

    onKeyUp = (e) => {
        /** Esc */
        if (e.keyCode === 27) {
            this.handleEsc();
        }
    };

    getNewOptionsList(options, value) {
        const { maxOptions } = this.props;
        let newOptions = options;

        if (options && options.length > 0 && value && value.length > 0) {
            const fuse = new Fuse(options, this.props.fuse);

            newOptions = fuse
                .search(value)
                .map((item, index) => Object.assign({}, item, { index }));
        }

        if (maxOptions) {
            newOptions = newOptions.slice(0, maxOptions);
        }

        return newOptions;
    }

    getOptionsForRender() {
        const { multiple } = this.props;
        const { options, ...state } = this.state;

        return GroupOptions(options.map((option, i) => {
            const selected = (
                (multiple && state.value.indexOf(option.value) >= 0)
                || option.value === state.value
            );

            const highlighted = i === state.highlighted;

            return {
                ...option,
                selected,
                highlighted,
                onChange: () => this.onChange(option.value),
                optionProps: {
                    onClick: () => this.onChange(option.value),
                    role: 'menuitem',
                    'data-selected': (selected) ? 'true' : null,
                    'data-highlighted': (highlighted) ? 'true' : null,
                },
                key: `${option.value}-option`,
            };
        }));
    }

    getValueProps(value) {
        const { search: searchEnabled, autoComplete } = this.props;
        const { search } = this.state;
        const val = value ? value.name : '';

        return {
            option: value,
            state: this.state,
            className: this.theme.classes.search,
            tabIndex: '0',
            onFocus: this.onFocus,
            onClick: this.onFocus,
            readOnly: !this.props.search,
            value: (searchEnabled) ? search : val,
            placeholder: this.props.placeholder,
            onChange: (searchEnabled) ? this.onSearch : null,
            type: (searchEnabled) ? 'search' : null,
            autoComplete: (searchEnabled) ? autoComplete : null,
        };
    }

    toggle = () => {
        if (this.state.focus) {
            this.onBlur();
        } else {
            this.onFocus();
        }
    };

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

    handleClickOutside = () => {
        this.onBlur();
    };

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
        this.onChange();
    }

    handleEsc() {
        this.onBlur();
    }

    handleFocus() {
        document.addEventListener('keydown', this.onKeyDown);
        document.addEventListener('keypress', this.onKeyPress);
        document.addEventListener('keyup', this.onKeyUp);

        this.scrollToSelected();
    }

    handleBlur() {
        document.removeEventListener('keydown', this.onKeyDown);
        document.removeEventListener('keypress', this.onKeyPress);
        document.removeEventListener('keyup', this.onKeyUp);
    }

    scrollToSelected() {
        if (this.props.multiple || !this.state.value || !this.parentRef.current) {
            return;
        }

        const parent = this.parentRef.current;
        const selected = parent.querySelector('[data-selected="true"]');

        if (selected) {
            selected.scrollIntoView({
                behavior: 'auto',
                block: 'center',
            });
        }
    }

    scrollToHighlighted() {
        if (this.state.highlighted == null || !this.parentRef.current) {
            return;
        }

        const parent = this.parentRef.current;
        const highlighted = parent.querySelector('[data-highlighted="true"]');

        if (highlighted) {
            highlighted.scrollIntoView({
                behavior: 'auto',
                block: 'center',
            });
        }
    }

    render() {
        const {
            value,
            defaultOptions,
            options,
            focus,
        } = this.state;

        const { search, multiple } = this.props;
        const selectedOption = this.findByValue(defaultOptions, value);
        const mappedOptions = this.getOptionsForRender();
        const valueProps = this.getValueProps(selectedOption);
        let className = this.theme.classes.main;

        if (search) {
            className += ` ${this.theme.classes.main}--search`;
        }

        if (multiple) {
            className += ` ${this.theme.classes.main}--multiple`;
        }

        return (
            <Context.Provider value={this.theme}>
                <div ref={this.parentRef} className={className}>
                    {(search || !multiple) && (
                        <Value ref={this.valueRef} {...valueProps} />
                    )}

                    {options.length > 0 && (focus || multiple) && (
                        <div className={this.theme.classes.select}>
                            <Options options={mappedOptions} />
                        </div>
                    )}
                </div>
            </Context.Provider>
        );
    }
}

SelectSearch.propTypes = {
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array,
    ]),
    multiple: PropTypes.bool,
    search: PropTypes.bool,
    placeholder: PropTypes.string,
    maxOptions: PropTypes.number,
    className: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({
        main: PropTypes.string,
        value: PropTypes.string,
        search: PropTypes.string,
        select: PropTypes.string,
        options: PropTypes.string,
        option: PropTypes.string,
        group: PropTypes.string,
        groupHeader: PropTypes.string,
    })]),
    autoComplete: PropTypes.oneOf(['on', 'off']),
    autofocus: PropTypes.bool,
    // eslint-disable-next-line react/forbid-prop-types
    fuse: PropTypes.object,
    renderOption: PropTypes.func,
    renderGroupHeader: PropTypes.func,
    renderValue: PropTypes.func,
};

export default onClickOutside(SelectSearch);
