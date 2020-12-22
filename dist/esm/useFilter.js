import { useCallback } from 'react';
import flattenOptions from './lib/flattenOptions';
export default function useFilter(filter) {
  return useCallback((q, o) => {
    let nextOptions = o;

    if (filter) {
      nextOptions = filter(q, nextOptions);
    }

    return flattenOptions(nextOptions);
  }, [filter]);
}