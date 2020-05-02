import React, { useMemo, memo } from 'react';
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

    const comp = useMemo(() => {
        const domProps = {
            ...optionProps,
            value: option.value,
            disabled: option.disabled,
        };

        return (
            (renderOption) ?
                renderOption(domProps, option, { selected, highlighted }, optionClass)
                : (
                    <button className={optionClass} {...domProps}>
                        {option.name}
                    </button>
                )
        );
    }, [renderOption, option, selected, highlighted, optionClass]);

    return (
        <li className={className('row')} role="menuitem" data-index={option.index} data-value={escape(option.value)} key={option.value}>
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

export default memo(Option);
