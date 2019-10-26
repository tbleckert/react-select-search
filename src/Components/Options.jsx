import React, { useContext, memo } from 'react';
import PropTypes from 'prop-types';
import Option from './Option';
import Context from '../Context';

const Options = ({ options }) => {
    const classes = useContext(Context);

    return (
        <ul className={classes.options} role="menu">
            {options.map((option) => {
                const key = (option.type === 'group') ? option.groupId : option.value;

                return (
                    <Option {...option} key={key} />
                );
            })}
        </ul>
    );
};

Options.propTypes = {
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default memo(Options);
