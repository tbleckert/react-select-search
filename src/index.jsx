import React, { memo, forwardRef } from 'react';
import onClickOutside from 'react-onclickoutside';
import SelectSearch from './SelectSearch';

const Component = onClickOutside(SelectSearch);

export default memo(forwardRef((props, ref) => <Component innerRef={ref} {...props} />));
