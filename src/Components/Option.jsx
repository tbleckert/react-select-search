import React, { useContext, memo } from 'react';
import PropTypes from 'prop-types';
import Context from '../Context';
import Group from './Group';

const Option = (props) => {
    const {
        type,
        groupId,
        name,
        optionProps,
        option,
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

    const theme = useContext(Context);
    const { option: renderOption } = theme.renderers;
    const className = theme.classes.optionRow;

    if (typeof renderOption === 'function') {
        return (
            <li role="none" className={className}>
                {renderOption(optionProps, option)}
            </li>
        );
    }

    return (
        <li role="none" className={className}>
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
    items: [],
    optionProps: null,
    option: null,
};

Option.propTypes = {
    highlighted: PropTypes.bool,
    selected: PropTypes.bool,
    name: PropTypes.string.isRequired,
    optionProps: PropTypes.shape({
        'data-selected': PropTypes.string,
        role: PropTypes.string,
        onClick: PropTypes.func,
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
