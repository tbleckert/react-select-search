import {
    useReducer,
    useEffect,
    useCallback,
    useMemo,
    useState,
    useRef,
} from 'react';
import highlightReducer from './highlightReducer';
import getDisplayValue from './lib/getDisplayValue';
import FlattenOptions from './lib/flattenOptions';
import GroupOptions from './lib/groupOptions';
import getNewValue from './lib/getNewValue';
import getOption from './lib/getOption';
import doSearch from './search';

export default function useSelectSearch({
    value: defaultValue = null,
    disabled = false,
    multiple = false,
    search: canSearch = false,
    fuse = false,
    options: defaultOptions,
    onChange = () => {},
}) {
    const ref = useRef(null);
    const [allOptions, setAllOptions] = useState(FlattenOptions(defaultOptions));
    const [flat, setOptions] = useState([]);
    const [value, setValue] = useState(defaultValue);
    const [search, setSearch] = useState('');
    const [focus, setFocus] = useState(false);
    const [highlighted, setHighlighted] = useReducer(highlightReducer, -1);
    const options = useMemo(() => GroupOptions(flat), [flat]);
    const selectedOption = useMemo(() => getOption(value, allOptions), [value, allOptions]);
    const displayValue = useMemo(() => getDisplayValue(value, allOptions), [value, allOptions]);
    const onBlur = useCallback(() => {
        setFocus(false);
        setHighlighted(false);

        if (ref.current) {
            ref.current.blur();
        }

        if (!multiple) {
            setSearch('');
            setOptions(allOptions);
        }
    }, [allOptions]);

    const onFocus = () => setFocus(true);
    const onSelect = (val) => {
        const newValue = getNewValue(val, value, multiple);

        setValue(newValue);
        onChange(newValue);
    };

    const onMouseDown = e => onSelect(e.currentTarget.value);
    const onKeyDown = e => setHighlighted({ key: e.key, options: flat });
    const onKeyPress = ({ key }) => {
        if (key === 'Enter') {
            const option = flat[highlighted];

            if (option) {
                onSelect(option.value);

                if (!multiple) {
                    onBlur();
                }
            }
        }
    };

    const onKeyUp = ({ key }) => {
        if (key === 'Escape') {
            onBlur();
        }
    };

    const onSearch = useCallback(({ target }) => {
        const { value: inputVal } = target;
        let newOptions = allOptions;
        setSearch(inputVal);

        if (inputVal.length) {
            newOptions = doSearch(inputVal, newOptions, fuse);
        }

        setOptions(newOptions);
    }, [allOptions]);

    const valueProps = {
        tabIndex: '0',
        readOnly: !canSearch,
        onBlur,
        onFocus,
        onKeyPress,
        onKeyDown,
        onKeyUp,
        ref,
    };

    if (canSearch) {
        valueProps.onChange = onSearch;
    }

    const optionProps = { tabIndex: '-1', onMouseDown };

    useEffect(() => {
        setValue(defaultValue);
    }, [defaultValue]);

    useEffect(() => {
        const flatOptions = FlattenOptions(defaultOptions);

        setAllOptions(flatOptions);
        setOptions(flatOptions);
    }, [defaultOptions]);

    return [
        {
            value,
            selectedOption,
            highlighted,
            options,
            disabled,
            displayValue,
            focus,
            search,
        },
        valueProps,
        optionProps,
        setValue,
    ];
}
