import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import Context from '../Context';
import Group from './Group';

class Option extends React.PureComponent {
    constructor(props) {
        super(props);

        this.ref = createRef();
    }

    componentDidUpdate(prevProps) {
        const prevSnap = prevProps.snapshot;
        const prevFocus = prevSnap.focus;
        const { snapshot, value, index } = this.props;
        const { focus, highlighted } = snapshot;
        const scrollConf = { behavior: 'auto', block: 'center' };

        setImmediate(() => {
            if (focus) {
                const selected = (
                    (Array.isArray(snapshot.value) && snapshot.value.indexOf(value) >= 0)
                    || value === snapshot.value
                );

                const isHighlighted = index === highlighted;
                const prevIsHighlighted = index === prevSnap.highlighted;

                if (
                    (isHighlighted && isHighlighted !== prevIsHighlighted)
                    || (selected && focus !== prevFocus)
                ) {
                    this.ref.current.scrollIntoView(scrollConf);
                }
            }
        });
    }

    render() {
        if (this.props.type === 'group') {
            return <Group {...this.props} />;
        }

        const {
            name,
            value,
            index,
            disabled,
            onChange,
            snapshot,
        } = this.props;

        const optionClass = [this.context.classes.option];
        const { option: renderOption } = this.context.renderers;
        const highlighted = index === snapshot.highlighted;
        const selected = (
            (Array.isArray(snapshot.value) && snapshot.value.indexOf(value) >= 0)
            || value === snapshot.value
        );

        if (selected) {
            optionClass.push('is-selected');
        }

        if (highlighted) {
            optionClass.push('is-highlighted');
        }

        if (disabled) {
            optionClass.push('is-disabled');
        }

        const optionSnapshot = { highlighted, selected };
        const optionProps = {
            disabled,
            value,
            className: optionClass.join(' '),
            onMouseDown: onChange,
            tabIndex: -1,
            role: 'menuitem',
            'data-selected': (selected) ? 'true' : null,
            'data-highlighted': (highlighted) ? 'true' : null,
            key: value,
        };

        const content = (typeof renderOption === 'function') ?
            renderOption(optionProps, this.props, optionSnapshot) :
            (
                <button {...optionProps} type="button">
                    {name}
                </button>
            );

        return (
            <li ref={this.ref} key={value} role="presentation" className={this.context.classes.row}>
                {content}
            </li>
        );
    }
}

Option.contextType = Context;

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

export default Option;
