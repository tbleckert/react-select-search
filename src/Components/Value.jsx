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

    let className = theme.classes.value;

    if (searching) {
        className += ' is-searching';
    }

    const content = (typeof theme.renderers.value === 'function') ? theme.renderers.value(valueProps, ref, option, {
        searching,
        error,
    }) : (
        <input
            ref={ref}
            {...valueProps}
        />
    );

    return (
        <div className={className}>
            {content}
        </div>
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
    onBlur: PropTypes.func.isRequired,
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
