import React, { useContext, memo } from 'react';
import PropTypes from 'prop-types';
import Context from '../Context';
import Options from './Options';

const Group = (props) => {
    const theme = useContext(Context);
    const className = `${theme.classes.row} ${theme.classes.row}--group`;
    const { groupHeader: render } = theme.renderers;
    const { onChange, snapshot } = props;
    let { name } = props;

    if (typeof render === 'function') {
        name = render(name);
    }

    return (
        <li className={className} role="none" key={props.groupId}>
            <div className={theme.classes.group}>
                <div className={theme.classes.groupHeader}>{name}</div>
                <Options
                    options={props.items}
                    onChange={onChange}
                    snapshot={snapshot}
                />
            </div>
        </li>
    );
};

Group.propTypes = {
    groupId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    onChange: PropTypes.func.isRequired,
    snapshot: PropTypes.shape({
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.arrayOf(PropTypes.string),
        ]),
        highlighted: PropTypes.number,
    }).isRequired
};

export default memo(Group);
