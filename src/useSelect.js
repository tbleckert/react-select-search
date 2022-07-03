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
    const [state, update] = useState(() => ({
        option: null,
        search: '',
        focus: false,
    }));
    const setState = (u) => update({ ...state, ...u });
    const [options, fetching] = useOptions(
        defaultOptions,
        getOptions,
        debounce,
        state.search,
    );

    const onSelect = (v) => {
        const newOption = updateOption(
            getOption(decodeURIComponent(v), options),
            state.option,
            multiple,
        );

        if (value === undefined) {
            setState({
                option: newOption,
            });
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
        ...state,
        value: getValue(state.option),
        fetching,
        highlighted,
        options: groupOptions(reduce(middleware, options, state.search)),
        displayValue: getDisplayValue(state.option, options, placeholder),
    };

    const valueProps = {
        tabIndex: '0',
        readOnly: !search,
        placeholder,
        value: state.focus && search ? state.search : snapshot.displayValue,
        ref,
        ...keyHandlers,
        onFocus: (e) => {
            setState({ focus: true });
            onFocus(e);
        },
        onBlur: (e) => {
            setState({ focus: false, search: '' });
            setHighlighted(-1);
            onBlur(e);
        },
        onMouseDown: (e) => {
            if (state.focus) {
                e.preventDefault();
                ref.current.blur();
            }
        },
        onChange: search
            ? ({ target }) => setState({ search: target.value })
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
        setState({
            option: getOption(
                value === undefined ? defaultValue : value,
                options,
            ),
        });
    }, [value, defaultValue]);

    return [snapshot, valueProps, optionProps];
}
