import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { memo } from 'react';
import PropTypes from 'prop-types';
import classes from '../lib/classes';

const Option = ({
  optionProps,
  highlighted,
  selected,
  option,
  cls,
  renderOption
}) => {
  const props = _extends({}, optionProps, {
    value: option.value,
    disabled: option.disabled
  });

  const className = classes({
    [cls('option')]: true,
    [cls('is-selected')]: selected,
    [cls('is-highlighted')]: highlighted
  });
  return /*#__PURE__*/_jsxs("li", {
    className: cls('row'),
    role: "menuitem",
    "data-index": option.index,
    "data-value": escape(option.value),
    children: [renderOption && renderOption(props, option, {
      selected,
      highlighted
    }, className), !renderOption && /*#__PURE__*/_jsx("button", _extends({
      type: "button",
      className: className
    }, props, {
      children: option.name
    }))]
  }, option.value);
};

Option.defaultProps = {
  renderOption: null
};
Option.propTypes = process.env.NODE_ENV !== "production" ? {
  option: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    disabled: PropTypes.bool,
    index: PropTypes.number
  }).isRequired,
  highlighted: PropTypes.bool.isRequired,
  selected: PropTypes.bool.isRequired,
  optionProps: PropTypes.shape({
    tabIndex: PropTypes.string.isRequired,
    onMouseDown: PropTypes.func.isRequired
  }).isRequired,
  cls: PropTypes.func.isRequired,
  renderOption: PropTypes.func
} : {};
export default /*#__PURE__*/memo(Option);