function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { memo } from 'react';
import PropTypes from 'prop-types';

const Value = ({
  search,
  placeholder,
  multiple,
  snapshot,
  cls,
  autoFocus,
  autoComplete,
  renderValue,
  valueProps
}) => {
  const inputValue = snapshot.focus && search ? snapshot.search : snapshot.displayValue;
  const shouldRender = !multiple || placeholder || search;

  if (!shouldRender) {
    return null;
  }

  return /*#__PURE__*/React.createElement("div", {
    className: cls('value')
  }, renderValue(_objectSpread(_objectSpread({}, valueProps), {}, {
    placeholder,
    autoFocus,
    autoComplete,
    value: inputValue
  }), snapshot, cls('input')));
};

Value.defaultProps = {
  placeholder: null,
  renderValue: (valueProps, snapshot, className) => /*#__PURE__*/React.createElement("input", _extends({}, valueProps, {
    className: className
  }))
};
Value.propTypes = process.env.NODE_ENV !== "production" ? {
  search: PropTypes.bool.isRequired,
  multiple: PropTypes.bool.isRequired,
  autoFocus: PropTypes.bool.isRequired,
  autoComplete: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  valueProps: PropTypes.shape({
    tabIndex: PropTypes.string,
    readOnly: PropTypes.bool,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onKeyPress: PropTypes.func,
    onKeyDown: PropTypes.func,
    onKeyUp: PropTypes.func,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    ref: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({
      current: PropTypes.instanceOf(Element)
    })])
  }).isRequired,
  snapshot: PropTypes.shape({
    focus: PropTypes.bool.isRequired,
    search: PropTypes.string.isRequired,
    displayValue: PropTypes.string.isRequired
  }).isRequired,
  cls: PropTypes.func.isRequired,
  renderValue: PropTypes.func
} : {};
export default /*#__PURE__*/memo(Value);