import {
    useEffect,
    useMemo,
    useState,
    useReducer,
} from 'react';
import flattenOptions from './lib/flattenOptions';
import groupOptions from './lib/groupOptions';
import highlightReducer from './highlightReducer';
import getOption from './lib/getOption';
import getNewValue from './lib/getNewValue';

export default function useSelect({
    value: defaultValue = null,
    highlighted: defaultHighlighted = -1,
    options: defaultOptions = [],
    search: defaultSearch = '',
    canSearch = true,
    multiple = false,
    disabled = false,
    allowEmpty = true,
    filterOptions = null,
    onChange = () => {},
}) {
    const flattenedOptions = useMemo(() => flattenOptions(defaultOptions), [defaultOptions]);
    const [value, setValue] = useState(defaultValue);
    const [search, setSearch] = useState(defaultSearch);
    const [fetching, setFetching] = useState(false);
    const [focus, setFocus] = useState(false);
    const [highlighted, dispatchHighlighted] = useReducer(highlightReducer, defaultHighlighted);
    const [options, setOptions] = useState(flattenedOptions);
    const [option, setOption] = useState(() => getOption(value, options));
    const groupedOptions = useMemo(() => groupOptions(options), [options]);
    const snapshot = {
        options: groupedOptions,
        option: (!option && !allowEmpty && options.length) ? options[0] : option,
        value,
        search,
        fetching,
        focus,
        highlighted,
        disabled,
    };

    const onFocus = () => setFocus(true);
    const onBlur = () => {
        setFocus(false);
        setOptions(flattenedOptions);
    };

    const onSelect = (id) => {
        // eslint-disable-next-line no-underscore-dangle
        const item = (id) ? options.find((i) => i._id === id) : options[highlighted];

        if (!item) {
            return;
        }

        const newValues = getNewValue(item.value, value, multiple);
        const newOption = getOption(newValues, options);

        setValue(newValues);
        setOption(newOption);

        onChange(newValues, newOption);
    };

    const onMouseDown = (e) => onSelect(e.currentTarget.value);
    const onKeyDown = (e) => {
        const { key } = e;

        if (key !== 'ArrowDown' && key !== 'ArrowUp') {
            return;
        }

        e.preventDefault();
        dispatchHighlighted({ key, options });
    };

    const onKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            onSelect();
        }
    };

    const onKeyUp = ({ key }) => {
        if (key === 'Escape') {
            onBlur();
        }
    };

    const onSearch = ({ target }) => setSearch(target.value);

    const valueProps = {
        tabIndex: '0',
        onFocus,
        onBlur,
        onKeyPress,
        onKeyDown,
        onKeyUp,
        onChange: (canSearch) ? onSearch : null,
        disabled,
    };

    const optionProps = {
        tabIndex: '-1',
        onMouseDown,
        onKeyDown,
        onKeyPress,
        onBlur,
    };

    useEffect(() => setValue(defaultValue), [defaultValue]);
    useEffect(() => setOptions(flattenedOptions), [flattenedOptions]);
    useEffect(() => setSearch(defaultSearch), [defaultSearch]);

    useEffect(() => {
        if (typeof filterOptions === 'function') {
            setOptions(filterOptions(options, search));
        }
    }, [filterOptions, options, search]);

    return [snapshot, valueProps, optionProps, setValue];
}
