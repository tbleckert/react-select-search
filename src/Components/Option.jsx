import React, { useContext, memo } from 'react';
import PropTypes from 'prop-types';
import Context from '../Context';
import Group from './Group';

const Option = (props) => {
    const {
        type,
        groupId,
        highlighted,
        selected,
        name,
        optionProps,
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
    let className = theme.classes.option;

    if (highlighted) {
        className += ' is-highlighted';
    }

    if (selected) {
        className += ' is-selected';
    }

    return (
        <li {...optionProps} className={className}>
            {theme.renderers.option(props)}
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
};

export default memo(Option);
