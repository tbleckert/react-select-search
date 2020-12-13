import { useEffect, useMemo, useState } from 'react';
import debounce from './lib/debounce';
import flattenOptions from './lib/flattenOptions';
export default function useFetch(q, getOptions, filter, debounceTime, defaultOptions) {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState(defaultOptions);
  const fetch = useMemo(() => {
    if (!getOptions) {
      return s => setOptions(filter(s, defaultOptions));
    }

    return debounce(s => {
      const optionsReq = getOptions(s, defaultOptions);
      setFetching(true);
      Promise.resolve(optionsReq).then(newOptions => {
        setOptions(filter(s, flattenOptions(newOptions)));
      }).finally(() => setFetching(false));
    }, debounceTime);
  }, [getOptions, debounceTime, filter, defaultOptions]);
  useEffect(() => setOptions(defaultOptions), [defaultOptions]);
  useEffect(() => fetch(q), [fetch, q]);
  return {
    options,
    setOptions,
    fetching
  };
}