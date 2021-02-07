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
    const filter = filterOptions || (op => () => op);

    if (!getOptions) {
      return s => setOptions(flattenOptions(filter(defaultOptions)(s)));
    }

    return debounce(s => {
      const optionsReq = getOptions(s, defaultOptions);
      setFetching(true);
      Promise.resolve(optionsReq).then(newOptions => {
        setOptions(flattenOptions(filter(newOptions)(s)));
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