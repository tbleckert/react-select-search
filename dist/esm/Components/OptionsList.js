import { memo } from 'react';
import PropTypes from 'prop-types';
import Option from './Option';
import isSelected from '../lib/isSelected';
import { optionType } from '../types';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

const OptionsList = ({
  options,
  optionProps,
  snapshot,
  renderOption,
  renderGroupHeader,
  cls
}) => /*#__PURE__*/_jsx("ul", {
  className: cls('options'),
  children: options.map(o => {
    if (o.type === 'group') {
      return /*#__PURE__*/_jsx("li", {
        role: "none",
        className: cls('row'),
        children: /*#__PURE__*/_jsxs("div", {
          className: cls('group'),
          children: [/*#__PURE__*/_jsx("div", {
            className: cls('group-header'),
            children: renderGroupHeader ? renderGroupHeader(o.name) : o.name
          }), /*#__PURE__*/_jsx("ul", {
            className: cls('options'),
            children: /*#__PURE__*/_jsx(OptionsList, {
              optionProps: optionProps,
              snapshot: snapshot,
              options: o.items,
              renderOption: renderOption,
              renderGroupHeader: renderGroupHeader,
              cls: cls
            })
          })]
        })
      }, o.groupId);
    }

    return /*#__PURE__*/_jsx(Option, {
      selected: isSelected(o, snapshot.option),
      highlighted: snapshot.highlighted === o.index,
      option: o,
      optionProps: optionProps,
      cls: cls,
      renderOption: renderOption
    }, o.value);
  })
});

OptionsList.propTypes = process.env.NODE_ENV !== "production" ? {
  options: PropTypes.arrayOf(optionType).isRequired,
  optionProps: PropTypes.shape({}).isRequired,
  snapshot: PropTypes.shape({
    highlighted: PropTypes.number.isRequired,
    option: PropTypes.oneOfType([optionType, PropTypes.arrayOf(optionType)])
  }).isRequired,
  cls: PropTypes.func.isRequired,
  renderGroupHeader: PropTypes.func,
  renderOption: PropTypes.func
} : {};
export default /*#__PURE__*/memo(OptionsList);