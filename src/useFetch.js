import { useCallback, useEffect, useMemo, useState } from 'react';
import debounce from './lib/debounce';
import flattenOptions from './lib/flattenOptions';
import fuzzySearch from './fuzzySearch';
import reduce from './lib/reduce';

export default function useFetch(q, defaultOptions, {
    debounceTime,
    fuzzySearch: useFuzzySearch,
    filterOptions,
    getOptions,
}) {
    const [fetching, setFetching] = useState(false);
    const middleware = useMemo(() => ([
        (useFuzzySearch) ? fuzzySearch : null,
        ...((filterOptions) ? filterOptions : []),
    ]), [useFuzzySearch, filterOptions]);
    const [options, setOptions] = useState(() => reduce(middleware, flattenOptions(defaultOptions), q));
    const updateOptions = useCallback((newOptions, s) => {
        setOptions(reduce(middleware, flattenOptions(newOptions), s));
    }, [middleware]);
    const fetch = useMemo(() => {
        if (!getOptions) {
            return (s) => updateOptions(defaultOptions, s);
        }

        return debounce((s) => {
            const optionsReq = getOptions(s, defaultOptions);

            setFetching(true);

            Promise.resolve(optionsReq)
                .then((newOptions) => updateOptions(newOptions, s))
                .finally(() => setFetching(false));
        }, debounceTime);
    }, [filterOptions, defaultOptions, getOptions, debounceTime]);

    useEffect(() => fetch(q), [fetch, q]);

    return { options, setOptions, fetching };
}
