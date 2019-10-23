function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useContext, memo } from 'react';
import PropTypes from 'prop-types';
import Context from '../Context';
import Group from './Group';

var Option = function Option(props) {
  var type = props.type,
      groupId = props.groupId,
      highlighted = props.highlighted,
      selected = props.selected,
      name = props.name,
      optionProps = props.optionProps;

  if (type && type === 'group') {
    return React.createElement(Group, _extends({}, props, {
      name: name,
      key: groupId
    }));
  }

  var theme = useContext(Context);
  var className = theme.classes.option;

  if (highlighted) {
    className += ' is-highlighted';
  }

  if (selected) {
    className += ' is-selected';
  }

  return React.createElement("li", _extends({}, optionProps, {
    className: className
  }), theme.renderers.option(props));
};

Option.defaultProps = {
  groupId: null,
  type: null,
  selected: false,
  highlighted: false,
  items: [],
  optionProps: null
};
Option.propTypes = {
  highlighted: PropTypes.bool,
  selected: PropTypes.bool,
  name: PropTypes.string.isRequired,
  optionProps: PropTypes.shape({
    'data-selected': PropTypes.string,
    role: PropTypes.string,
    onClick: PropTypes.func
  }),
  items: PropTypes.arrayOf(PropTypes.object),
  groupId: PropTypes.string,
  type: PropTypes.string
};
export default memo(Option);