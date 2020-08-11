function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { forwardRef, memo, createRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import useSelect from './useSelect';
import { optionType } from './types';
import Option from './Components/Option';
import isSelected from './lib/isSelected';
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
    closable: !multiple || printOptions === 'on-focus',
    allowEmpty: !!placeholder
  });
  const {
    focus,
    highlighted,
    value,
    options,
    searching,
    displayValue,
    search: searchValue
  } = snapshot;
  const cls = useCallback(key => {
    if (typeof className === 'function') {
      return className(key);
    }

    if (key.indexOf('container') === 0) {
      return key.replace('container', className);
    }

    if (key.indexOf('is-') === 0 || key.indexOf('has-') === 0) {
      return key;
    }

    return className.split(' ')[0] + "__" + key;
  }, [className]);
  const wrapperClass = [cls('container'), disabled ? cls('is-disabled') : false, searching ? cls('is-loading') : false, focus ? cls('has-focus') : false].filter(single => !!single).join(' ');
  const inputValue = focus && search ? searchValue : displayValue;
  useEffect(() => {
    const {
      current
    } = selectRef;

    if (!current) {
      return;
    }

    let query = null;

    if (highlighted > -1) {
      query = "[data-index=\"" + highlighted + "\"]";
    } else if (value && !multiple) {
      query = "[data-value=\"" + escape(value.value) + "\"]";
    }

    const selected = current.querySelector(query);

    if (selected) {
      const rect = current.getBoundingClientRect();
      const selectedRect = selected.getBoundingClientRect();
      current.scrollTop = selected.offsetTop - rect.height / 2 + selectedRect.height / 2;
    }
  }, [focus, value, highlighted, selectRef, multiple]);
  let shouldRenderOptions;

  switch (printOptions) {
    case 'never':
      shouldRenderOptions = false;
      break;

    case 'always':
      shouldRenderOptions = true;
      break;

    case 'on-focus':
      shouldRenderOptions = focus;
      break;

    default:
      shouldRenderOptions = !disabled && (focus || multiple);
      break;
  }

  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    className: wrapperClass
  }, (!multiple || placeholder || search) && /*#__PURE__*/React.createElement("div", {
    className: cls('value')
  }, renderValue(_objectSpread(_objectSpread({}, valueProps), {}, {
    placeholder,
    autoFocus,
    autoComplete,
    value: inputValue
  }), snapshot, cls('input'))), shouldRenderOptions && /*#__PURE__*/React.createElement("div", {
    className: cls('select'),
    ref: selectRef
  }, /*#__PURE__*/React.createElement("ul", {
    className: cls('options')
  }, options.map(option => {
    const isGroup = option.type === 'group';
    const items = isGroup ? option.items : [option];
    const base = {
      cls,
      optionProps,
      renderOption
    };
    const rendered = items.map(o => /*#__PURE__*/React.createElement(Option, _extends({
      key: o.value,
      selected: isSelected(o, value),
      highlighted: highlighted === o.index
    }, base, o)));

    if (isGroup) {
      return /*#__PURE__*/React.createElement("li", {
        role: "none",
        className: cls('row'),
        key: option.groupId
      }, /*#__PURE__*/React.createElement("div", {
        className: cls('group')
      }, /*#__PURE__*/React.createElement("div", {
        className: cls('group-header')
      }, renderGroupHeader(option.name)), /*#__PURE__*/React.createElement("ul", {
        className: cls('options')
      }, rendered)));
    }

    return rendered;
  }))));
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
  renderOption: (domProps, option, snapshot, className) =>
  /*#__PURE__*/
  // eslint-disable-next-line react/button-has-type
  React.createElement("button", _extends({
    className: className
  }, domProps), option.name),
  renderGroupHeader: name => name,
  renderValue: (valueProps, snapshot, className) => /*#__PURE__*/React.createElement("input", _extends({}, valueProps, {
    className: className
  })),
  fuse: {
    keys: ['name', 'groupName'],
    threshold: 0.3
  },
  getOptions: null
};
SelectSearch.propTypes = process.env.NODE_ENV !== "production" ? {
  options: PropTypes.arrayOf(optionType).isRequired,
  getOptions: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))]),
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  multiple: PropTypes.bool,
  search: PropTypes.bool,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  autoComplete: PropTypes.string,
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