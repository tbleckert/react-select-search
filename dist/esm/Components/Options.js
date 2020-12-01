import { jsxs as _jsxs } from "react/jsx-runtime";
import { jsx as _jsx } from "react/jsx-runtime";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { memo, useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Option from './Option';
import isSelected from '../lib/isSelected';
import { optionType, valueType } from '../types';

const Options = ({
  options,
  emptyMessage,
  cls,
  optionProps,
  renderOption,
  renderGroupHeader,
  snapshot
}) => {
  const selectRef = useRef(null);
  const renderEmptyMessage = useCallback(() => {
    if (emptyMessage === null) {
      return null;
    }

    return /*#__PURE__*/_jsx("li", {
      className: cls('not-found'),
      children: typeof emptyMessage === 'function' ? emptyMessage() : emptyMessage
    });
  }, [emptyMessage, cls]);
  const {
    focus,
    value,
    highlighted
  } = snapshot;
  useEffect(() => {
    const {
      current
    } = selectRef;

    if (!current || Array.isArray(value) || highlighted < 0 && value === null) {
      return;
    }

    const query = highlighted > -1 ? "[data-index=\"" + highlighted + "\"]" : "[data-value=\"" + escape(value) + "\"]";
    const selected = current.querySelector(query);

    if (selected) {
      const rect = current.getBoundingClientRect();
      const selectedRect = selected.getBoundingClientRect();
      current.scrollTop = selected.offsetTop - rect.height / 2 + selectedRect.height / 2;
    }
  }, [focus, value, highlighted, selectRef]);
  return (
    /*#__PURE__*/
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    _jsx("div", {
      className: cls('select'),
      ref: selectRef,
      onMouseDown: e => e.preventDefault(),
      children: /*#__PURE__*/_jsx("ul", {
        className: cls('options'),
        children: options.length > 0 ? options.map(option => {
          const isGroup = option.type === 'group';
          const items = isGroup ? option.items : [option];
          const base = {
            cls,
            optionProps,
            renderOption
          };
          const rendered = items.map(o => /*#__PURE__*/_jsx(Option, _extends({
            selected: isSelected(o, snapshot.option),
            highlighted: snapshot.highlighted === o.index
          }, base, o), o.value));

          if (isGroup) {
            return /*#__PURE__*/_jsx("li", {
              role: "none",
              className: cls('row'),
              children: /*#__PURE__*/_jsxs("div", {
                className: cls('group'),
                children: [/*#__PURE__*/_jsx("div", {
                  className: cls('group-header'),
                  children: renderGroupHeader(option.name)
                }), /*#__PURE__*/_jsx("ul", {
                  className: cls('options'),
                  children: rendered
                })]
              })
            }, option.groupId);
          }

          return rendered;
        }) : renderEmptyMessage()
      })
    })
  );
};

Options.defaultProps = {
  emptyMessage: null,
  renderOption: undefined,
  renderGroupHeader: name => name
};
Options.propTypes = process.env.NODE_ENV !== "production" ? {
  options: PropTypes.arrayOf(optionType).isRequired,
  cls: PropTypes.func.isRequired,
  emptyMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  optionProps: PropTypes.shape({
    tabIndex: PropTypes.string.isRequired,
    onMouseDown: PropTypes.func.isRequired
  }).isRequired,
  snapshot: PropTypes.shape({
    highlighted: PropTypes.number.isRequired,
    option: PropTypes.oneOfType([optionType, PropTypes.arrayOf(optionType)]),
    focus: PropTypes.bool.isRequired,
    value: valueType
  }).isRequired,
  renderOption: PropTypes.func,
  renderGroupHeader: PropTypes.func
} : {};
export default /*#__PURE__*/memo(Options);