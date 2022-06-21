import { useEffect, useMemo, useState } from 'react';
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
    const [options, setOptions] = useState(() => flattenOptions(defaultOptions));
    const fetch = useMemo(() => {
        const middleware = [
            (useFuzzySearch) ? fuzzySearch : null,
            ...((filterOptions) ? filterOptions : []),
        ];

        if (!getOptions) {
            return (s) => setOptions(reduce(middleware, flattenOptions(defaultOptions), s));
        }

        return debounce((s) => {
            const optionsReq = getOptions(s, defaultOptions);

            setFetching(true);

            Promise.resolve(optionsReq)
                .then((newOptions) => {
                    setOptions(reduce(middleware, flattenOptions(newOptions), s));
                })
                .finally(() => setFetching(false));
        }, debounceTime);
    }, [filterOptions, defaultOptions, getOptions, debounceTime]);

    useEffect(() => setOptions(defaultOptions), [defaultOptions]);
    useEffect(() => fetch(q), [fetch, q]);

    return { options, setOptions, fetching };
}
