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

let Fuse = null;

try {
    // eslint-disable-next-line global-require
    Fuse = require('fuse.js');
} catch (e) {
    /* istanbul ignore next */
    if (process.env.NODE_ENV !== 'production') {
        console.warn('React Select Search: Not using fuzzy search. Please install fuse.js to enable this feature.');
    }
}

class SelectSearch extends React.PureComponent {
    static defaultProps = {
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

        if (!stateValue && !placeholder && flattenedOptions.length && !this.props.multiple) {
            stateValue = flattenedOptions[0].value;
        }

        this.state = {
            search: '',
            value: stateValue,
            defaultOptions: flattenedOptions,
            options: [],
            highlighted: null,
            focus: false,
            error: false,
            searching: false,
        };

        this.theme = {
            multiple: this.props.multiple,
            search: this.props.search,
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
        const {
            autoFocus,
            search,
            disabled,
        } = this.props;

        if (!disabled && autoFocus && search && this.valueRef.current) {
            this.valueRef.current.focus();
            this.onFocus();
        }

        this.search();
    }

    componentDidUpdate(prevProps, prevState) {
        const { focus, search } = this.state;
        const { focus: prevFocus, search: prevSearch } = prevState;
        const { multiple } = this.props;

        if (search !== prevSearch || (prevFocus !== focus && focus && !multiple)) {
            this.search();
        }

        if (prevFocus !== focus && !focus) {
            this.valueRef.current.blur();
        }
    }

    onBlur = (e) => {
        const { relatedTarget } = e;

        const parent = (!relatedTarget) ? null : relatedTarget.closest(`.${this.theme.classes.main}`);

        if (!parent || parent !== this.parentRef.current) {
            this.handleBlur();
        }
    };

    onFocus = () => {
        if (this.props.disabled || this.state.focus) {
            return;
        }

        this.setState({ focus: true });
    };

    onOptionClick = e => this.onChange(e.currentTarget.value);

    onChange = (value) => {
        let currentValue = this.getValue().slice();
        let option;

        if (!value) {
            const index = this.state.highlighted;

            if (index === null || (this.state.options.length - 1) < index) {
                return;
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

        const highlighted = (this.props.multiple) ? this.state.highlighted : null;

        if (typeof this.props.onChange === 'function') {
            this.props.onChange(currentValue, option);
        }

        this.setState({
            value: currentValue,
            highlighted,
            focus: this.props.multiple,
        });
    };

    onSearch = e => this.setState({ search: e.target.value });

    onKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.onChange();
        }
    };

    onKeyDown = (e) => {
        /** Arrow Down */
        if (e.key === 'ArrowDown') {
            this.handleArrowDown();
        }

        /** Arrow Up */
        if (e.key === 'ArrowUp') {
            this.handleArrowUp();
        }
    };

    onKeyUp = (e) => {
        if (e.key === 'Escape') {
            this.handleBlur();
        }
    };

    getNewOptionsList(options, value) {
        return new Promise((resolve, reject) => {
            const { filterOptions } = this.props;
            const fuseOptions = (typeof this.props.fuse === 'object') ? this.props.fuse : {
                keys: ['name', 'groupName'],
                threshold: 0.3,
            };

            const newOptions = this.fuzzySearch(options, value, fuseOptions);

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

    getValueProps(value) {
        const {
            search: searchEnabled,
            autoComplete,
            disabled,
            multiple,
        } = this.props;

        const { focus, error, searching } = this.state;
        let { search } = this.state;
        const val = value ? value.name : '';

        if (!focus && !multiple) {
            search = val;
        }

        return {
            disabled,
            error,
            searching,
            option: value,
            className: this.theme.classes.input,
            tabIndex: '0',
            onFocus: this.onFocus,
            onBlur: this.onBlur,
            readOnly: !this.props.search,
            value: (searchEnabled) ? search : val,
            placeholder: this.props.placeholder,
            onChange: (searchEnabled) ? this.onSearch : null,
            onKeyDown: this.onKeyDown,
            onKeyUp: this.onKeyUp,
            onKeyPress: this.onKeyPress,
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
        } else if (!value && !this.props.placeholder && this.state.defaultOptions.length) {
            const [option] = this.state.defaultOptions;
            ({ value } = option);
        }

        return value;
    }

    search() {
        if (this.searchPromise) {
            this.searchPromise.cancel();
        }

        const { defaultOptions, search } = this.state;
        const promise = this.getNewOptionsList(defaultOptions, toString(search));
        this.searchPromise = cancelablePromise(promise);

        this.setState({ searching: true });

        this.searchPromise.promise.then((options) => {
            this.setState({
                options: GroupOptions(options),
                searching: false,
            });
        }).catch((error) => {
            this.setState({ error, searching: false });
        });
    }

    fuzzySearch(options, value, fuseOptions) {
        return new Promise((resolve) => {
            if (Fuse && this.props.fuse && options.length > 0 && value && value.length > 0) {
                const fuse = new Fuse(options, fuseOptions);
                const newOptions = fuse
                    .search(value)
                    .map((item, index) => Object.assign({}, item, { index }));

                resolve(newOptions);

                return;
            }

            resolve(options);
        });
    }

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

    handleBlur() {
        this.setState({
            focus: false,
            highlighted: null,
            search: '',
        });
    }

    render() {
        const {
            defaultOptions,
            focus,
            searching,
            options,
            highlighted,
        } = this.state;

        const {
            search,
            multiple,
            disabled,
        } = this.props;

        const value = this.getValue();
        const selectedOption = findByValue(defaultOptions, value);
        const valueProps = this.getValueProps(selectedOption);
        const snapshot = {
            value,
            highlighted,
            focus,
        };

        let className = `${this.theme.classes.main} ${this.theme.classes.modifier}`;

        if (search) {
            className += ` ${this.theme.classes.main}--search`;
        }

        if (multiple) {
            className += ` ${this.theme.classes.main}--multiple`;
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

        return (
            <Context.Provider value={this.theme}>
                <div ref={this.parentRef} className={className}>
                    {(search || !multiple) && (
                        // eslint-disable-next-line react/jsx-props-no-spreading
                        <Value ref={this.valueRef} {...valueProps} />
                    )}

                    {!disabled && (
                        <div className={this.theme.classes.select}>
                            <Options
                                options={options}
                                snapshot={snapshot}
                                onChange={this.onOptionClick}
                            />
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
