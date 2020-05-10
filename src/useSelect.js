import {
    useReducer,
    useEffect,
    useMemo,
    useState,
    useRef,
} from 'react';
import highlightReducer from './highlightReducer';
import getDisplayValue from './lib/getDisplayValue';
import flattenOptions from './lib/flattenOptions';
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
    getOptions = null,
    allowEmpty = true,
    closeOnSelect = true,
}) {
    const ref = useRef(null);
    const flatDefaultOptions = useMemo(() => flattenOptions(defaultOptions), [defaultOptions]);
    const [flat, setOptions] = useState([]);
    const [addedOptions, setAddedOptions] = useState([]);
    const [value, setValue] = useState(defaultValue);
    const option = useMemo(() => {
        let newOption = getOption(value, [...flatDefaultOptions, ...addedOptions]);

        if (!newOption && !allowEmpty && !multiple) {
            ([newOption] = flatDefaultOptions);
        }

        return newOption;
    }, [value, flatDefaultOptions, addedOptions, allowEmpty, multiple]);
    const [search, setSearch] = useState('');
    const [focus, setFocus] = useState(false);
    const [searching, setSearching] = useState(false);
    const [highlighted, setHighlighted] = useReducer(highlightReducer, -1);
    const options = useMemo(() => GroupOptions(flat), [flat]);
    const displayValue = useMemo(() => getDisplayValue(option), [option]);
    const onBlur = () => {
        setFocus(false);
        setHighlighted(false);

        if (ref.current) {
            ref.current.blur();
        }

        setSearch('');
        setOptions(flatDefaultOptions);
    };

    const onClick = () => setFocus(!focus);
    const onFocus = () => setFocus(true);
    const onSelect = (val) => {
        const newOption = getOption(val, flat);
        const newOptions = getNewValue(newOption, option, multiple);
        const values = (multiple) ? newOptions.map(i => i.value) : newOptions.value;

        setAddedOptions((multiple) ? newOptions : [newOptions]);
        setValue(values);

        onChange(
            values,
            newOptions,
        );
    };

    const onMouseDown = (e) => {
        if (!closeOnSelect || multiple) {
            e.preventDefault();

            if (multiple) {
                e.target.focus();
            }
        }

        onSelect(e.currentTarget.value);
    };
    const onKeyDown = (e) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();

            setHighlighted({
                key: e.key,
                options: flat,
            });
        }
    };

    const onKeyPress = ({ key }) => {
        if (key === 'Enter') {
            const newOption = flat[highlighted];

            if (newOption) {
                onSelect(newOption.value);

                if (!multiple && closeOnSelect) {
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

    const onSearch = ({ target }) => {
        const { value: inputVal } = target;
        setSearch(inputVal);

        let searchableOption = flatDefaultOptions;

        if (getOptions && inputVal.length) {
            setSearching(true);

            searchableOption = getOptions(inputVal);
        }

        Promise.resolve(searchableOption)
            .then((foundOptions) => {
                if (inputVal.length) {
                    const newOptions = doSearch(inputVal, foundOptions, fuse);

                    setOptions((newOptions === false) ? foundOptions : newOptions);
                } else {
                    setOptions(foundOptions);
                }
            })
            .catch(() => setOptions(flatDefaultOptions))
            .finally(() => setSearching(false));
    };

    const valueProps = {
        tabIndex: '0',
        readOnly: !canSearch,
        onChange: (canSearch) ? onSearch : null,
        onMouseDown: onClick,
        onBlur,
        onFocus,
        onKeyPress,
        onKeyDown,
        onKeyUp,
        ref,
    };

    const optionProps = {
        tabIndex: '-1',
        onMouseDown,
        onKeyDown,
        onKeyPress,
        onBlur,
    };

    useEffect(() => {
        setValue(defaultValue);
    }, [defaultValue]);

    useEffect(() => {
        setOptions(flatDefaultOptions);
    }, [flatDefaultOptions]);

    return [
        {
            value: option,
            highlighted,
            options,
            disabled,
            displayValue,
            focus,
            search,
            searching,
        },
        valueProps,
        optionProps,
        setValue,
    ];
}
