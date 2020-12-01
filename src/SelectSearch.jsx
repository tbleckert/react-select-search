import {
    forwardRef,
    memo,
    useCallback,
} from 'react';
import PropTypes from 'prop-types';
import useSelect from './useSelect';
import { optionType, valueType } from './types';
import Value from './Components/Value';
import Options from './Components/Options';

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
    className,
    renderValue,
    renderOption,
    renderGroupHeader,
    getOptions,
    filterOptions,
    debounce,
    fuse,
    emptyMessage,
}, ref) => {
    const [snapshot, valueProps, optionProps] = useSelect({
        options: defaultOptions,
        value: (defaultValue === null && (placeholder || multiple)) ? '' : defaultValue,
        multiple,
        disabled,
        search,
        onChange,
        onFocus,
        onBlur,
        closeOnSelect,
        closable: !multiple || printOptions === 'on-focus',
        getOptions,
        filterOptions,
        fuse,
        debounce,
    });

    const {
        focus,
        options,
        fetching,
    } = snapshot;

    const cls = useCallback((key) => {
        if (typeof className === 'function') {
            return className(key);
        }

        if (key.indexOf('container') === 0) {
            return key.replace('container', className);
        }

        if (key.indexOf('is-') === 0 || key.indexOf('has-') === 0) {
            return key;
        }

        return `${className.split(' ')[0]}__${key}`;
    }, [className]);

    const wrapperClass = [
        cls('container'),
        (disabled) ? cls('is-disabled') : false,
        (fetching) ? cls('is-loading') : false,
        (focus) ? cls('has-focus') : false,
    ].filter((single) => !!single).join(' ');

    let shouldRenderOptions;

    switch (printOptions) {
    case 'never':
        shouldRenderOptions = false;
        break;
    case 'always':
        shouldRenderOptions = true;
        break;
    case 'on-focus':
        shouldRenderOptions = focus;
        break;
    default:
        shouldRenderOptions = !disabled && (focus || multiple);
        break;
    }

    return (
        <div ref={ref} className={wrapperClass} id={id}>
            <Value
                valueProps={valueProps}
                placeholder={placeholder}
                multiple={multiple}
                search={search}
                autoComplete={autoComplete}
                autoFocus={autoFocus}
                snapshot={snapshot}
                cls={cls}
                renderValue={renderValue}
            />
            {shouldRenderOptions && (
                <Options
                    options={options}
                    emptyMessage={emptyMessage}
                    optionProps={optionProps}
                    renderOption={renderOption}
                    renderGroupHeader={renderGroupHeader}
                    cls={cls}
                    snapshot={snapshot}
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
    fuse: {
        keys: ['name', 'groupName'],
        threshold: 0.3,
    },

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
    fuse: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.shape({
            keys: PropTypes.arrayOf(PropTypes.string),
            threshold: PropTypes.number,
        }),
    ]),

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
