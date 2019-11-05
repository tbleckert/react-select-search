import React, { useContext, memo, useEffect, createRef } from 'react';
import PropTypes from 'prop-types';
import Context from '../Context';
import Group from './Group';

const Option = (props) => {
    const {
        type,
        name,
        value,
        index,
        disabled,
        onChange,
        snapshot,
    } = props;

    if (type && type === 'group') {
        return (
            <Group {...props} />
        );
    }

    const ref = createRef();
    const theme = useContext(Context);
    const highlighted = index === snapshot.highlighted;
    const selected = (
        (Array.isArray(snapshot.value) && snapshot.value.indexOf(value) >= 0)
        || value === snapshot.value
    );

    const scrollConf = {
        behavior: 'auto',
        block: 'center',
    };

    if (!theme.multiple) {
        useEffect(() => {
            if (!selected) return;
            ref.current.scrollIntoView(scrollConf);
        }, [selected, snapshot.focus]);
    }

    useEffect(() => {
        if (!highlighted) return;
        ref.current.scrollIntoView(scrollConf);
    }, [highlighted]);

    const optionClass = [theme.classes.option];

    if (selected) {
        optionClass.push('is-selected');
    }

    if (highlighted) {
        optionClass.push('is-highlighted');
    }

    const { option: renderOption } = theme.renderers;
    const optionSnapshot = { highlighted, selected };
    const optionProps = {
        disabled,
        value,
        className: optionClass.join(' '),
        onClick: onChange,
        tabIndex: -1,
        role: 'menuitem',
        'data-selected': (selected) ? 'true' : null,
        'data-highlighted': (highlighted) ? 'true' : null,
        key: value,
    };

    let className = theme.classes.row;

    if (disabled) {
        className += ' is-disabled';
    }

    if (typeof renderOption === 'function') {
        return (
            <li ref={ref} key={value} role="presentation" className={className}>
                {renderOption(optionProps, props, optionSnapshot)}
            </li>
        );
    }

    return (
        <li ref={ref} key={value} role="presentation" className={className}>
            <button {...optionProps} type="button">
                {name}
            </button>
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
};

Option.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    type: PropTypes.string,
    groupId: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.object),
    disabled: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    index: PropTypes.number,
    snapshot: PropTypes.shape({
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.arrayOf(PropTypes.string),
        ]),
        highlighted: PropTypes.number,
        focus: PropTypes.bool,
    }).isRequired,
};

export default memo(Option);
