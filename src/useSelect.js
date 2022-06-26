import {
    useEffect,
    useMemo,
    useState,
    useRef, useCallback,
} from 'react';
import groupOptions from './lib/groupOptions';
import getOptions from './lib/getOptions';
import getDisplayValue from './lib/getDisplayValue';
import useFetch from './useFetch';
import getValues from './lib/getValues';
import highlight from './lib/highlight';

export default function useSelect({
    value: defaultValue = null,
    options: defaultOptions = [],
    search: canSearch = false,
    multiple = false,
    disabled = false,
    closeOnSelect = true,
    getOptions: getOptionsFn = null,
    filterOptions = null,
    fuzzySearch = true,
    onChange = () => {},
    onFocus = () => {},
    onBlur = () => {},
    debounce = 0,
}) {
    const initialValue = useRef();
    const ref = useRef(null);
    const [value, setValue] = useState(null);
    const [search, setSearch] = useState('');
    const [focus, setFocus] = useState(false);
    const { options, fetching } = useFetch(search, defaultOptions, {
        getOptions: getOptionsFn,
        fuzzySearch,
        filterOptions,
        debounceTime: debounce,
    });

    const onSelect = useCallback((newValue) => {
        const newOption = getOptions(
            newValue,
            value,
            options,
            multiple,
        );

        setValue(newOption);
        onChange(getValues(newOption), newOption);

        if (ref.current && closeOnSelect) {
            ref.current.blur();
        }
    }, [closeOnSelect, multiple, onChange, value, options, ref]);

    const [highlighted, setHighlighted] = useState(-1);
    const move = useCallback((key) => setHighlighted(highlight(highlighted, key.replace('Arrow', '').toLowerCase(), options)), [options, highlighted]);
    const snapshot = useMemo(() => ({
        options: groupOptions(options),
        option: value,
        displayValue: getDisplayValue(value),
        value: getValues(value),
        search,
        fetching,
        focus,
        highlighted,
        disabled,
    }), [disabled, fetching, focus, highlighted, search, value, options]);

    const onMouseDown = useCallback((e) => {
        e.preventDefault();
        onSelect(e.currentTarget.value);
    }, [onSelect]);

    const onFocusCb = useCallback((e) => {
        setFocus(true);
        onFocus(e);

        if (value && !multiple) {
            setHighlighted(value.index);
        } else {
            move('down');
        }
    }, [onFocus, value, multiple, move]);

    const onBlurCb = useCallback((e) => {
        setFocus(false);
        setSearch('');
        setHighlighted(-1);
        onBlur(e);
    }, [onBlur]);

    const onKeyDown = useCallback((e) => {
        const { key } = e;

        if (key === 'ArrowDown' || key === 'ArrowUp') {
            e.preventDefault();
            move(key);
        }
    }, [options, highlighted, move]);

    const onKeyUp = useCallback((e) => {
        if (e.key === 'Escape') {
            e.preventDefault();
            ref.current.blur();
        } else if (e.key === 'Enter') {
            e.preventDefault();

            const selected = options[highlighted];

            if (selected) {
                onSelect(selected.value);
            }
        }
    }, [ref, onSelect, options, highlighted]);

    const valueProps = useMemo(() => ({
        tabIndex: '0',
        readOnly: !canSearch,
        onKeyDown,
        onKeyUp,
        onFocus: onFocusCb,
        onBlur: onBlurCb,
        onChange: (canSearch) ? ({ target }) => setSearch(target.value) : null,
        onMouseDown: (e) => {
            if (focus) {
                e.preventDefault();
                ref.current.blur();
            }
        },
        disabled,
        ref,
    }), [canSearch, onKeyDown, onKeyUp, onFocusCb, onBlurCb, disabled, focus]);

    const optionProps = useMemo(() => ({
        tabIndex: '-1',
        onMouseDown,
    }), [onMouseDown]);

    useEffect(() => {
        if (initialValue.current !== defaultValue && options.length) {
            initialValue.current = defaultValue;

            setValue(getOptions(
                defaultValue,
                null,
                options,
                multiple,
            ));
        }
    }, [defaultValue, initialValue, multiple, options]);

    return [snapshot, valueProps, optionProps, setValue];
}
