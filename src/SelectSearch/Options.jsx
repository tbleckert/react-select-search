import React from 'react';
import PropTypes from 'prop-types';
import Option from './Option';

const Group = props => (
    <li className="select-search-box__row" key={props.groupId}>
        <div className="select-search-box__group">
            <div className="select-search-box__group-header">{props.name}</div>
            <Options options={props.items} />
        </div>
    </li>
);

Group.propTypes = {
    groupId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const Options = ({ options }) => (
    <ul className="select-search-box__options">
        {options.map((option) => {
            if (option.type && option.type === 'group') {
                return <Group {...option} key={option.groupId} />;
            }

            return <Option {...option} key={option.value} />;
        })}
    </ul>
);

Options.propTypes = {
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Options;
