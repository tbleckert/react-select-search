import React, { useEffect, forwardRef, useMemo, memo, useRef } from 'react';
import PropTypes from 'prop-types';
import useSelect from './useSelect';
import useSearch from './useSearch';
import Value from './Components/Value';
import Options from './Components/Options';
import { optionType, valueType } from './types';

const SelectSearch = forwardRef(({
    value: defaultValue,
    disabled,
    placeholder,
    multiple,
    search,
    autoFocus,
    autoComplete,
    options: defaultOptions,
    onChange,
    className,
    renderValue,
    renderOption,
    renderGroupHeader,
}, ref) => {
    const [searchProps, options] = (search) ? useSearch(defaultOptions) : [null, defaultOptions];
    const [snapshot, valueProps, optionProps] = useSelect({
        options,
        value: defaultValue,
        multiple,
        disabled,
    }, searchProps);

    const prevValue = useRef(snapshot.value);
    const classNameFn = useMemo(() => (
        (typeof className === 'string') ? (key) => {
            if (key === 'container') {
                return 'select-search';
            }

            if (key.indexOf('is-') === 0) {
                return key;
            }

            return `select-search__${key}`;
        } : className
    ), [className]);

    useEffect(() => {
        if (prevValue.current !== snapshot.value) {
            onChange(snapshot.value);
            prevValue.current = snapshot.value;
        }
    }, [onChange, snapshot.value]);

    let { displayValue } = snapshot;

    if (!placeholder && !displayValue && defaultOptions.length) {
        displayValue = defaultOptions[0].name;
    }

    let wrapperClass = classNameFn('container');

    if (multiple) {
        wrapperClass += ` ${wrapperClass}--multiple`;
    }

    if (search) {
        wrapperClass += ` ${wrapperClass}--search`;
    }

    let value = displayValue;

    if ((snapshot.focus || multiple) && search) {
        ({ value } = searchProps);
    }

    const valueComp = (renderValue) ? (
        <div className={classNameFn('value')}>
            {renderValue(valueProps, snapshot, classNameFn('input'))}
        </div>
    ) : (
        <Value
            snapshot={snapshot}
            disabled={disabled}
            search={search}
            autoFocus={autoFocus}
            displayValue={value}
            className={classNameFn}
            valueProps={valueProps}
            autoComplete={autoComplete}
            placeholder={placeholder}
            multiple={multiple}
            render={renderValue}
        />
    );

    return (
        <div ref={ref} className={wrapperClass}>
            {(!multiple || search) && valueComp}
            {!disabled && (snapshot.focus || multiple) && (
                <div className={classNameFn('select')}>
                    <Options
                        options={snapshot.options}
                        snapshot={snapshot}
                        optionProps={optionProps}
                        className={classNameFn}
                        renderOption={renderOption}
                        renderGroupHeader={renderGroupHeader}
                    />
                </div>
            )}
        </div>
    );
});

SelectSearch.defaultProps = {
    className: 'select-search',
    disabled: false,
    search: false,
    multiple: false,
    placeholder: null,
    autoFocus: false,
    autoComplete: 'on',
    value: '',
    onChange: () => {},
    renderOption: null,
    renderGroupHeader: name => name,
    renderValue: null,
};

SelectSearch.propTypes = {
    options: PropTypes.arrayOf(optionType).isRequired,
    value: valueType,
    className: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
    ]),
    multiple: PropTypes.bool,
    search: PropTypes.bool,
    disabled: PropTypes.bool,
    placeholder: PropTypes.string,
    autoComplete: PropTypes.oneOf(['on', 'off']),
    autoFocus: PropTypes.bool,
    onChange: PropTypes.func,
    renderOption: PropTypes.func,
    renderGroupHeader: PropTypes.func,
    renderValue: PropTypes.func,
};

export default memo(SelectSearch);
