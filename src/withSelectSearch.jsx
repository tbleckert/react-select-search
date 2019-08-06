import React from 'react';
import PropTypes from 'prop-types';
import Fuse from 'fuse.js';
import onClickOutside from 'react-onclickoutside';
import FlattenOptions from './FlattenOptions';
import GroupOptions from './GroupOptions';

const selectSearch = (WrappedComponent) => {
    class SelectSearch extends React.PureComponent {
        static defaultProps = {
            search: false,
            value: '',
            multiple: false,
            placeholder: '',
            fuse: {
                keys: ['name', 'groupName'],
                threshold: 0.3,
            },
        };

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

            this.parentRef = React.createRef();
        }

        componentDidUpdate(prevProps, prevState) {
            const { focus } = this.state;
            const { prevFocus } = prevState;

            if (prevFocus !== focus) {
                if (focus) {
                    this.handleFocus();
                } else {
                    this.handleBlur();
                }
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
            if (options && options.length > 0 && value && value.length > 0) {
                const fuse = new Fuse(options, this.props.fuse);

                return fuse.search(value).map((item, index) => Object.assign({}, item, { index }));
            }

            return options;
        }

        getOptionsForRender() {
            const { multiple } = this.props;
            const { options, ...state } = this.state;

            return GroupOptions(options.map((option, i) => {
                const selected = (
                    (multiple && state.value.indexOf(option.value) >= 0)
                    || option.value === state.value
                );

                return {
                    ...option,
                    selected,
                    highlighted: i === state.highlighted,
                    onChange: () => this.onChange(option.value),
                    optionProps: {
                        onClick: () => this.onChange(option.value),
                        role: 'menuitem',
                        'data-selected': (selected) ? 'true' : null,
                    },
                    key: `${option.value}-option`,
                };
            }));
        }

        getValueProps(value) {
            const { search: searchEnabled } = this.props;
            const { search } = this.state;
            const val = value ? value.name : '';

            return {
                tabIndex: '0',
                onFocus: this.onFocus,
                onClick: this.onFocus,
                readOnly: !this.props.search,
                value: (searchEnabled) ? search : val,
                placeholder: this.props.placeholder,
                onChange: (searchEnabled) ? this.onSearch : null,
                type: (searchEnabled) ? 'search' : null,
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
            if (
                !this.state.focus
                || !this.state.value
                || !this.state.options.length
                || this.props.multiple
                || !this.parentRef.current
            ) {
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

        render() {
            const {
                value,
                defaultOptions,
                focus,
            } = this.state;

            const selectedOption = this.findByValue(defaultOptions, value);
            const mappedOptions = this.getOptionsForRender();

            return (
                <div ref={this.parentRef}>
                    <WrappedComponent
                        options={mappedOptions}
                        option={selectedOption}
                        toggle={this.toggle}
                        onBlur={this.onBlur}
                        onFocus={this.onFocus}
                        focus={focus}
                        valueProps={this.getValueProps(selectedOption)}
                    />
                </div>
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
        // eslint-disable-next-line react/forbid-prop-types
        fuse: PropTypes.object,
    };

    return onClickOutside(SelectSearch);
};

export default selectSearch;
