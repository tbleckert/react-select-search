import {
    useEffect,
    useMemo,
    useState,
    useReducer,
    useRef, useCallback,
} from 'react';
import flattenOptions from './lib/flattenOptions';
import groupOptions from './lib/groupOptions';
import highlightReducer from './highlightReducer';
import getOption from './lib/getOption';
import getNewValue from './lib/getNewValue';
import getDisplayValue from './lib/getDisplayValue';
import useFilter from './useFilter';
import useFetch from './useFetch';

export default function useSelect({
    value: defaultValue = null,
    options: defaultOptions = [],
    search: canSearch = false,
    multiple = false,
    disabled = false,
    closeOnSelect = true,
    closable = true,
    getOptions = null,
    filterOptions = null,
    fuse = false,
    onChange = () => {},
    onFocus: onFocusCb = () => {},
    onBlur: onBlurCb = () => {},
    debounce = 0,
}) {
    const ref = useRef(null);
    const valueRef = useRef(undefined);
    const flattenedOptions = useMemo(() => flattenOptions(defaultOptions), [defaultOptions]);
    const [value, setValue] = useState(defaultValue);
    const [search, setSearch] = useState('');
    const [focus, setFocus] = useState(false);
    const [highlighted, dispatchHighlighted] = useReducer(highlightReducer, -1);
    const filter = useFilter(filterOptions, fuse);
    const { options, fetching } = useFetch(search, flattenedOptions, {
        getOptions,
        filter,
        debounceTime: debounce,
    });
    const [option, setOption] = useState(() => getOption(value, options));
    const groupedOptions = useMemo(() => groupOptions(options), [options]);
    const snapshot = useMemo(() => ({
        options: groupedOptions,
        option,
        displayValue: getDisplayValue(option),
        value,
        search,
        fetching,
        focus,
        highlighted,
        disabled,
    }), [disabled, fetching, focus, groupedOptions, highlighted, option, search, value]);

    const onFocus = useCallback((e) => {
        setFocus(true);
        onFocusCb(e);
    }, [onFocusCb]);

    const onBlur = useCallback((e) => {
        setFocus(false);
        setSearch('');

        if (ref.current) {
            ref.current.blur();
        }

        onBlurCb(e);
    }, [onBlurCb]);

    const onSelect = useCallback((newValue) => {
        const newValues = getNewValue(newValue, value, options, multiple);
        const newOption = getOption(
            newValues,
            (Array.isArray(option)) ? [...option, ...options] : options,
        );

        setValue(newValues);
        setOption(newOption);

        onChange(newValues, newOption);
    }, [multiple, onChange, option, options, value]);

    const onMouseDown = useCallback((e) => {
        e.preventDefault();

        onSelect(e.currentTarget.value);

        if (closeOnSelect && closable) {
            onBlur();
        }
    }, [closable, closeOnSelect, onBlur, onSelect]);

    const onKeyDown = useCallback((e) => {
        const { key } = e;

        if (['ArrowDown', 'ArrowUp'].includes(key)) {
            e.preventDefault();
            dispatchHighlighted({ key, options });
        }
    }, [options]);

    const onKeyPress = useCallback((e) => {
        if (e.key === 'Enter') {
            e.preventDefault();

            const selected = options[highlighted];

            if (selected) {
                onSelect(selected.value);
            }

            if (closeOnSelect) {
                onBlur();
            }
        }
    }, [options, highlighted, closeOnSelect, onSelect, onBlur]);

    const onKeyUp = useCallback((e) => {
        if (e.key === 'Escape') {
            e.preventDefault();
            onBlur();
        }
    }, [onBlur]);

    const valueProps = useMemo(() => ({
        tabIndex: '0',
        readOnly: !canSearch,
        onFocus,
        onBlur,
        onKeyPress,
        onKeyDown,
        onKeyUp,
        onChange: (canSearch) ? ({ target }) => setSearch(target.value) : null,
        disabled,
        ref,
    }), [canSearch, onFocus, onBlur, onKeyPress, onKeyDown, onKeyUp, disabled, ref]);

    const optionProps = useMemo(() => ({
        tabIndex: '-1',
        onMouseDown,
        onKeyDown,
        onKeyPress,
    }), [onKeyDown, onKeyPress, onMouseDown]);

    useEffect(() => {
        if (valueRef.current === defaultValue) {
            return;
        }

        valueRef.current = defaultValue;

        const newValues = getNewValue(defaultValue, null, options, multiple);
        const newOption = getOption(newValues, options);

        setValue(defaultValue);
        setOption(newOption);
    }, [defaultValue, multiple, options]);

    return [snapshot, valueProps, optionProps, setValue];
}
