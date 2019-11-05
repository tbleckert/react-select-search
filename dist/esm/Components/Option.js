function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useContext, memo, useEffect, createRef } from 'react';
import PropTypes from 'prop-types';
import Context from '../Context';
import Group from './Group';

var Option = function Option(props) {
  var type = props.type,
      name = props.name,
      value = props.value,
      index = props.index,
      disabled = props.disabled,
      onChange = props.onChange,
      snapshot = props.snapshot;

  if (type && type === 'group') {
    return React.createElement(Group, props);
  }

  var ref = createRef();
  var theme = useContext(Context);
  var highlighted = index === snapshot.highlighted;
  var selected = Array.isArray(snapshot.value) && snapshot.value.indexOf(value) >= 0 || value === snapshot.value;
  var scrollConf = {
    behavior: 'auto',
    block: 'center'
  };

  if (!theme.multiple) {
    useEffect(function () {
      if (!selected) return;
      ref.current.scrollIntoView(scrollConf);
    }, [selected, snapshot.focus]);
  }

  useEffect(function () {
    if (!highlighted) return;
    ref.current.scrollIntoView(scrollConf);
  }, [highlighted]);
  var optionClass = [theme.classes.option];

  if (selected) {
    optionClass.push('is-selected');
  }

  if (highlighted) {
    optionClass.push('is-highlighted');
  }

  var renderOption = theme.renderers.option;
  var optionSnapshot = {
    highlighted: highlighted,
    selected: selected
  };
  var optionProps = {
    disabled: disabled,
    value: value,
    className: optionClass.join(' '),
    onClick: onChange,
    tabIndex: -1,
    role: 'menuitem',
    'data-selected': selected ? 'true' : null,
    'data-highlighted': highlighted ? 'true' : null,
    key: value
  };
  var className = theme.classes.row;

  if (disabled) {
    className += ' is-disabled';
  }

  if (typeof renderOption === 'function') {
    return React.createElement("li", {
      ref: ref,
      key: value,
      role: "presentation",
      className: className
    }, renderOption(optionProps, props, optionSnapshot));
  }

  return React.createElement("li", {
    ref: ref,
    key: value,
    role: "presentation",
    className: className
  }, React.createElement("button", _extends({}, optionProps, {
    type: "button"
  }), name));
};

Option.defaultProps = {
  type: null,
  groupId: null,
  disabled: false,
  index: null,
  value: null,
  items: null
};
Option.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  type: PropTypes.string,
  groupId: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object),
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  index: PropTypes.number,
  snapshot: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    highlighted: PropTypes.number,
    focus: PropTypes.bool
  }).isRequired
};
export default memo(Option);