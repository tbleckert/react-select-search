import React, { forwardRef, useContext, memo } from 'react';
import PropTypes from 'prop-types';
import Context from '../Context';

const Value = forwardRef(({
    state,
    option,
    ...valueProps
}, ref) => {
    const theme = useContext(Context);

    if (typeof theme.renderers.value === 'function') {
        return theme.renderers.value(valueProps, ref, option, state);
    }

    return (
        <input
            ref={ref}
            {...valueProps}
        />
    );
});

Value.defaultProps = {
    placeholder: '',
    onChange: null,
    type: 'text',
    option: null,
};

Value.propTypes = {
    tabIndex: PropTypes.string.isRequired,
    onFocus: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    readOnly: PropTypes.bool.isRequired,
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    type: PropTypes.string,
    option: PropTypes.shape({
        value: PropTypes.string,
        name: PropTypes.string,
    }),
    // eslint-disable-next-line react/forbid-prop-types
    state: PropTypes.object.isRequired,
};

export default memo(Value);
