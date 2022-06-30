import { memo, forwardRef, useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import useSelect from './useSelect';
import classes from './lib/classes';
import isSelected from './lib/isSelected';
import Option from './components/Option';

const nullCb = () => {};

const SelectSearch = forwardRef(
    (
        {
            defaultValue,
            value: controlledValue,
            disabled,
            placeholder,
            multiple,
            search,
            autoFocus,
            autoComplete,
            options: defaultOptions,
            id,
            onChange,
            onFocus,
            onBlur,
            closeOnSelect,
            className,
            renderValue,
            renderOption,
            renderGroupHeader,
            getOptions,
            filterOptions,
            fuzzySearch,
            debounce,
            emptyMessage,
        },
        ref,
    ) => {
        const selectRef = useRef(null);
        const cls = useCallback(
            (classNames) => classes(classNames, className),
            [className],
        );
        const [snapshot, valueProps, optionProps] = useSelect({
            options: defaultOptions,
            defaultValue,
            value: controlledValue,
            placeholder,
            multiple,
            search,
            onChange,
            onFocus,
            onBlur,
            closeOnSelect: closeOnSelect && !multiple,
            getOptions,
            filterOptions,
            useFuzzySearch: fuzzySearch,
            debounceTime: debounce,
        });
        const { highlighted, value, fetching, focus } = snapshot;

        const props = {
            ...valueProps,
            autoFocus,
            autoComplete,
            disabled,
        };

        useEffect(() => {
            const { current } = selectRef;

            if (current) {
                const val = Array.isArray(value) ? value[0] : value;
                const selected = current.querySelector(
                    highlighted > -1
                        ? `[data-index="${highlighted}"]`
                        : `[value="${encodeURIComponent(val)}"]`,
                );

                if (selected) {
                    const rect = current.getBoundingClientRect();
                    const selectedRect = selected.getBoundingClientRect();

                    current.scrollTop =
                        selected.offsetTop -
                        rect.height / 2 +
                        selectedRect.height / 2;
                }
            }
        }, [value, highlighted, selectRef.current]);

        return (
            <div
                ref={ref}
                id={id}
                className={cls({
                    container: true,
                    'is-multiple': multiple,
                    'is-disabled': disabled,
                    'is-loading': fetching,
                    'has-focus': focus,
                })}
            >
                {(!multiple || placeholder || search) && (
                    <div className={cls('value')}>
                        {renderValue &&
                            renderValue(props, snapshot, cls('input'))}
                        {!renderValue && (
                            <input {...props} className={cls('input')} />
                        )}
                    </div>
                )}
                <div
                    className={cls('select')}
                    ref={selectRef}
                    onMouseDown={(e) => e.preventDefault()}
                >
                    <ul className={cls('options')}>
                        {snapshot.options.length > 0 &&
                            snapshot.options.map((o) => {
                                if (o.type === 'group') {
                                    return (
                                        <li
                                            role="none"
                                            className={cls('row')}
                                            key={o.name}
                                        >
                                            <div className={cls('group')}>
                                                <div
                                                    className={cls(
                                                        'group-header',
                                                    )}
                                                >
                                                    {renderGroupHeader
                                                        ? renderGroupHeader(
                                                              o.name,
                                                          )
                                                        : o.name}
                                                </div>
                                                <ul className={cls('options')}>
                                                    {o.items.map(
                                                        (groupOption) => (
                                                            <Option
                                                                key={
                                                                    groupOption.value
                                                                }
                                                                option={
                                                                    groupOption
                                                                }
                                                                optionProps={
                                                                    optionProps
                                                                }
                                                                cls={cls}
                                                                renderOption={
                                                                    renderOption
                                                                }
                                                                selected={isSelected(
                                                                    groupOption,
                                                                    snapshot.option,
                                                                )}
                                                                highlighted={
                                                                    snapshot.highlighted ===
                                                                    groupOption.index
                                                                }
                                                                disabled={
                                                                    groupOption.disabled ||
                                                                    disabled
                                                                }
                                                            />
                                                        ),
                                                    )}
                                                </ul>
                                            </div>
                                        </li>
                                    );
                                }

                                return (
                                    <Option
                                        key={o.value}
                                        option={o}
                                        optionProps={optionProps}
                                        cls={cls}
                                        renderOption={renderOption}
                                        selected={isSelected(
                                            o,
                                            snapshot.option,
                                        )}
                                        highlighted={
                                            snapshot.highlighted === o.index
                                        }
                                        disabled={o.disabled || disabled}
                                    />
                                );
                            })}
                        {!snapshot.options.length && emptyMessage && (
                            <li className={cls('not-found')}>{emptyMessage}</li>
                        )}
                    </ul>
                </div>
            </div>
        );
    },
);

SelectSearch.defaultProps = {
    // Data
    options: [],
    fuzzySearch: true,

    // Interaction´
    printOptions: 'auto',
    closeOnSelect: true,
    debounce: 250,

    // Attributes
    autoComplete: 'on',

    // Design
    className: 'select-search',

    // Events
    onChange: nullCb,
    onFocus: nullCb,
    onBlur: nullCb,
};

SelectSearch.propTypes = {
    // Data
    options: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
                .isRequired,
        }),
    ),
    getOptions: PropTypes.func,
    filterOptions: PropTypes.arrayOf(PropTypes.func),
    fuzzySearch: PropTypes.bool,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    // Interaction
    multiple: PropTypes.bool,
    search: PropTypes.bool,
    disabled: PropTypes.bool,
    closeOnSelect: PropTypes.bool,
    debounce: PropTypes.number,

    // Attributes
    placeholder: PropTypes.string,
    id: PropTypes.string,
    autoComplete: PropTypes.string,
    autoFocus: PropTypes.bool,

    // Design
    className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

    // Renderers
    renderOption: PropTypes.func,
    renderGroupHeader: PropTypes.func,
    renderValue: PropTypes.func,
    emptyMessage: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),

    // Events
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
};

SelectSearch.displayName = 'SelectSearch';

export default memo(SelectSearch);
