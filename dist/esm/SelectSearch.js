function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import React, { useEffect, forwardRef, useMemo, memo, useRef } from 'react';
import PropTypes from 'prop-types';
import useSelect from './useSelect';
import useSearch from './useSearch';
import Value from './Components/Value';
import Options from './Components/Options';
import { optionType, valueType } from './types';
var SelectSearch = forwardRef(function (_ref, ref) {
  var defaultValue = _ref.value,
      disabled = _ref.disabled,
      placeholder = _ref.placeholder,
      multiple = _ref.multiple,
      search = _ref.search,
      autoFocus = _ref.autoFocus,
      autoComplete = _ref.autoComplete,
      defaultOptions = _ref.options,
      onChange = _ref.onChange,
      className = _ref.className,
      renderValue = _ref.renderValue,
      renderOption = _ref.renderOption,
      renderGroupHeader = _ref.renderGroupHeader;

  var _ref2 = search ? useSearch(defaultOptions) : [null, defaultOptions],
      _ref3 = _slicedToArray(_ref2, 2),
      searchProps = _ref3[0],
      options = _ref3[1];

  var _useSelect = useSelect({
    options: options,
    value: defaultValue,
    multiple: multiple,
    disabled: disabled
  }, searchProps),
      _useSelect2 = _slicedToArray(_useSelect, 3),
      snapshot = _useSelect2[0],
      valueProps = _useSelect2[1],
      optionProps = _useSelect2[2];

  var prevValue = useRef(snapshot.value);
  var classNameFn = useMemo(function () {
    return typeof className === 'string' ? function (key) {
      if (key === 'container') {
        return 'select-search';
      }

      if (key.indexOf('is-') === 0) {
        return key;
      }

      return "select-search__".concat(key);
    } : className;
  }, [className]);
  useEffect(function () {
    if (prevValue.current !== snapshot.value) {
      onChange(snapshot.value);
      prevValue.current = snapshot.value;
    }
  }, [onChange, snapshot.value]);
  var displayValue = snapshot.displayValue;

  if (!placeholder && !displayValue && defaultOptions.length) {
    displayValue = defaultOptions[0].name;
  }

  var wrapperClass = classNameFn('container');

  if (multiple) {
    wrapperClass += " ".concat(wrapperClass, "--multiple");
  }

  if (search) {
    wrapperClass += " ".concat(wrapperClass, "--search");
  }

  var value = displayValue;

  if ((snapshot.focus || multiple) && search) {
    value = searchProps.value;
  }

  var valueComp = renderValue ? React.createElement("div", {
    className: classNameFn('value')
  }, renderValue(_objectSpread({}, valueProps, {
    placeholder: search ? placeholder : null,
    autoFocus: search ? autoFocus : null,
    autoComplete: search ? autoComplete : null,
    value: search ? value : null
  }), snapshot, classNameFn('input'))) : React.createElement(Value, {
    snapshot: snapshot,
    disabled: disabled,
    search: search,
    autoFocus: autoFocus,
    displayValue: value,
    className: classNameFn,
    valueProps: valueProps,
    autoComplete: autoComplete,
    placeholder: placeholder,
    multiple: multiple,
    render: renderValue
  });
  return React.createElement("div", {
    ref: ref,
    className: wrapperClass
  }, (!multiple || search) && valueComp, !disabled && (snapshot.focus || multiple) && React.createElement("div", {
    className: classNameFn('select')
  }, React.createElement(Options, {
    options: snapshot.options,
    snapshot: snapshot,
    optionProps: optionProps,
    className: classNameFn,
    renderOption: renderOption,
    renderGroupHeader: renderGroupHeader
  })));
});
SelectSearch.defaultProps = {
  className: 'select-search',
  disabled: false,
  search: false,
  multiple: false,
  placeholder: null,
  autoFocus: false,
  autoComplete: 'on',
  value: '',
  onChange: function onChange() {},
  renderOption: null,
  renderGroupHeader: function renderGroupHeader(name) {
    return name;
  },
  renderValue: null
};
SelectSearch.propTypes = {
  options: PropTypes.arrayOf(optionType).isRequired,
  value: valueType,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  multiple: PropTypes.bool,
  search: PropTypes.bool,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  autoComplete: PropTypes.oneOf(['on', 'off']),
  autoFocus: PropTypes.bool,
  onChange: PropTypes.func,
  renderOption: PropTypes.func,
  renderGroupHeader: PropTypes.func,
  renderValue: PropTypes.func
};
export default memo(SelectSearch);