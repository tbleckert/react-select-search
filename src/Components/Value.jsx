import React, { memo } from 'react';
import PropTypes from 'prop-types';

const Value = ({
    search,
    disabled,
    valueProps,
    className,
    displayValue,
    placeholder,
    autoFocus,
}) => (
    <div className={className('value')}>
        {search && (
            <input {...valueProps} value={displayValue} autoFocus={autoFocus} placeholder={placeholder} disabled={disabled} className={className('input')} />
        )}
        {!search && (
            <input
                {...valueProps}
                disabled={disabled}
                className={className('input')}
                autoFocus={autoFocus}
                value={displayValue}
                placeholder={placeholder}
            />
        )}
    </div>
);

Value.defaultProps = {
    disabled: false,
    search: false,
    autoFocus: false,
    autoComplete: 'on',
    placeholder: null,
};

Value.propTypes = {
    className: PropTypes.func.isRequired,
    displayValue: PropTypes.string.isRequired,
    valueProps: PropTypes.shape({
        onBlur: PropTypes.func.isRequired,
        onFocus: PropTypes.func.isRequired,
        tabIndex: PropTypes.string,
        onChange: PropTypes.func,
    }).isRequired,
    disabled: PropTypes.bool,
    search: PropTypes.bool,
    autoComplete: PropTypes.string,
    placeholder: PropTypes.string,
    autoFocus: PropTypes.bool,
};

export default memo(Value);
