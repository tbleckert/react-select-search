import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { memo, useContext } from 'react';
import PropTypes from 'prop-types';
import Context from '../Context';

const Value = ({
  search,
  placeholder,
  multiple,
  snapshot,
  autoFocus,
  autoComplete,
  valueProps
}) => {
  const {
    cls,
    renderValue
  } = useContext(Context);
  const inputValue = snapshot.focus && search ? snapshot.search : snapshot.displayValue;
  const shouldRender = !multiple || placeholder || search;

  if (!shouldRender) {
    return null;
  }

  const props = _extends({}, valueProps, {
    placeholder,
    autoFocus,
    autoComplete,
    value: inputValue
  });

  return /*#__PURE__*/_jsxs("div", {
    className: cls('value'),
    children: [renderValue && renderValue(props, snapshot, cls('input')), !renderValue && /*#__PURE__*/_jsx("input", _extends({}, props, {
      className: cls('input')
    }))]
  });
};

Value.defaultProps = {
  placeholder: null
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
  }).isRequired
} : {};
export default /*#__PURE__*/memo(Value);