import React from 'react';
import PropTypes from 'prop-types';
import Option from './Option';
import { optionType, valueType } from '../types';
import isSelected from '../lib/isSelected';

const Options = ({
    options,
    optionProps,
    snapshot,
    className,
    renderGroupHeader,
    renderOption,
}) => (
    <ul className={className('options')}>
        {options.map((option) => {
            if (option.type === 'group') {
                return (
                    <li role="none" className={className('row')} key={option.groupId}>
                        <div className={className('group')}>
                            <div className={className('group-header')}>{renderGroupHeader(option.name)}</div>
                            <Options
                                options={option.items}
                                snapshot={snapshot}
                                optionProps={optionProps}
                                className={className}
                                renderOption={renderOption}
                            />
                        </div>
                    </li>
                );
            }

            return (
                <Option
                    key={option.value}
                    className={className}
                    optionProps={optionProps}
                    selected={isSelected(option, snapshot.value)}
                    highlighted={snapshot.highlighted === option.index}
                    renderOption={renderOption}
                    {...option}
                />
            );
        })}
    </ul>
);

Options.defaultProps = {
    renderOption: null,
    renderGroupHeader: name => name,
};

Options.propTypes = {
    options: PropTypes.arrayOf(optionType).isRequired,
    snapshot: PropTypes.shape({
        value: valueType,
        highlighted: PropTypes.number,
        focus: PropTypes.bool,
    }).isRequired,
    optionProps: PropTypes.shape({
        tabIndex: PropTypes.string.isRequired,
        onMouseDown: PropTypes.func.isRequired,
    }).isRequired,
    className: PropTypes.func.isRequired,
    renderOption: PropTypes.func,
    renderGroupHeader: PropTypes.func,
};

export default Options;
