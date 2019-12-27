import React, { useMemo, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const Option = ({
    optionProps,
    highlighted,
    selected,
    className,
    renderOption,
    ...option
}) => {
    const optionRef = useRef(null);
    const optionClass = [
        className('option'),
        useMemo(() => {
            if (selected) {
                return 'is-selected';
            }

            return false;
        }, [selected]),
        useMemo(() => {
            if (highlighted) {
                return 'is-highlighted';
            }

            return false;
        }, [highlighted]),
    ].filter(cls => !!cls).join(' ');

    useEffect(() => {
        if (optionRef.current && (selected || highlighted)) {
            optionRef.current.scrollIntoView({ behavior: 'auto', block: 'center' });
        }
    }, [optionRef, selected, highlighted]);

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
        <li ref={optionRef} className={className('row')} role="menuitem" key={option.value}>
            {comp}
        </li>
    );
};

Option.defaultProps = {
    type: null,
    groupId: null,
    disabled: false,
    index: null,
    value: null,
    items: null,
    renderOption: null,
};

Option.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    type: PropTypes.string,
    groupId: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.object),
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
