import { memo, forwardRef, useEffect, useRef, useState } from "react";
import PropTypes from 'prop-types';
import useSelect from './useSelect';
import classes from './lib/classes';
import Options from './components/Options';

const SelectSearch = forwardRef(
    (
        {
            disabled,
            placeholder,
            multiple,
            search,
            autoFocus,
            autoComplete,
            id,
            closeOnSelect,
            className,
            renderValue,
            renderOption,
            renderGroupHeader,
            fuzzySearch,
            emptyMessage,
            value,
            ...hookProps
        },
        ref,
    ) => {
        const selectRef = useRef(null);
        const cls = (classNames) => classes(classNames, className);
        const [controlledValue, setControlledValue] = useState(value);
        const [snapshot, valueProps, optionProps] = useSelect({
            value: controlledValue,
            placeholder,
            multiple,
            search,
            closeOnSelect: closeOnSelect && !multiple,
            useFuzzySearch: fuzzySearch,
            ...hookProps,
        });
        const { highlighted, value: snapValue, fetching, focus } = snapshot;

        const props = {
            ...valueProps,
            autoFocus,
            autoComplete,
            disabled,
        };

        useEffect(() => {
            const { current } = selectRef;

            if (current) {
                const val = Array.isArray(snapValue) ? snapValue[0] : snapValue;
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
        }, [snapValue, highlighted, selectRef.current]);

        useEffect(() => setControlledValue(value), [value]);

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
                    {snapshot.options.length > 0 && (
                        <Options
                            options={snapshot.options}
                            optionProps={optionProps}
                            renderOption={renderOption}
                            renderGroupHeader={renderGroupHeader}
                            disabled={disabled}
                            snapshot={snapshot}
                            cls={cls}
                        />
                    )}
                    {!snapshot.options.length && (
                        <ul className={cls('options')}>
                            {!snapshot.options.length && emptyMessage && (
                                <li className={cls('not-found')}>
                                    {emptyMessage}
                                </li>
                            )}
                        </ul>
                    )}
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
