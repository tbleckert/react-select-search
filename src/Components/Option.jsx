import { memo } from 'react';
import PropTypes from 'prop-types';
import classes from '../lib/classes';
import OptionsList from './OptionsList';
import { optionType } from '../types';
import isSelected from '../lib/isSelected';

function Option({
    optionProps,
    option,
    cls,
    renderOption,
    renderGroupHeader,
    snapshot,
}) {
    if (option.type === 'group') {
        return (
            <li role="none" className={cls['row']}>
                <div className={cls['group']}>
                    <div className={cls['group-header']}>{(renderGroupHeader) ? renderGroupHeader(option.name) : option.name}</div>
                    <ul className={cls['options']}>
                        <OptionsList
                            optionProps={optionProps}
                            snapshot={snapshot}
                            options={option.items}
                            renderOption={renderOption}
                            renderGroupHeader={renderGroupHeader}
                            cls={cls}
                        />
                    </ul>
                </div>
            </li>
        );
    }

    const highlighted = snapshot.highlighted === option.index;
    const selected = isSelected(option, snapshot.option);
    const props = { ...optionProps, value: option.value, disabled: option.disabled, 'data-index': option.index };
    const className = classes({
        [cls['option']]: true,
        [cls['is-selected']]: selected,
        [cls['is-highlighted']]: highlighted,
    });

    return (
        <li className={cls['row']} role="menuitem">
            {renderOption && renderOption(props, option, { selected, highlighted }, className)}
            {!renderOption && <button type="button" className={className} {...props}>{option.name}</button>}
        </li>
    );
}

Option.defaultProps = {
    renderOption: null,
    renderGroupHeader: null,
};

Option.propTypes = {
    option: PropTypes.shape({
        name: PropTypes.string.isRequired,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        disabled: PropTypes.bool,
        index: PropTypes.number,
        type: PropTypes.string,
        items: PropTypes.arrayOf(optionType),
        groupId: PropTypes.string,
    }).isRequired,
    optionProps: PropTypes.shape({
        tabIndex: PropTypes.string.isRequired,
        onMouseDown: PropTypes.func.isRequired,
    }).isRequired,
    snapshot: PropTypes.shape({
        highlighted: PropTypes.number.isRequired,
        option: PropTypes.oneOfType([optionType, PropTypes.arrayOf(optionType)]),
    }).isRequired,
    cls: PropTypes.object.isRequired,
    renderOption: PropTypes.func,
    renderGroupHeader: PropTypes.func,
};

export default memo(Option);
