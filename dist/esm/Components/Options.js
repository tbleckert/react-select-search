function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useContext, memo } from 'react';
import PropTypes from 'prop-types';
import Option from './Option';
import Context from '../Context';

var Options = function Options(_ref) {
  var options = _ref.options;
  var theme = useContext(Context);
  return React.createElement("ul", {
    className: theme.classes.options,
    role: "menu"
  }, options.map(function (option) {
    var key = option.type === 'group' ? option.groupId : option.value;
    return React.createElement(Option, _extends({}, option, {
      key: key
    }));
  }));
};

Options.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object).isRequired
};
export default memo(Options);