import { useEffect, useMemo, useState } from 'react';
import debounce from './lib/debounce';
import flattenOptions from './lib/flattenOptions';
export default function useFetch(q, defaultOptions, {
  debounceTime,
  filterOptions,
  getOptions
}) {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState(() => flattenOptions(defaultOptions));
  const fetch = useMemo(() => {
    const filter = filterOptions ? filterOptions(defaultOptions) : () => defaultOptions;

    if (!getOptions) {
      return s => setOptions(flattenOptions(filter(s)));
    }

    return debounce(s => {
      const optionsReq = getOptions(s, defaultOptions);
      setFetching(true);
      Promise.resolve(optionsReq).then(newOptions => {
        if (filterOptions) {
          setOptions(flattenOptions(filterOptions(newOptions)(s)));
        } else {
          setOptions(flattenOptions(newOptions));
        }
      }).finally(() => setFetching(false));
    }, debounceTime);
  }, [filterOptions, defaultOptions, getOptions, debounceTime]);
  useEffect(() => setOptions(defaultOptions), [defaultOptions]);
  useEffect(() => fetch(q), [fetch, q]);
  return {
    options,
    setOptions,
    fetching
  };
}