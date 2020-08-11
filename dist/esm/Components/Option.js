function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { memo } from 'react';
import PropTypes from 'prop-types';

const Option = (_ref) => {
  let {
    optionProps,
    highlighted,
    selected,
    cls,
    renderOption
  } = _ref,
      option = _objectWithoutProperties(_ref, ["optionProps", "highlighted", "selected", "cls", "renderOption"]);

  const optionClass = [cls('option'), selected ? cls('is-selected') : false, highlighted ? cls('is-highlighted') : false].filter(single => !!single).join(' ');

  const domProps = _objectSpread(_objectSpread({}, optionProps), {}, {
    value: option._id,
    disabled: option.disabled
  });

  return /*#__PURE__*/React.createElement("li", {
    className: cls('row'),
    role: "menuitem",
    "data-index": option.index,
    "data-value": escape(option.value),
    key: option.value
  }, renderOption(domProps, option, {
    selected,
    highlighted
  }, optionClass));
};

Option.defaultProps = {
  disabled: false,
  index: null,
  value: null
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
  renderOption: PropTypes.func.isRequired
} : {};
export default memo(Option);