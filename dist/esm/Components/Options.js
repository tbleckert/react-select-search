function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Option from './Option';
import { optionType, valueType } from '../types';
import isSelected from '../lib/isSelected';

const Options = ({
  options,
  optionProps,
  snapshot,
  className,
  renderGroupHeader,
  renderOption
}) => /*#__PURE__*/React.createElement("ul", {
  className: className('options')
}, options.map(option => {
  if (option.type === 'group') {
    return /*#__PURE__*/React.createElement("li", {
      role: "none",
      className: className('row'),
      key: option.groupId
    }, /*#__PURE__*/React.createElement("div", {
      className: className('group')
    }, /*#__PURE__*/React.createElement("div", {
      className: className('group-header')
    }, renderGroupHeader(option.name)), /*#__PURE__*/React.createElement(Options, {
      options: option.items,
      snapshot: snapshot,
      optionProps: optionProps,
      className: className,
      renderOption: renderOption
    })));
  }

  return /*#__PURE__*/React.createElement(Option, _extends({
    key: option.value,
    className: className,
    optionProps: optionProps,
    selected: isSelected(option, snapshot.value),
    highlighted: snapshot.highlighted === option.index,
    renderOption: renderOption
  }, option));
}));

Options.propTypes = process.env.NODE_ENV !== "production" ? {
  options: PropTypes.arrayOf(optionType).isRequired,
  snapshot: PropTypes.shape({
    value: valueType,
    highlighted: PropTypes.number,
    focus: PropTypes.bool
  }).isRequired,
  optionProps: PropTypes.shape({
    tabIndex: PropTypes.string.isRequired,
    onMouseDown: PropTypes.func.isRequired
  }).isRequired,
  className: PropTypes.func.isRequired,
  renderOption: PropTypes.func.isRequired,
  renderGroupHeader: PropTypes.func.isRequired
} : {};
export default memo(Options);