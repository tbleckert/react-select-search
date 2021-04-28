import {
    forwardRef,
    memo,
} from 'react';
import PropTypes from 'prop-types';
import useSelect from './useSelect';
import { optionType, valueType } from './types';
import Options from './Components/Options';
import useClassName from './useClassName';
import classes from './lib/classes';

const SelectSearch = forwardRef(({
    value: defaultValue,
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
    printOptions,
    closeOnSelect,
    className = 'select-search',
    renderValue,
    renderOption,
    renderGroupHeader,
    getOptions,
    filterOptions,
    debounce,
    emptyMessage,
}, ref) => {
    const cls = useClassName(className);
    const [snapshot, valueProps, optionProps] = useSelect({
        options: defaultOptions,
        value: (defaultValue === null && (placeholder || multiple)) ? '' : defaultValue,
        multiple,
        disabled,
        search,
        onChange,
        onFocus,
        onBlur,
        closeOnSelect: closeOnSelect && (!multiple || ['on-focus', 'always'].includes(printOptions)),
        getOptions,
        filterOptions,
        debounce,
    });

    const wrapperClass = classes({
        [cls('container')]: true,
        [cls('is-disabled')]: disabled,
        [cls('is-loading')]: snapshot.fetching,
        [cls('has-focus')]: snapshot.focus,
    });

    let shouldRenderOptions;

    switch (printOptions) {
    case 'never':
        shouldRenderOptions = false;
        break;
    case 'always':
        shouldRenderOptions = true;
        break;
    case 'on-focus':
        shouldRenderOptions = snapshot.focus;
        break;
    default:
        shouldRenderOptions = !disabled && (snapshot.focus || multiple);
        break;
    }

    const shouldRenderValue = (!multiple || placeholder) || search;
    const props = {
        ...valueProps,
        placeholder,
        autoFocus,
        autoComplete,
        value: (snapshot.focus && search) ? snapshot.search : snapshot.displayValue,
    };

    return (
        <div ref={ref} className={wrapperClass} id={id}>
            {shouldRenderValue && (
                <div className={cls('value')}>
                    {renderValue && renderValue(props, snapshot, cls('input'))}
                    {!renderValue && <input {...props} className={cls('input')} />}
                </div>
            )}
            {shouldRenderOptions && (
                <Options
                    options={snapshot.options}
                    optionProps={optionProps}
                    snapshot={snapshot}
                    cls={cls}
                    emptyMessage={emptyMessage}
                    renderOption={renderOption}
                    renderGroupHeader={renderGroupHeader}
                />
            )}
        </div>
    );
});

SelectSearch.defaultProps = {
    // Data
    getOptions: null,
    filterOptions: null,
    value: null,

    // Interaction
    multiple: false,
    search: false,
    disabled: false,
    printOptions: 'auto',
    closeOnSelect: true,
    debounce: 0,

    // Attributes
    placeholder: null,
    id: null,
    autoFocus: false,
    autoComplete: 'on',

    // Design
    className: 'select-search',

    // Renderers
    renderOption: undefined,
    renderGroupHeader: undefined,
    renderValue: undefined,
    emptyMessage: null,

    // Events
    onChange: () => {},
    onFocus: () => {},
    onBlur: () => {},
};

SelectSearch.propTypes = {
    // Data
    options: PropTypes.arrayOf(optionType).isRequired,
    getOptions: PropTypes.func,
    filterOptions: PropTypes.func,
    value: valueType,

    // Interaction
    multiple: PropTypes.bool,
    search: PropTypes.bool,
    disabled: PropTypes.bool,
    printOptions: PropTypes.oneOf(['auto', 'always', 'never', 'on-focus']),
    closeOnSelect: PropTypes.bool,
    debounce: PropTypes.number,

    // Attributes
    placeholder: PropTypes.string,
    id: PropTypes.string,
    autoComplete: PropTypes.string,
    autoFocus: PropTypes.bool,

    // Design
    className: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
    ]),

    // Renderers
    renderOption: PropTypes.func,
    renderGroupHeader: PropTypes.func,
    renderValue: PropTypes.func,
    emptyMessage: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
    ]),

    // Events
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
};

export default memo(SelectSearch);
