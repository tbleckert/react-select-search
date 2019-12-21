function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import PropTypes from 'prop-types';
import Option from './Option';
import { optionType, valueType } from '../types';
import isSelected from '../lib/isSelected';

var Options = function Options(_ref) {
  var options = _ref.options,
      optionProps = _ref.optionProps,
      snapshot = _ref.snapshot,
      className = _ref.className,
      renderGroupHeader = _ref.renderGroupHeader,
      renderOption = _ref.renderOption;
  return React.createElement("ul", {
    className: className('options')
  }, options.map(function (option) {
    if (option.type === 'group') {
      return React.createElement("li", {
        role: "none",
        className: className('row'),
        key: option.groupId
      }, React.createElement("div", {
        className: className('group')
      }, React.createElement("div", {
        className: className('group-header')
      }, renderGroupHeader(option.name)), React.createElement(Options, {
        options: option.items,
        snapshot: snapshot,
        optionProps: optionProps,
        className: className,
        renderOption: renderOption
      })));
    }

    return React.createElement(Option, _extends({
      key: option.value,
      className: className,
      optionProps: optionProps,
      active: isSelected(option.value, snapshot.value),
      highlighted: snapshot.highlighted === option.index,
      renderOption: renderOption
    }, option));
  }));
};

Options.defaultProps = {
  renderOption: null,
  renderGroupHeader: function renderGroupHeader(name) {
    return name;
  }
};
Options.propTypes = {
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
  renderOption: PropTypes.func,
  renderGroupHeader: PropTypes.func
};
export default Options;