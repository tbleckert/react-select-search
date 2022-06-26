import { memo } from 'react';
import PropTypes from 'prop-types';
import Option from './Option';
import { optionType } from '../types';

function OptionsList({
    options,
    optionProps,
    snapshot,
    renderOption,
    renderGroupHeader,
    cls,
}) {
    return (
        <ul className={cls['options']}>
            {options.map((o) => (
                <Option
                    key={(o.type === 'group') ? o.groupId : o.value}
                    option={o}
                    optionProps={optionProps}
                    cls={cls}
                    renderOption={renderOption}
                    renderGroupHeader={renderGroupHeader}
                    snapshot={snapshot}
                />
            ))}
        </ul>
    );
}

OptionsList.defaultProps = {
    renderGroupHeader: null,
    renderOption: null,
};

OptionsList.propTypes = {
    options: PropTypes.arrayOf(optionType).isRequired,
    optionProps: PropTypes.shape({}).isRequired,
    snapshot: PropTypes.shape({
        highlighted: PropTypes.number.isRequired,
        option: PropTypes.oneOfType([optionType, PropTypes.arrayOf(optionType)]),
    }).isRequired,
    cls: PropTypes.object.isRequired,
    renderGroupHeader: PropTypes.func,
    renderOption: PropTypes.func,
};

export default memo(OptionsList);
