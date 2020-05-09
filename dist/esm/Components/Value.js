function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { memo } from 'react';
import PropTypes from 'prop-types';

const Value = ({
  search,
  disabled,
  valueProps,
  className,
  displayValue,
  placeholder,
  autoFocus
}) => /*#__PURE__*/React.createElement("div", {
  className: className('value')
}, search && /*#__PURE__*/React.createElement("input", _extends({}, valueProps, {
  value: displayValue,
  autoFocus: autoFocus,
  placeholder: placeholder,
  disabled: disabled,
  className: className('input')
})), !search && /*#__PURE__*/React.createElement("input", _extends({}, valueProps, {
  disabled: disabled,
  className: className('input'),
  autoFocus: autoFocus,
  value: displayValue,
  placeholder: placeholder
})));

Value.defaultProps = {
  disabled: false,
  search: false,
  autoFocus: false,
  autoComplete: 'on',
  placeholder: null,
  displayValue: null
};
Value.propTypes = process.env.NODE_ENV !== "production" ? {
  className: PropTypes.func.isRequired,
  displayValue: PropTypes.string,
  valueProps: PropTypes.shape({
    onBlur: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    tabIndex: PropTypes.string,
    onChange: PropTypes.func
  }).isRequired,
  disabled: PropTypes.bool,
  search: PropTypes.bool,
  autoComplete: PropTypes.string,
  placeholder: PropTypes.string,
  autoFocus: PropTypes.bool
} : {};
export default memo(Value);