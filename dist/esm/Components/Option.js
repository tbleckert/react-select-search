function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useContext, memo } from 'react';
import PropTypes from 'prop-types';
import Context from '../Context';
import Group from './Group';

var Option = function Option(props) {
  var type = props.type,
      groupId = props.groupId,
      name = props.name,
      optionProps = props.optionProps,
      highlighted = props.highlighted,
      selected = props.selected,
      option = props.option;

  if (type && type === 'group') {
    return React.createElement(Group, _extends({}, props, {
      name: name,
      key: groupId
    }));
  }

  var theme = useContext(Context);
  var renderOption = theme.renderers.option;
  var className = theme.classes.row;
  var optionSnapshot = {
    highlighted: highlighted,
    selected: selected
  };

  if (typeof renderOption === 'function') {
    return React.createElement("li", {
      role: "presentation",
      className: className
    }, renderOption(optionProps, option, optionSnapshot));
  }

  return React.createElement("li", {
    role: "presentation",
    className: className
  }, React.createElement("button", _extends({}, optionProps, {
    type: "button"
  }), name));
};

Option.defaultProps = {
  groupId: null,
  type: null,
  selected: false,
  highlighted: false,
  items: [],
  optionProps: null,
  option: null,
  onChange: null
};
Option.propTypes = {
  highlighted: PropTypes.bool,
  selected: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  optionProps: PropTypes.shape({
    'data-selected': PropTypes.string,
    role: PropTypes.string,
    onClick: PropTypes.func,
    className: PropTypes.string,
    disabled: PropTypes.bool
  }),
  items: PropTypes.arrayOf(PropTypes.object),
  groupId: PropTypes.string,
  type: PropTypes.string,
  option: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
  })
};
export default memo(Option);