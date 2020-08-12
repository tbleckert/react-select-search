import {
    useEffect,
    useMemo,
    useState,
    useRef, useCallback,
} from 'react';
import highlightReducer from './highlightReducer';
import getDisplayValue from './lib/getDisplayValue';
import flattenOptions from './lib/flattenOptions';
import groupOptions from './lib/groupOptions';
import getNewValue from './lib/getNewValue';
import getOption from './lib/getOption';
import doSearch from './search';

export default function useSelect({
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
    closable = true,
}) {
    const ref = useRef(null);
    const flatDefaultOptions = useMemo(() => flattenOptions(defaultOptions), [defaultOptions]);
    const [state, setState] = useState({
        flat: [],
        addedOptions: [],
        value: defaultValue,
        search: '',
        focus: false,
        searching: false,
        highlighted: -1,
        changed: false,
    });

    const {
        flat,
        addedOptions,
        value,
        search,
        focus,
        searching,
        highlighted,
    } = state;

    const option = useMemo(() => {
        let newOption = getOption(value, [...flatDefaultOptions, ...addedOptions]);

        if (!newOption && !allowEmpty && !multiple) {
            ([newOption] = flatDefaultOptions);
        }

        return newOption;
    }, [value, flatDefaultOptions, addedOptions, allowEmpty, multiple]);
    const options = useMemo(() => groupOptions(flat), [flat]);
    const displayValue = useMemo(() => getDisplayValue(option), [option]);
    const onBlur = useCallback(() => {
        setState((oldState) => ({
            ...oldState,
            focus: false,
            search: '',
            flat: flatDefaultOptions,
            highlighted: -1,
        }));

        if (ref.current) {
            ref.current.blur();
        }
    }, [flatDefaultOptions, ref]);

    const setFocus = (newFocus) => setState((oldState) => ({ ...oldState, focus: newFocus }));
    const onClick = () => setFocus(!focus);
    const onFocus = () => setFocus(true);
    const onSelect = useCallback((id) => {
        setState((prevState) => {
            const { flat: prevFlat, highlighted: prevHighlighted } = prevState;
            // eslint-disable-next-line no-underscore-dangle
            const item = (id) ? prevFlat.find((i) => i._id === id) : prevFlat[prevHighlighted];

            if (!item) {
                return prevState;
            }

            const values = getNewValue(item.value, prevState.value, multiple);
            const newOptions = getOption(values, prevFlat);

            return {
                ...prevState,
                addedOptions: (multiple) ? newOptions : [newOptions],
                value: values,
                changed: [values, newOptions],
            };
        });
    }, [multiple]);

    const onMouseDown = useCallback((e) => {
        if (!closeOnSelect) {
            e.preventDefault();
        }

        onSelect(e.currentTarget.value);
    }, [onSelect, closeOnSelect, multiple]);

    const onKeyDown = useCallback((e) => {
        const { key } = e;

        if (key === 'ArrowDown' || key === 'ArrowUp') {
            e.preventDefault();

            setState((oldState) => ({
                ...oldState,
                highlighted: highlightReducer(oldState.highlighted, {
                    key,
                    options: oldState.flat,
                }),
            }));
        }
    }, []);

    const onKeyPress = useCallback(({ key }) => {
        if (key === 'Enter') {
            onSelect();

            if (closable && closeOnSelect) {
                onBlur();
            }
        }
    }, [onSelect, multiple, closeOnSelect, onBlur]);

    const onKeyUp = useCallback(({ key }) => {
        if (key === 'Escape') {
            onBlur();
        }
    }, [onBlur]);

    const onSearch = ({ target }) => {
        const { value: inputVal } = target;
        const newState = { search: inputVal };

        let searchableOption = flatDefaultOptions;

        if (getOptions && inputVal.length) {
            newState.searching = true;

            searchableOption = getOptions(inputVal);
        }

        setState((oldState) => ({ ...oldState, ...newState }));

        Promise.resolve(searchableOption)
            .then((foundOptions) => {
                let newOptions = foundOptions;

                if (inputVal.length) {
                    newOptions = doSearch(inputVal, foundOptions, fuse);
                }

                setState((oldState) => ({
                    ...oldState,
                    flat: (newOptions === false) ? foundOptions : newOptions,
                    searching: false,
                }));
            })
            .catch(() => setState((oldState) => ({
                ...oldState,
                flat: flatDefaultOptions,
                searching: false,
            })));
    };

    const valueProps = {
        tabIndex: '0',
        readOnly: !canSearch,
        onChange: (canSearch) ? onSearch : null,
        disabled,
        onMouseDown: onClick,
        onBlur,
        onFocus,
        onKeyPress,
        onKeyDown,
        onKeyUp,
        ref,
    };

    const optionProps = useMemo(() => ({
        tabIndex: '-1',
        onMouseDown,
        onKeyDown,
        onKeyPress,
        onBlur,
    }), [onMouseDown, onKeyDown, onKeyPress, onBlur]);

    useEffect(() => {
        setState((oldState) => ({ ...oldState, value: defaultValue }));
    }, [defaultValue]);

    useEffect(() => {
        setState((oldState) => ({ ...oldState, flat: flatDefaultOptions }));
    }, [flatDefaultOptions]);

    useEffect(() => {
        if (state.changed !== false) {
            setState((oldState) => ({ ...oldState, changed: false }));
            onChange(...state.changed);
        }
    }, [state.changed, onChange]);

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
        (newValue) => setState((oldState) => ({ ...oldState, value: newValue })),
    ];
}
