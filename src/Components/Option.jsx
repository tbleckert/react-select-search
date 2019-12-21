import React, { useMemo, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const Option = ({
    optionProps,
    highlighted,
    active,
    className,
    renderOption,
    ...option
}) => {
    const optionRef = useRef(null);
    const optionClass = [
        className('option'),
        useMemo(() => {
            if (active) {
                return 'is-selected';
            }

            return false;
        }, [active]),
        useMemo(() => {
            if (highlighted) {
                return 'is-highlighted';
            }

            return false;
        }, [highlighted]),
    ].filter(cls => !!cls).join(' ');

    useEffect(() => {
        if (optionRef.current && (active || highlighted)) {
            optionRef.current.scrollIntoView({ behavior: 'auto', block: 'center' });
        }
    }, [optionRef, active, highlighted]);

    const domProps = {
        ...optionProps,
        value: option.value,
        disabled: option.disabled,
    };

    const comp = (renderOption) ?
        renderOption(domProps, option, { active, highlighted }, optionClass)
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
    active: PropTypes.bool.isRequired,
    optionProps: PropTypes.shape({
        tabIndex: PropTypes.string.isRequired,
        onMouseDown: PropTypes.func.isRequired,
    }).isRequired,
    className: PropTypes.func.isRequired,
    renderOption: PropTypes.func,
};

export default Option;
