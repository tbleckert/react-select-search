function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useMemo, memo } from 'react';
import PropTypes from 'prop-types';

const Option = (_ref) => {
  let {
    optionProps,
    highlighted,
    selected,
    className,
    renderOption
  } = _ref,
      option = _objectWithoutProperties(_ref, ["optionProps", "highlighted", "selected", "className", "renderOption"]);

  const optionClass = [className('option'), selected ? className('is-selected') : false, highlighted ? className('is-highlighted') : false].filter(cls => !!cls).join(' ');
  const comp = useMemo(() => {
    const domProps = _objectSpread({}, optionProps, {
      value: option.value,
      disabled: option.disabled
    });

    return renderOption ? renderOption(domProps, option, {
      selected,
      highlighted
    }, optionClass) : /*#__PURE__*/React.createElement("button", _extends({
      className: optionClass
    }, domProps), option.name);
  }, [renderOption, option, selected, highlighted, optionClass, optionProps]);
  return /*#__PURE__*/React.createElement("li", {
    className: className('row'),
    role: "menuitem",
    "data-index": option.index,
    "data-value": escape(option.value),
    key: option.value
  }, comp);
};

Option.defaultProps = {
  type: null,
  disabled: false,
  index: null,
  value: null,
  renderOption: null
};
Option.propTypes = process.env.NODE_ENV !== "production" ? {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  index: PropTypes.number,
  highlighted: PropTypes.bool.isRequired,
  selected: PropTypes.bool.isRequired,
  optionProps: PropTypes.shape({
    tabIndex: PropTypes.string.isRequired,
    onMouseDown: PropTypes.func.isRequired
  }).isRequired,
  className: PropTypes.func.isRequired,
  renderOption: PropTypes.func
} : {};
export default memo(Option);