import { useMemo, useCallback, useState, useRef } from 'react';
import doSearch from './search';
import FlattenOptions from './lib/FlattenOptions';

export default function useSearch(
    defaultOptions,
    fuse,
) {
    const ref = useRef(null);
    const flatOptions = useMemo(() => FlattenOptions(defaultOptions), [defaultOptions]);
    const [search, setSearch] = useState('');
    const [options, setOptions] = useState(flatOptions);
    const onBlur = useCallback(() => {
        setOptions(defaultOptions);
        setSearch('');
    }, [defaultOptions]);
    const onSearch = useCallback(({ target }) => {
        const { value } = target;
        setSearch(value);

        if (value.length) {
            const newOptions = doSearch(value, flatOptions, fuse);

            if (newOptions) {
                setOptions(newOptions);
            }
        } else {
            setOptions(flatOptions);
        }
    }, [flatOptions, fuse]);

    const searchProps = {
        onBlur,
        onChange: onSearch,
        value: search,
        ref,
    };

    return [
        searchProps,
        options,
    ];
}
