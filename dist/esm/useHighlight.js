import { useCallback, useReducer } from 'react';
import highlightReducer from './highlightReducer';
export default function useHighlight(defaultHighlighted, options, onSelect, ref) {
  const [highlighted, dispatchHighlighted] = useReducer(highlightReducer, defaultHighlighted);
  const onKeyDown = useCallback(e => {
    const {
      key
    } = e;

    if (['ArrowDown', 'ArrowUp'].includes(key)) {
      e.preventDefault();
      dispatchHighlighted({
        key,
        options
      });
    }
  }, [options]);
  const onKeyPress = useCallback(e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const selected = options[highlighted];

      if (selected) {
        onSelect(selected.value);
      }
    }
  }, [options, highlighted, onSelect]);
  const onKeyUp = useCallback(e => {
    if (e.key === 'Escape') {
      e.preventDefault();
      ref.current.blur();
    }
  }, [ref]);
  return [highlighted, {
    onKeyPress,
    onKeyDown,
    onKeyUp
  }];
}