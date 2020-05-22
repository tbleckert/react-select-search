import React, { memo } from 'react';
import PropTypes from 'prop-types';

const Option = ({
    optionProps,
    highlighted,
    selected,
    cls,
    renderOption,
    ...option
}) => {
    const optionClass = [
        cls('option'),
        (selected) ? cls('is-selected') : false,
        (highlighted) ? cls('is-highlighted') : false,
    ].filter((single) => !!single).join(' ');

    const domProps = {
        ...optionProps,
        value: option.value,
        disabled: option.disabled,
    };

    return (
        <li className={cls('row')} role="menuitem" data-index={option.index} data-value={escape(option.value)} key={option.value}>
            {renderOption(domProps, option, { selected, highlighted }, optionClass)}
        </li>
    );
};

Option.defaultProps = {
    disabled: false,
    index: null,
    value: null,
};

Option.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    disabled: PropTypes.bool,
    index: PropTypes.number,
    highlighted: PropTypes.bool.isRequired,
    selected: PropTypes.bool.isRequired,
    optionProps: PropTypes.shape({
        tabIndex: PropTypes.string.isRequired,
        onMouseDown: PropTypes.func.isRequired,
    }).isRequired,
    cls: PropTypes.func.isRequired,
    renderOption: PropTypes.func.isRequired,
};

export default memo(Option);
