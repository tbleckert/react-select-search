import React, { forwardRef, memo } from 'react';
import PropTypes from 'prop-types';
import Fuse from 'fuse.js';
import onClickOutside from 'react-onclickoutside';
import FlattenOptions from './lib/FlattenOptions';
import GroupOptions from './lib/GroupOptions';
import createClasses from './lib/createClasses';
import findByValue from './lib/findByValue';
import toString from './lib/toString';
import Value from './Components/Value';
import Options from './Components/Options';
import Context from './Context';

class SelectSearch extends React.PureComponent {
    static defaultProps = {
        search: false,
        value: undefined,
        defaultValue: undefined,
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
        renderOption: null,
        renderGroupHeader: title => title,
        renderValue: null,
        onChange: null,
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

        if (!stateValue && !placeholder) {
            stateValue = flattenedOptions[0].name;
        }

        this.state = {
            search: '',
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

        // eslint-disable-next-line react/prop-types
        this.parentRef = this.props.innerRef || React.createRef();
        this.valueRef = React.createRef();
    }

    componentDidMount() {
        const { autofocus, search } = this.props;

        if (autofocus && search && this.valueRef.current) {
            this.valueRef.current.focus();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const {
            focus,
            highlighted,
        } = this.state;

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
        if (this.props.disabled) {
            return;
        }

        const { multiple } = this.props;
        const { value } = this.state;
        let search = '';

        if (value && !multiple) {
            const option = findByValue(null, value);

            if (option) {
                search = option.name;
            }
        }

        this.setState({ focus: false, highlighted: null, search });
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
            if (!currentValue) {
                currentValue = [];
            }

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
        const { value } = e.target;
        const options = this.getNewOptionsList(this.state.defaultOptions, toString(value));

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
                onChange: () => this.onChange(option.value),
                optionProps: {
                    className,
                    onClick: () => this.onChange(option.value),
                    role: 'menuitem',
                    'data-selected': (selected) ? 'true' : null,
                    'data-highlighted': (highlighted) ? 'true' : null,
                    disabled: this.props.disabled,
                },
                key: `${option.value}-option`,
            };
        }));
    }

    getValueProps(value) {
        const { search: searchEnabled, autoComplete, disabled } = this.props;
        const { search, focus } = this.state;
        const val = value ? value.name : '';

        return {
            disabled,
            option: value,
            state: this.state,
            className: this.theme.classes.search,
            tabIndex: '0',
            onFocus: this.onFocus,
            onClick: this.onFocus,
            readOnly: !this.props.search,
            value: (searchEnabled && (search || focus)) ? search : val,
            placeholder: this.props.placeholder,
            onChange: (searchEnabled) ? this.onSearch : null,
            type: (searchEnabled) ? 'search' : null,
            autoComplete: (searchEnabled) ? autoComplete : null,
        };
    }

    getValue() {
        if (this.controlledValue) {
            return this.props.value;
        }

        return this.state.value;
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
        if (this.props.disabled) {
            return;
        }

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

    toggle = () => {
        if (this.state.focus) {
            this.onBlur();
        } else {
            this.onFocus();
        }
    };

    render() {
        const {
            defaultOptions,
            options,
            focus,
        } = this.state;

        const { search, multiple, disabled } = this.props;
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
    placeholder: PropTypes.string,
    maxOptions: PropTypes.number,
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
    autofocus: PropTypes.bool,
    // eslint-disable-next-line react/forbid-prop-types
    fuse: PropTypes.object,
    renderOption: PropTypes.func,
    renderGroupHeader: PropTypes.func,
    renderValue: PropTypes.func,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
};

// eslint-disable-next-line react/no-multi-comp
const withRef = forwardRef((props, ref) => {
    const Component = onClickOutside(SelectSearch);

    return <Component innerRef={ref} {...props} />;
});

export default memo(withRef);
