import { useReducer, useEffect, useCallback, useMemo, useState } from 'react';
import getDisplayValue from './lib/getDisplayValue';
import FlattenOptions from './lib/FlattenOptions';
import GroupOptions from './lib/GroupOptions';
import getNewValue from './lib/getNewValue';
import getOption from './lib/getOption';

function highlightReducer(highlighted, value) {
    if (!value) {
        return -1;
    }

    const { key, options } = value;
    let newHighlighted = null;

    if (key === 'ArrowDown' && highlighted < options.length) {
        newHighlighted = highlighted + 1;
    } else if (key === 'ArrowDown' && highlighted >= options.length - 1) {
        newHighlighted = 0;
    } else if (key === 'ArrowUp' && highlighted > 0) {
        newHighlighted = highlighted - 1;
    } else if (key === 'ArrowUp' && highlighted <= 0) {
        newHighlighted = options.length - 1;
    }

    const option = options[newHighlighted];

    if (option && option.disabled) {
        return highlightReducer(newHighlighted, { key, options });
    }

    return newHighlighted;
}

export default function useSelectSearch({
    value: defaultValue = null,
    disabled = false,
    multiple = false,
    options,
}, searchProps = null) {
    const flat = useMemo(() => FlattenOptions(options), [options]);
    const groupedOptions = useMemo(() => GroupOptions(flat), [flat]);
    const [value, setValue] = useState(defaultValue);
    const selectedOption = useMemo(() => getOption(value, flat), [value, flat]);
    const [focus, setFocus] = useState(false);
    const [highlighted, setHighlighted] = useReducer(highlightReducer, -1);
    const onBlur = useCallback(() => {
        setFocus(false);
        setHighlighted(false);

        if (searchProps) {
            searchProps.onBlur();
        }
    }, [searchProps]);
    const onFocus = useCallback(() => {
        setFocus(true);
    }, []);

    const onChange = e => setValue(getNewValue(e.currentTarget.value, value, multiple));
    const onKeyDown = useCallback(e => setHighlighted({ key: e.key, options: flat }), [flat]);
    const displayValue = useMemo(() => getDisplayValue(value, flat), [value, flat]);
    const onKeyPress = useCallback(({ key }) => {
        if (key === 'Enter') {
            const option = options[highlighted];

            if (option) {
                setValue(getNewValue(option.value, value, multiple));
            }
        }
    }, [options, highlighted, multiple, value]);
    const onKeyUp = useCallback(({ key }) => {
        if (key === 'Escape') {
            setFocus(false);
        }
    }, []);

    const valueProps = {
        ...searchProps,
        tabIndex: '0',
        onBlur,
        onFocus,
        onKeyPress,
        onKeyDown,
        onKeyUp,
    };

    const optionProps = { tabIndex: '-1', onMouseDown: onChange };

    useEffect(() => {
        setValue(defaultValue);
    }, [defaultValue]);

    return [
        {
            value,
            selectedOption,
            highlighted,
            options: groupedOptions,
            disabled,
            displayValue,
            focus,
        },
        valueProps,
        optionProps,
        setValue,
    ];
}
