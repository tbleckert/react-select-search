import { memo, useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { optionType, valueType } from '../types';
import OptionsList from './OptionsList';
import { jsx as _jsx } from "react/jsx-runtime";

const Options = ({
  options,
  optionProps,
  snapshot,
  cls,
  renderGroupHeader,
  renderOption,
  emptyMessage
}) => {
  const selectRef = useRef(null);
  const {
    value,
    highlighted
  } = snapshot;
  const renderEmptyMessage = useCallback(() => {
    if (emptyMessage === null) {
      return null;
    }

    return /*#__PURE__*/_jsx("li", {
      className: cls('not-found'),
      children: typeof emptyMessage === 'function' ? emptyMessage() : emptyMessage
    });
  }, [emptyMessage, cls]);
  useEffect(() => {
    const {
      current
    } = selectRef;

    if (!current || highlighted < 0 && Array.isArray(value) || value === null) {
      return;
    }

    const query = highlighted > -1 ? `[data-index="${highlighted}"]` : `[data-value="${escape(value)}"]`;
    const selected = current.querySelector(query);

    if (selected) {
      const rect = current.getBoundingClientRect();
      const selectedRect = selected.getBoundingClientRect();
      current.scrollTop = selected.offsetTop - rect.height / 2 + selectedRect.height / 2;
    }
  }, [value, highlighted, selectRef]);
  return (
    /*#__PURE__*/
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    _jsx("div", {
      className: cls('select'),
      ref: selectRef,
      onMouseDown: e => e.preventDefault(),
      children: options.length ? /*#__PURE__*/_jsx(OptionsList, {
        optionProps: optionProps,
        snapshot: snapshot,
        options: options,
        renderOption: renderOption,
        renderGroupHeader: renderGroupHeader,
        cls: cls
      }) : /*#__PURE__*/_jsx("ul", {
        className: cls('options'),
        children: renderEmptyMessage()
      })
    })
  );
};

Options.defaultProps = {
  renderOption: null,
  renderGroupHeader: null,
  emptyMessage: null
};
Options.propTypes = process.env.NODE_ENV !== "production" ? {
  options: PropTypes.arrayOf(optionType).isRequired,
  optionProps: PropTypes.shape({
    tabIndex: PropTypes.string.isRequired,
    onMouseDown: PropTypes.func.isRequired
  }).isRequired,
  snapshot: PropTypes.shape({
    highlighted: PropTypes.number.isRequired,
    value: valueType
  }).isRequired,
  cls: PropTypes.func.isRequired,
  renderGroupHeader: PropTypes.func,
  renderOption: PropTypes.func,
  emptyMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
} : {};
export default /*#__PURE__*/memo(Options);