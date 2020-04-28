import React from 'react';
import PropTypes from 'prop-types';

const Option = ({
    optionProps,
    highlighted,
    selected,
    className,
    renderOption,
    ...option
}) => {
    const optionClass = [
        className('option'),
        (selected) ? className('is-selected') : false,
        (highlighted) ? className('is-highlighted') : false,
    ].filter(cls => !!cls).join(' ');

    const domProps = {
        ...optionProps,
        value: option.value,
        disabled: option.disabled,
    };

    const comp = (renderOption) ?
        renderOption(domProps, option, { selected, highlighted }, optionClass)
        : (
            <button
                className={optionClass}
                {...domProps}
            >
                {option.name}
            </button>
        );

    return (
        <li className={className('row')} role="menuitem" data-value={option.value} key={option.value}>
            {comp}
        </li>
    );
};

Option.defaultProps = {
    type: null,
    disabled: false,
    index: null,
    value: null,
    renderOption: null,
};

Option.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    type: PropTypes.string,
    disabled: PropTypes.bool,
    index: PropTypes.number,
    highlighted: PropTypes.bool.isRequired,
    selected: PropTypes.bool.isRequired,
    optionProps: PropTypes.shape({
        tabIndex: PropTypes.string.isRequired,
        onMouseDown: PropTypes.func.isRequired,
    }).isRequired,
    className: PropTypes.func.isRequired,
    renderOption: PropTypes.func,
};

export default Option;
