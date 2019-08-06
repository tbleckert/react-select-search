import React from 'react';
import PropTypes from 'prop-types';

const Value = props => (
    <input
        className="select-search-box__search"
        {...props}
    />
);

Value.defaultProps = {
    placeholder: '',
    onChange: null,
    type: 'text',
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
};

export default Value;
