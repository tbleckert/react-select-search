import { useCallback } from 'react';
export default function useClassName(className) {
  return useCallback(key => {
    if (typeof className === 'function') {
      return className(key);
    }

    if (key.indexOf('container') === 0) {
      return key.replace('container', className);
    }

    if (key.indexOf('is-') === 0 || key.indexOf('has-') === 0) {
      return key;
    }

    return `${className.split(' ')[0]}__${key}`;
  }, [className]);
}