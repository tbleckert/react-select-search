import { memo } from 'react';
import PropTypes from 'prop-types';
import classes from '../lib/classes';

const Option = ({
    optionProps,
    highlighted,
    selected,
    option,
    cls,
    renderOption,
}) => {
    const props = { ...optionProps, value: option.value, disabled: option.disabled };
    const className = classes({
        [cls('option')]: true,
        [cls('is-selected')]: selected,
        [cls('is-highlighted')]: highlighted,
    });

    return (
        <li className={cls('row')} role="menuitem" data-index={option.index} data-value={escape(option.value)} key={option.value}>
            {renderOption && renderOption(props, option, { selected, highlighted }, className)}
            {!renderOption && <button type="button" className={className} {...props}>{option.name}</button>}
        </li>
    );
};

Option.defaultProps = {
    renderOption: null,
};

Option.propTypes = {
    option: PropTypes.shape({
        name: PropTypes.string.isRequired,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        disabled: PropTypes.bool,
        index: PropTypes.number,
    }).isRequired,
    highlighted: PropTypes.bool.isRequired,
    selected: PropTypes.bool.isRequired,
    optionProps: PropTypes.shape({
        tabIndex: PropTypes.string.isRequired,
        onMouseDown: PropTypes.func.isRequired,
    }).isRequired,
    cls: PropTypes.func.isRequired,
    renderOption: PropTypes.func,
};

export default memo(Option);
