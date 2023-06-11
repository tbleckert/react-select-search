import { useEffect, useRef, useState } from 'react';
import getOption from './lib/getOption';
import updateOption from './lib/updateOption';
import getDisplayValue from './lib/getDisplayValue';
import getValue from './lib/getValue';
import groupOptions from './lib/groupOptions';
import fuzzySearch from './lib/fuzzySearch';
import reduce from './lib/reduce';
import useOptions from './useOptions';
import useHighlight from './useHighlight';

const nullCb = () => {};

export default function useSelect({
    options: defaultOptions,
    defaultValue,
    value,
    multiple,
    search,
    onChange = nullCb,
    onFocus = nullCb,
    onBlur = nullCb,
    closeOnSelect = true,
    placeholder,
    getOptions,
    filterOptions,
    useFuzzySearch = true,
    debounce,
}) {
    const ref = useRef();
    const [option, setOption] = useState(null);
    const [q, setSearch] = useState('');
    const [focus, setFocus] = useState(false);
    const [options, fetching] = useOptions(
        defaultOptions,
        getOptions,
        debounce,
        q,
    );

    const onSelect = (v) => {
        const newOption = updateOption(
            getOption(decodeURIComponent(v), options),
            option,
            multiple,
        );

        if (value === undefined) {
            setOption(newOption);
        }

        onChange(getValue(newOption), newOption);

        setTimeout(() => {
            if (ref.current && closeOnSelect) {
                ref.current.blur();
            }
        }, 0);
    };

    const [keyHandlers, highlighted, setHighlighted] = useHighlight(
        options,
        onSelect,
        ref,
    );
    const middleware = [
        useFuzzySearch ? fuzzySearch : null,
        ...(filterOptions ? filterOptions : []),
    ];

    const snapshot = {
        search: q,
        focus,
        option,
        value: getValue(option),
        fetching,
        highlighted,
        options: groupOptions(reduce(middleware, options, q)),
        displayValue: getDisplayValue(option, options, placeholder),
    };

    const valueProps = {
        tabIndex: '0',
        readOnly: !search,
        placeholder,
        value: focus && search ? q : snapshot.displayValue,
        ref,
        ...keyHandlers,
        onFocus: (e) => {
            setFocus(true);
            onFocus(e);
        },
        onBlur: (e) => {
            setFocus(false);
            !option && setSearch('');
            setHighlighted(-1);
            onBlur(e);
        },
        onMouseDown: (e) => {
            if (focus) {
                e.preventDefault();
                ref.current.blur();
            }
        },
        onChange: search
            ? ({ target }) => setSearch(target.value)
            : null,
    };

    const optionProps = {
        tabIndex: '-1',
        onMouseDown(e) {
            e.preventDefault();
            onSelect(e.currentTarget.value);
        },
    };

    useEffect(() => {
        setOption(getOption(
            value === undefined ? defaultValue : value,
            options,
        ));
    }, [value, options]);

    return [snapshot, valueProps, optionProps];
}
