import React from 'react';
import Option from './Option';
import isSelected from '../lib/isSelected';

function Options(props) {
    const {
        options,
        cls,
        renderOption,
        renderGroupHeader,
        optionProps,
        snapshot,
        disabled,
    } = props;

    return (
        <ul className={cls('options')}>
            {options.map((o) => {
                if (o.type === 'group') {
                    return (
                        <li role="none" className={cls('row')} key={o.name}>
                            <div className={cls('group')}>
                                <div className={cls('group-header')}>
                                    {renderGroupHeader
                                        ? renderGroupHeader(o.name)
                                        : o.name}
                                </div>
                                <Options {...props} options={o.items} />
                            </div>
                        </li>
                    );
                }

                return (
                    <Option
                        key={o.value}
                        option={o}
                        optionProps={optionProps}
                        cls={cls}
                        renderOption={renderOption}
                        selected={isSelected(o, snapshot.option)}
                        highlighted={snapshot.highlighted === o.index}
                        disabled={o.disabled || disabled}
                    />
                );
            })}
        </ul>
    );
}

export default Options;
