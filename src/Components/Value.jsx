import React, { forwardRef, useContext, memo } from 'react';
import PropTypes from 'prop-types';
import Context from '../Context';

const Value = forwardRef(({
    option,
    searching,
    error,
    ...valueProps
}, ref) => {
    const theme = useContext(Context);

    if (typeof theme.renderers.value === 'function') {
        return theme.renderers.value(valueProps, ref, option, {
            searching,
            error,
        });
    }

    let { className } = valueProps;

    if (searching) {
        className += ' is-searching';
    }

    return (
        <input
            ref={ref}
            {...valueProps}
            className={className}
        />
    );
});

Value.defaultProps = {
    placeholder: '',
    onChange: null,
    type: 'text',
    option: null,
    className: null,
};

Value.propTypes = {
    tabIndex: PropTypes.string.isRequired,
    onFocus: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    readOnly: PropTypes.bool.isRequired,
    value: PropTypes.string.isRequired,
    searching: PropTypes.bool.isRequired,
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.object, PropTypes.string]).isRequired,
    option: PropTypes.shape({
        value: PropTypes.string,
        name: PropTypes.string,
    }),
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    type: PropTypes.string,
    className: PropTypes.string,
};

export default memo(Value);
