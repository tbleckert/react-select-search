import { jsx as _jsx } from "react/jsx-runtime";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import { memo } from 'react';
import PropTypes from 'prop-types';

const Option = (_ref) => {
  let {
    optionProps,
    highlighted,
    selected,
    cls,
    renderOption
  } = _ref,
      option = _objectWithoutPropertiesLoose(_ref, ["optionProps", "highlighted", "selected", "cls", "renderOption"]);

  const optionClass = [cls('option'), selected ? cls('is-selected') : false, highlighted ? cls('is-highlighted') : false].filter(single => !!single).join(' ');

  const domProps = _extends({}, optionProps, {
    value: option.value,
    disabled: option.disabled
  });

  return /*#__PURE__*/_jsx("li", {
    className: cls('row'),
    role: "menuitem",
    "data-index": option.index,
    "data-value": escape(option.value),
    children: renderOption(domProps, option, {
      selected,
      highlighted
    }, optionClass)
  }, option.value);
};

Option.defaultProps = {
  disabled: false,
  index: null,
  value: null,
  renderOption: (domProps, option, snapshot, className) =>
  /*#__PURE__*/
  // eslint-disable-next-line react/button-has-type
  _jsx("button", _extends({
    className: className
  }, domProps, {
    children: option.name
  }))
};
Option.propTypes = process.env.NODE_ENV !== "production" ? {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  index: PropTypes.number,
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