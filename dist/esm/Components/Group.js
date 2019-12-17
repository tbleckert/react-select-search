import React, { useContext, memo } from 'react';
import PropTypes from 'prop-types';
import Context from '../Context';
import Options from './Options';

var Group = function Group(props) {
  var theme = useContext(Context);
  var className = "".concat(theme.classes.row, " ").concat(theme.classes.row, "--group");
  var render = theme.renderers.groupHeader;
  var onChange = props.onChange,
      snapshot = props.snapshot;
  var name = props.name;

  if (typeof render === 'function') {
    name = render(name);
  }

  return React.createElement("li", {
    className: className,
    role: "none",
    key: props.groupId
  }, React.createElement("div", {
    className: theme.classes.group
  }, React.createElement("div", {
    className: theme.classes.groupHeader
  }, name), React.createElement(Options, {
    options: props.items,
    onChange: onChange,
    snapshot: snapshot
  })));
};

Group.propTypes = {
  groupId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func.isRequired,
  snapshot: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    highlighted: PropTypes.number
  }).isRequired
};
export default memo(Group);