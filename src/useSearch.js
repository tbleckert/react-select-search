import { useMemo, useCallback, useState } from 'react';
import doSearch from './search';
import FlattenOptions from './lib/FlattenOptions';

export default function useSearch(
    defaultOptions,
    snapshot,
    fuse = {
        keys: ['name', 'groupName'],
        threshold: 0.3,
    },
) {
    const flatOptions = useMemo(() => FlattenOptions(defaultOptions), [defaultOptions]);
    const [search, setSearch] = useState('');
    const [options, setOptions] = useState(flatOptions);
    const onBlur = useCallback(() => {
        setOptions(defaultOptions);
        setSearch('');
    }, [defaultOptions]);
    const onSearch = useCallback((e) => {
        const { value } = e.target;

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
    };

    return [
        searchProps,
        options,
    ];
}
