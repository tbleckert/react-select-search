import React from 'react';
import PropTypes from 'prop-types';

const Option = (props) => {
    let className = 'select-search-box__option';

    if (props.highlighted) {
        className += ' is-highlighted';
    }

    if (props.selected) {
        className += ' is-selected';
    }

    return (
        <li {...props.optionProps} className={className}>
            {props.name}
        </li>
    );
};

Option.propTypes = {
    name: PropTypes.string.isRequired,
    highlighted: PropTypes.bool.isRequired,
    selected: PropTypes.bool.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    optionProps: PropTypes.object.isRequired,
};

export default Option;
