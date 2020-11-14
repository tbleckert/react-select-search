import React, { memo } from 'react';
import PropTypes from 'prop-types';

const Value = ({
    search,
    placeholder,
    multiple,
    snapshot,
    cls,
    autoFocus,
    autoComplete,
    renderValue,
    valueProps,
}) => {
    const inputValue = (snapshot.focus && search) ? snapshot.search : snapshot.displayValue;
    const shouldRender = (!multiple || placeholder) || search;

    if (!shouldRender) {
        return null;
    }

    return (
        <div className={cls('value')}>
            {renderValue(
                {
                    ...valueProps,
                    placeholder,
                    autoFocus,
                    autoComplete,
                    value: inputValue,
                },
                snapshot,
                cls('input'),
            )}
        </div>
    );
};

Value.defaultProps = {
    placeholder: null,
    renderValue: (valueProps, snapshot, className) => (
        <input
            {...valueProps}
            className={className}
        />
    ),
};

Value.propTypes = {
    search: PropTypes.bool.isRequired,
    multiple: PropTypes.bool.isRequired,
    autoFocus: PropTypes.bool.isRequired,
    autoComplete: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    valueProps: PropTypes.shape({
        tabIndex: PropTypes.string,
        readOnly: PropTypes.bool,
        onFocus: PropTypes.func,
        onBlur: PropTypes.func,
        onKeyPress: PropTypes.func,
        onKeyDown: PropTypes.func,
        onKeyUp: PropTypes.func,
        onChange: PropTypes.func,
        disabled: PropTypes.bool,
        ref: PropTypes.oneOfType([
            PropTypes.func,
            PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
        ]),
    }).isRequired,
    snapshot: PropTypes.shape({
        focus: PropTypes.bool.isRequired,
        search: PropTypes.string.isRequired,
        displayValue: PropTypes.string.isRequired,
    }).isRequired,
    cls: PropTypes.func.isRequired,
    renderValue: PropTypes.func,
};

export default memo(Value);
