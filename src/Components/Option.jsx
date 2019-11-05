import React, { useContext, memo, useEffect, createRef } from 'react';
import PropTypes from 'prop-types';
import Context from '../Context';
import Group from './Group';

const Option = (props) => {
    const {
        type,
        groupId,
        name,
        optionProps,
        highlighted,
        selected,
        option,
        disabled,
        focus,
    } = props;

    if (type && type === 'group') {
        return (
            <Group
                {...props}
                name={name}
                key={groupId}
            />
        );
    }

    const ref = createRef();
    const theme = useContext(Context);
    const scrollConf = {
        behavior: 'auto',
        block: 'center',
    };

    if (!theme.multiple) {
        useEffect(() => {
            if (!selected) return;
            ref.current.scrollIntoView(scrollConf);
        }, [selected, focus]);
    }

    useEffect(() => {
        if (!highlighted) return;
        ref.current.scrollIntoView(scrollConf);
    }, [highlighted]);

    const { option: renderOption } = theme.renderers;
    let className = theme.classes.row;
    const optionSnapshot = { highlighted, selected };

    if (disabled) {
        className += ' is-disabled';
    }

    if (typeof renderOption === 'function') {
        return (
            <li ref={ref} role="presentation" className={className}>
                {renderOption(optionProps, option, optionSnapshot)}
            </li>
        );
    }

    return (
        <li ref={ref} role="presentation" className={className}>
            <button {...optionProps} type="button">
                {name}
            </button>
        </li>
    );
};

Option.defaultProps = {
    groupId: null,
    type: null,
    selected: false,
    highlighted: false,
    disabled: false,
    items: [],
    optionProps: null,
    option: null,
};

Option.propTypes = {
    highlighted: PropTypes.bool,
    selected: PropTypes.bool,
    disabled: PropTypes.bool,
    name: PropTypes.string.isRequired,
    optionProps: PropTypes.shape({
        'data-selected': PropTypes.string,
        role: PropTypes.string,
        onClick: PropTypes.func,
        className: PropTypes.string,
        disabled: PropTypes.bool,
    }),
    items: PropTypes.arrayOf(PropTypes.object),
    groupId: PropTypes.string,
    type: PropTypes.string,
    option: PropTypes.shape({
        name: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
    }),
};

export default memo(Option);
