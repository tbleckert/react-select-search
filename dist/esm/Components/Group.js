import React, { useContext, memo } from 'react';
import PropTypes from 'prop-types';
import Context from '../Context';
import Options from './Options';

var Group = function Group(props) {
  var theme = useContext(Context);
  var name = theme.renderers.groupHeader(props.name);
  return React.createElement("li", {
    className: theme.classes.row,
    key: props.groupId
  }, React.createElement("div", {
    className: theme.classes.group
  }, React.createElement("div", {
    className: theme.classes.groupHeader
  }, name), React.createElement(Options, {
    options: props.items
  })));
};

Group.propTypes = {
  groupId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired
};
export default memo(Group);