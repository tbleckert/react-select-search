import { memo } from 'react';
import PropTypes from 'prop-types';
import Option from './Option';
import isSelected from '../lib/isSelected';
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
        <ul className={cls('options')}>
            {options.map((o) => {
                if (o.type === 'group') {
                    return (
                        <li role="none" className={cls('row')} key={o.groupId}>
                            <div className={cls('group')}>
                                <div className={cls('group-header')}>{(renderGroupHeader) ? renderGroupHeader(o.name) : o.name}</div>
                                <ul className={cls('options')}>
                                    <OptionsList
                                        optionProps={optionProps}
                                        snapshot={snapshot}
                                        options={o.items}
                                        renderOption={renderOption}
                                        renderGroupHeader={renderGroupHeader}
                                        cls={cls}
                                    />
                                </ul>
                            </div>
                        </li>
                    );
                }

                return (
                    <Option
                        key={o.value}
                        selected={isSelected(o, snapshot.option)}
                        highlighted={snapshot.highlighted === o.index}
                        option={o}
                        optionProps={optionProps}
                        cls={cls}
                        renderOption={renderOption}
                    />
                );
            })}
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
    cls: PropTypes.func.isRequired,
    renderGroupHeader: PropTypes.func,
    renderOption: PropTypes.func,
};

export default memo(OptionsList);
