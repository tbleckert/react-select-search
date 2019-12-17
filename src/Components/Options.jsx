import React, { useContext, memo } from 'react';
import PropTypes from 'prop-types';
import Option from './Option';
import Context from '../Context';

const Options = ({ options, snapshot, onChange }) => {
    const theme = useContext(Context);

    return (
        <ul className={theme.classes.options} role="menu">
            {options.map((option) => {
                const key = (option.type === 'group') ? option.groupId : option.value;

                return (
                    <Option {...option} snapshot={snapshot} onChange={onChange} key={key} />
                );
            })}
        </ul>
    );
};

Options.propTypes = {
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
    onChange: PropTypes.func.isRequired,
    snapshot: PropTypes.shape({
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.arrayOf(PropTypes.string),
        ]),
        highlighted: PropTypes.number,
    }).isRequired,
};

export default memo(Options);
