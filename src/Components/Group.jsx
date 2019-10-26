import React, { useContext, memo } from 'react';
import PropTypes from 'prop-types';
import Context from '../Context';
import Options from './Options';

const Group = (props) => {
    const theme = useContext(Context);
    const name = theme.renderers.groupHeader(props.name);

    return (
        <li className={theme.classes.row} role="none" key={props.groupId}>
            <div className={theme.classes.group}>
                <div className={theme.classes.groupHeader}>{name}</div>
                <Options
                    options={props.items}
                />
            </div>
        </li>
    );
};

Group.propTypes = {
    groupId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default memo(Group);
