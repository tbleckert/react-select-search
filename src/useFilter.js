import { useCallback } from 'react';
import fuzzySearch from './fuzzySearch';
import flattenOptions from './lib/flattenOptions';

export default function useFilter(filter, fuse) {
    return useCallback((q, o) => {
        let nextOptions = o;

        if (q.length && fuse) {
            nextOptions = fuzzySearch(q, nextOptions, fuse);
        }

        if (filter) {
            nextOptions = filter(q, nextOptions);
        }

        return flattenOptions(nextOptions);
    }, [filter, fuse]);
}
