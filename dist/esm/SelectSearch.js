function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { forwardRef, memo, createRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import useSelect from './useSelect';
import Value from './Components/Value';
import Options from './Components/Options';
import { optionType } from './types';
const SelectSearch = forwardRef(({
  value: defaultValue,
  disabled,
  placeholder,
  multiple,
  search,
  autoFocus,
  autoComplete,
  options: defaultOptions,
  onChange,
  printOptions,
  closeOnSelect,
  className,
  renderValue,
  renderOption,
  renderGroupHeader,
  getOptions,
  fuse
}, ref) => {
  const selectRef = createRef();
  const [snapshot, valueProps, optionProps] = useSelect({
    options: defaultOptions,
    value: defaultValue,
    multiple,
    disabled,
    fuse,
    search,
    onChange,
    getOptions,
    closeOnSelect,
    allowEmpty: !!placeholder
  });
  const classNameFn = typeof className === 'string' ? key => {
    if (key.indexOf('container') === 0) {
      return key.replace('container', 'select-search');
    }

    if (key.indexOf('is-') === 0 || key.indexOf('has-') === 0) {
      return key;
    }

    return "select-search__" + key;
  } : className;
  const wrapperClass = [classNameFn('container'), multiple ? classNameFn('container--multiple') : false, search ? classNameFn('container--search') : false, snapshot.searching ? classNameFn('is-loading') : false, snapshot.focus ? classNameFn('has-focus') : false].filter(cls => !!cls).join(' ');
  const value = (snapshot.focus || multiple) && search ? snapshot.search : snapshot.displayValue;
  useEffect(() => {
    let selected = null;

    if (snapshot.focus && selectRef.current && snapshot.highlighted > -1) {
      selected = selectRef.current.querySelector("[data-index=\"" + snapshot.highlighted + "\"]");
    } else if (snapshot.focus && selectRef.current && snapshot.value) {
      selected = selectRef.current.querySelector("[data-value=\"" + escape(snapshot.value.value) + "\"]");
    }

    if (selected) {
      const rect = selectRef.current.getBoundingClientRect();
      const selectedRect = selected.getBoundingClientRect();
      selectRef.current.scrollTop = selected.offsetTop - rect.height / 2 + selectedRect.height / 2;
    }
  }, [snapshot.focus, snapshot.value, snapshot.highlighted, selectRef]);
  let shouldRenderOptions = true;

  switch (printOptions) {
    case 'never':
      shouldRenderOptions = false;
      break;

    case 'always':
      shouldRenderOptions = true;
      break;

    case 'on-focus':
      shouldRenderOptions = snapshot.focus;
      break;

    default:
      shouldRenderOptions = !disabled && (snapshot.focus || multiple);
      break;
  }

  const valueComp = renderValue ? /*#__PURE__*/React.createElement("div", {
    className: classNameFn('value')
  }, renderValue(_objectSpread({}, valueProps, {
    placeholder: search ? placeholder : null,
    autoFocus: search ? autoFocus : null,
    autoComplete: search ? autoComplete : null,
    value: search ? value : null
  }), snapshot, classNameFn('input'))) : /*#__PURE__*/React.createElement(Value, {
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
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    className: wrapperClass
  }, (!multiple || search) && valueComp, shouldRenderOptions && /*#__PURE__*/React.createElement("div", {
    className: classNameFn('select'),
    ref: selectRef
  }, /*#__PURE__*/React.createElement(Options, {
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
  onChange: () => {},
  printOptions: 'auto',
  closeOnSelect: true,
  renderOption: null,
  renderGroupHeader: name => name,
  renderValue: null,
  fuse: {
    keys: ['name', 'groupName'],
    threshold: 0.3
  },
  getOptions: null
};
SelectSearch.propTypes = process.env.NODE_ENV !== "production" ? {
  options: PropTypes.arrayOf(optionType).isRequired,
  getOptions: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  multiple: PropTypes.bool,
  search: PropTypes.bool,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  autoComplete: PropTypes.oneOf(['on', 'off']),
  autoFocus: PropTypes.bool,
  onChange: PropTypes.func,
  printOptions: PropTypes.oneOf(['auto', 'always', 'never', 'on-focus']),
  closeOnSelect: PropTypes.bool,
  renderOption: PropTypes.func,
  renderGroupHeader: PropTypes.func,
  renderValue: PropTypes.func,
  fuse: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape({
    keys: PropTypes.arrayOf(PropTypes.string),
    threshold: PropTypes.number
  })])
} : {};
export default memo(SelectSearch);