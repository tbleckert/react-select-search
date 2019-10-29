import React from 'react';
import PropTypes from 'prop-types';
import FlattenOptions from './lib/FlattenOptions';
import GroupOptions from './lib/GroupOptions';
import createClasses from './lib/createClasses';
import findByValue from './lib/findByValue';
import toString from './lib/toString';
import cancelablePromise from './lib/cancelablePromise';
import Value from './Components/Value';
import Options from './Components/Options';
import Context from './Context';

class SelectSearch extends React.PureComponent {
    static defaultProps = {
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
        disabled: false,
    };

    constructor(props) {
        super(props);

        const {
            options,
            value,
            defaultValue,
            multiple,
            className,
            renderOption,
            renderValue,
            renderGroupHeader,
            onChange,
            placeholder,
        } = props;

        this.controlledValue = value !== undefined && typeof onChange === 'function';

        const val = toString((this.controlledValue) ? value : defaultValue);
        let stateValue = (!val && multiple) ? [] : val;
        const flattenedOptions = FlattenOptions(options);

        if (!stateValue && !placeholder && flattenedOptions.length) {
            stateValue = flattenedOptions[0].value;
        }

        this.state = {
            search: '',
            value: stateValue,
            defaultOptions: flattenedOptions,
            options: flattenedOptions,
            highlighted: null,
            focus: false,
            error: false,
            searching: false,
        };

        this.theme = {
            classes: (typeof className === 'string') ? createClasses(className) : className,
            renderers: {
                option: renderOption,
                value: renderValue,
                groupHeader: renderGroupHeader,
            },
        };

        // eslint-disable-next-line react/prop-types
        this.parentRef = this.props.innerRef || React.createRef();
        this.valueRef = React.createRef();

        this.searchPromise = null;
    }

    componentDidMount() {
        const { autoFocus, search } = this.props;

        if (autoFocus && search && this.valueRef.current) {
            this.valueRef.current.focus();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const {
            focus,
            highlighted,
        } = this.state;

        const { focus: prevFocus, highlighted: prevHighlighted } = prevState;

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

    onBlur = () => {
        if (this.props.disabled) {
            return;
        }

        this.setState({ focus: false, highlighted: null, search: '' });
    };

    onFocus = () => {
        if (this.props.disabled) {
            return;
        }

        this.setState({ focus: true, options: this.state.defaultOptions, search: '' });
    };

    onChange = (value) => {
        if (this.props.disabled) {
            return;
        }

        let currentValue = this.getValue().slice();
        let option;

        if (!value) {
            let index = this.state.highlighted;

            if (!index || (this.state.options.length - 1) < index) {
                index = 0;
            }

            option = this.state.options[index];
        } else {
            option = findByValue(this.state.defaultOptions, value);
        }

        if (this.props.multiple) {
            const currentIndex = currentValue.indexOf(option.value);

            if (currentIndex > -1) {
                currentValue.splice(currentIndex, 1);
            } else {
                currentValue.push(option.value);
            }
        } else {
            currentValue = option.value;
        }

        const options = this.state.defaultOptions;
        const highlighted = (this.props.multiple) ? this.state.highlighted : null;

        if (typeof this.props.onChange === 'function') {
            this.props.onChange(currentValue, option);
        }

        this.setState({
            value: currentValue,
            options,
            highlighted,
            focus: this.props.multiple,
        });
    };

    onSearch = (e) => {
        if (this.searchPromise) {
            this.searchPromise.cancel();
        }

        const { value } = e.target;
        const { defaultOptions } = this.state;
        const promise = this.getNewOptionsList(defaultOptions, toString(value));
        this.searchPromise = cancelablePromise(promise);

        this.setState({ search: value, searching: true });

        this.searchPromise.promise.then((options) => {
            this.setState({ options, searching: false });
        }).catch((error) => {
            this.setState({ error, searching: false });
        });
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
        return new Promise((resolve, reject) => {
            const { filterOptions } = this.props;
            const newOptions = this.fuzzySearch(options, value);

            if (typeof filterOptions === 'function') {
                newOptions.then((fuzzyOptions) => {
                    const result = filterOptions(fuzzyOptions, {
                        value: this.getValue(),
                        search: this.state.search,
                        selected: this.state.selected,
                        highlighted: this.state.highlighted,
                        allOptions: this.state.defaultOptions,
                    });

                    Promise.resolve(result)
                        .then(resolve)
                        .catch(reject);
                }).catch(reject);
            } else {
                resolve(Promise.resolve(newOptions));
            }
        });
    }

    getOptionsForRender() {
        const { multiple } = this.props;
        const { options, ...state } = this.state;
        const mappedOptions = options.map((option, i) => {
            const selected = (
                (multiple && Array.isArray(state.value) && state.value.indexOf(option.value) >= 0)
                || option.value === state.value
            );

            const highlighted = i === state.highlighted;
            let className = this.theme.classes.option;

            if (highlighted) {
                className += ' is-highlighted';
            }

            if (selected) {
                className += ' is-selected';
            }

            return {
                ...option,
                option,
                selected,
                highlighted,
                disabled: option.disabled,
                onChange: () => this.onChange(option.value),
                optionProps: {
                    className,
                    onClick: () => this.onChange(option.value),
                    role: 'menuitem',
                    'data-selected': (selected) ? 'true' : null,
                    'data-highlighted': (highlighted) ? 'true' : null,
                    disabled: this.props.disabled || option.disabled,
                },
                key: `${option.value}-option`,
            };
        });

        return GroupOptions(mappedOptions);
    }

    getValueProps(value) {
        const { search: searchEnabled, autoComplete, disabled } = this.props;
        const { focus, error, searching } = this.state;
        let { search } = this.state;
        const val = value ? value.name : '';

        if (!focus) {
            search = val;
        }

        return {
            disabled,
            error,
            searching,
            option: value,
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
            'aria-label': (searchEnabled) ? 'Search' : 'Select',
        };
    }

    getValue() {
        let value = null;

        if (this.controlledValue) {
            ({ value } = this.props);
        } else {
            ({ value } = this.state);
        }

        if (!value && this.props.multiple) {
            value = [];
        } else if (this.props.multiple && !Array.isArray(value)) {
            value = [value];
        }

        return value;
    }

    fuzzySearch(options, value) {
        return new Promise((resolve, reject) => {
            if (this.props.fuse && options && options.length > 0 && value && value.length > 0) {
                const fuseOptions = (typeof this.props.fuse === 'object') ? this.props.fuse : {
                    keys: ['name', 'groupName'],
                    threshold: 0.3,
                };

                import('fuse.js').then(({ default: Fuse }) => {
                    const fuse = new Fuse(options, fuseOptions);
                    const newOptions = fuse
                        .search(value)
                        .map((item, index) => Object.assign({}, item, { index }));

                    resolve(newOptions);
                }).catch(reject);
            } else {
                resolve(options);
            }
        });
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

        if (!this.props.multiple) {
            this.scrollToType('selected');
        }
    }

    handleBlur() {
        document.removeEventListener('keydown', this.onKeyDown);
        document.removeEventListener('keypress', this.onKeyPress);
        document.removeEventListener('keyup', this.onKeyUp);
    }

    scrollToType(type) {
        if (!this.parentRef.current) {
            return;
        }

        const parent = this.parentRef.current;
        const element = parent.querySelector(`[data-${type}="true"]`);

        if (element) {
            element.scrollIntoView({
                behavior: 'auto',
                block: 'center',
            });
        }
    }

    render() {
        const {
            defaultOptions,
            options,
            focus,
            searching,
        } = this.state;

        const {
            search,
            multiple,
            disabled,
            alwaysRenderOptions,
        } = this.props;
        const selectedOption = findByValue(defaultOptions, this.getValue());
        const mappedOptions = this.getOptionsForRender();
        const valueProps = this.getValueProps(selectedOption);
        let className = this.theme.classes.main;

        if (search) {
            className += ` ${this.theme.classes.main}--search`;
        }

        if (multiple) {
            className += ` ${this.theme.classes.main}--multiple`;
        }

        if (disabled) {
            className += ` ${this.theme.classes.main}--disabled`;
        }

        if (focus) {
            className += ' has-focus';
        }

        if (searching) {
            className += ' is-searching';
        }

        let showOptions = options.length > 0 && (focus || multiple);

        if (!showOptions && alwaysRenderOptions) {
            showOptions = true;
        }

        return (
            <Context.Provider value={this.theme}>
                <div ref={this.parentRef} className={className}>
                    {(search || !multiple) && (
                        <Value ref={this.valueRef} {...valueProps} />
                    )}

                    {showOptions && (
                        <div className={this.theme.classes.select}>
                            <Options options={mappedOptions} />
                        </div>
                    )}
                </div>
            </Context.Provider>
        );
    }
}

const optionType = PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
});

SelectSearch.propTypes = {
    options: PropTypes.arrayOf(PropTypes.oneOfType([
        optionType,
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            type: PropTypes.oneOf(['group']).isRequired,
            items: PropTypes.arrayOf(optionType).isRequired,
        }),
    ])).isRequired,
    defaultValue: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array,
    ]),
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array,
    ]),
    multiple: PropTypes.bool,
    search: PropTypes.bool,
    disabled: PropTypes.bool,
    alwaysRenderOptions: PropTypes.bool,
    placeholder: PropTypes.string,
    className: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({
        main: PropTypes.string,
        value: PropTypes.string,
        search: PropTypes.string,
        select: PropTypes.string,
        options: PropTypes.string,
        optionRow: PropTypes.string,
        option: PropTypes.string,
        group: PropTypes.string,
        groupHeader: PropTypes.string,
    })]),
    modifier: PropTypes.string,
    autoComplete: PropTypes.oneOf(['on', 'off']),
    autoFocus: PropTypes.bool,
    // eslint-disable-next-line react/forbid-prop-types
    fuse: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape({
        keys: PropTypes.arrayOf(PropTypes.string).isRequired,
        threshold: PropTypes.number.isRequired,
    })]),
    renderOption: PropTypes.func,
    renderGroupHeader: PropTypes.func,
    renderValue: PropTypes.func,
    onChange: PropTypes.func,
    filterOptions: PropTypes.func,
};

export default SelectSearch;
