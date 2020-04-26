function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

var Option = function Option(_ref) {
  var optionProps = _ref.optionProps,
      highlighted = _ref.highlighted,
      selected = _ref.selected,
      className = _ref.className,
      renderOption = _ref.renderOption,
      option = _objectWithoutProperties(_ref, ["optionProps", "highlighted", "selected", "className", "renderOption"]);

  var optionRef = useRef(null);
  var optionClass = [className('option'), selected ? className('is-selected') : false, highlighted ? className('is-highlighted') : false].filter(function (cls) {
    return !!cls;
  }).join(' ');
  useEffect(function () {
    if (optionRef.current && (selected || highlighted)) {
      optionRef.current.scrollIntoView({
        behavior: 'auto',
        block: 'center'
      });
    }
  }, [optionRef, selected, highlighted]);

  var domProps = _objectSpread({}, optionProps, {
    value: option.value,
    disabled: option.disabled
  });

  var comp = renderOption ? renderOption(domProps, option, {
    selected: selected,
    highlighted: highlighted
  }, optionClass) : React.createElement("button", _extends({
    className: optionClass
  }, domProps), option.name);
  return React.createElement("li", {
    ref: optionRef,
    className: className('row'),
    role: "menuitem",
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
Option.propTypes = {
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
};
export default Option;