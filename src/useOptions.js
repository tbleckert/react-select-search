import { useEffect, useState } from 'react';
import flattenOptions from './lib/flattenOptions';

export default function useOptions(
    defaultOptions,
    getOptions,
    debounceTime,
    search,
) {
    const [options, setOptions] = useState(() => flattenOptions(defaultOptions));
    const [fetching, setFetching] = useState(false);

    useEffect(() => {
        let timeout;

        if (!getOptions) {
            return;
        }

        timeout = setTimeout(() => {
            const optionsReq = getOptions(search, options);

            setFetching(true);

            Promise.resolve(optionsReq)
                .then((newOptions) => setOptions(flattenOptions(newOptions)))
                .finally(() => setFetching(false));
        }, debounceTime);

        return () => {
            clearTimeout(timeout);
        };
    }, [search]);

    useEffect(() => {
        setOptions(flattenOptions(defaultOptions));
    }, [defaultOptions]);

    return [options, fetching];
}
