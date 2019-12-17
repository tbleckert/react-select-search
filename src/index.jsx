import React, { memo, forwardRef } from 'react';
import SelectSearch from './SelectSearch';

export default memo(forwardRef((props, ref) => <SelectSearch innerRef={ref} {...props} />));
