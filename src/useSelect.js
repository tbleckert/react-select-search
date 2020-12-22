import {
    useEffect,
    useMemo,
    useState,
    useReducer,
    useRef, useCallback,
} from 'react';
import groupOptions from './lib/groupOptions';
import highlightReducer from './highlightReducer';
import getOption from './lib/getOption';
import getDisplayValue from './lib/getDisplayValue';
import useFetch from './useFetch';
import getValue from './lib/getValue';

export default function useSelect({
    value: defaultValue = null,
    options: defaultOptions = [],
    search: canSearch = false,
    multiple = false,
    disabled = false,
    closeOnSelect = true,
    getOptions = null,
    filterOptions = null,
    onChange = () => {},
    onFocus = () => {},
    onBlur = () => {},
    debounce = 0,
}) {
    const ref = useRef(null);
    const valueRef = useRef(undefined);
    const [value, setValue] = useState(null);
    const [search, setSearch] = useState('');
    const [focus, setFocus] = useState(false);
    const [highlighted, dispatchHighlighted] = useReducer(highlightReducer, -1);
    const { options, fetching } = useFetch(search, defaultOptions, {
        getOptions,
        filterOptions,
        debounceTime: debounce,
    });
    const snapshot = useMemo(() => ({
        options: groupOptions(options),
        option: value,
        displayValue: getDisplayValue(value),
        value: getValue(value),
        search,
        fetching,
        focus,
        highlighted,
        disabled,
    }), [disabled, fetching, focus, highlighted, search, value, options]);

    const onSelect = useCallback((newValue) => {
        const newOption = getOption(
            newValue,
            value,
            (Array.isArray(value)) ? [...value, ...options] : options,
            multiple,
        );

        setValue(newOption);
        onChange(getValue(newOption), newOption);

        if (closeOnSelect) {
            ref.current.blur();
        }
    }, [closeOnSelect, multiple, onChange, value, options]);

    const onMouseDown = useCallback((e) => {
        e.preventDefault();
        onSelect(e.currentTarget.value);
    }, [onSelect]);

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
                ref.current.blur();
            }
        }
    }, [options, highlighted, closeOnSelect, onSelect]);

    const valueProps = useMemo(() => ({
        tabIndex: '0',
        readOnly: !canSearch,
        onFocus: (e) => {
            setFocus(true);
            onFocus(e);
        },
        onBlur: (e) => {
            setFocus(false);
            setSearch('');
            onBlur(e);
        },
        onKeyPress,
        onKeyDown,
        onKeyUp: (e) => {
            if (e.key === 'Escape') {
                e.preventDefault();
                ref.current.blur();
            }
        },
        onChange: (canSearch) ? ({ target }) => setSearch(target.value) : null,
        disabled,
        ref,
    }), [canSearch, onFocus, onBlur, onKeyPress, onKeyDown, disabled, ref]);

    const optionProps = useMemo(() => ({
        tabIndex: '-1',
        onMouseDown,
    }), [onMouseDown]);

    useEffect(() => {
        if (valueRef.current === defaultValue) {
            return;
        }

        valueRef.current = defaultValue;

        setValue(getOption(
            defaultValue,
            null,
            options,
            multiple,
        ));
    }, [defaultValue, multiple, options]);

    return [snapshot, valueProps, optionProps, setValue];
}
