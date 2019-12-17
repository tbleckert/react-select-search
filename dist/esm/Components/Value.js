function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { forwardRef, useContext, memo } from 'react';
import PropTypes from 'prop-types';
import Context from '../Context';
var Value = forwardRef(function (_ref, ref) {
  var option = _ref.option,
      searching = _ref.searching,
      error = _ref.error,
      valueProps = _objectWithoutProperties(_ref, ["option", "searching", "error"]);

  var theme = useContext(Context);

  var onChange = valueProps.onChange,
      props = _objectWithoutProperties(valueProps, ["onChange"]);

  var onInput = function onInput(e) {
    return onChange(e.target.value);
  };

  var className = theme.classes.value;

  if (searching) {
    className += ' is-searching';
  }

  var content = typeof theme.renderers.value === 'function' ? theme.renderers.value(valueProps, ref, option, {
    searching: searching,
    error: error
  }) : React.createElement("input", _extends({
    ref: ref,
    onChange: onInput
  }, props));
  return React.createElement("div", {
    className: className
  }, content);
});
Value.defaultProps = {
  placeholder: '',
  onChange: null,
  type: 'text',
  option: null,
  className: null
};
Value.propTypes = {
  tabIndex: PropTypes.string.isRequired,
  onFocus: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  readOnly: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  searching: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.object, PropTypes.string]).isRequired,
  option: PropTypes.shape({
    value: PropTypes.string,
    name: PropTypes.string
  }),
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  type: PropTypes.string,
  className: PropTypes.string
};
export default memo(Value);