function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { memo } from 'react';
import PropTypes from 'prop-types';

var Value = function Value(_ref) {
  var search = _ref.search,
      disabled = _ref.disabled,
      valueProps = _ref.valueProps,
      className = _ref.className,
      displayValue = _ref.displayValue,
      placeholder = _ref.placeholder,
      autoFocus = _ref.autoFocus;
  return React.createElement("div", {
    className: className('value')
  }, search && React.createElement("input", _extends({}, valueProps, {
    value: displayValue,
    autoFocus: autoFocus,
    placeholder: placeholder,
    disabled: disabled,
    className: className('input')
  })), !search && React.createElement("button", _extends({}, valueProps, {
    disabled: disabled,
    className: className('input'),
    autoFocus: autoFocus
  }), displayValue));
};

Value.defaultProps = {
  disabled: false,
  search: false,
  autoFocus: false,
  autoComplete: 'on',
  placeholder: null
};
Value.propTypes = {
  className: PropTypes.func.isRequired,
  displayValue: PropTypes.string.isRequired,
  valueProps: PropTypes.shape({
    onBlur: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    tabIndex: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string
  }).isRequired,
  disabled: PropTypes.bool,
  search: PropTypes.bool,
  autoComplete: PropTypes.string,
  placeholder: PropTypes.string,
  autoFocus: PropTypes.bool
};
export default memo(Value);