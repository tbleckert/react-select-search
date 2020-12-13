import { useCallback } from 'react';
import fuzzySearch from './fuzzySearch';
export default function useFilter(filter, fuse) {
  return useCallback((q, o) => {
    let nextOptions = o;

    if (q.length && fuse) {
      nextOptions = fuzzySearch(q, nextOptions, fuse);
    }

    if (filter) {
      nextOptions = filter(q, nextOptions);
    }

    return nextOptions;
  }, [filter, fuse]);
}