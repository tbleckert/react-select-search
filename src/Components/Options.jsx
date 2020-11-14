import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import Option from './Option';
import isSelected from '../lib/isSelected';
import { optionType } from '../types';

const Options = ({
    options,
    emptyMessage,
    cls,
    optionProps,
    renderOption,
    renderGroupHeader,
    snapshot,
}) => {
    const renderEmptyMessage = useCallback(() => {
        if (emptyMessage === null) {
            return null;
        }

        const content = (typeof emptyMessage === 'function') ? emptyMessage() : emptyMessage;

        return <li className={cls('not-found')}>{content}</li>;
    }, [emptyMessage, cls]);

    return (
        <ul className={cls('options')}>
            {options.length > 0 ? (
                options.map((option) => {
                    const isGroup = option.type === 'group';
                    const items = (isGroup) ? option.items : [option];
                    const base = { cls, optionProps, renderOption };
                    const rendered = items.map((o) => (
                        <Option
                            key={o.value}
                            selected={isSelected(o, snapshot.option)}
                            highlighted={snapshot.highlighted === o.index}
                            {...base}
                            {...o}
                        />
                    ));

                    if (isGroup) {
                        return (
                            <li role="none" className={cls('row')} key={option.groupId}>
                                <div className={cls('group')}>
                                    <div className={cls('group-header')}>{renderGroupHeader(option.name)}</div>
                                    <ul className={cls('options')}>
                                        {rendered}
                                    </ul>
                                </div>
                            </li>
                        );
                    }

                    return rendered;
                })
            ) : (renderEmptyMessage() || null)}
        </ul>
    );
};

Options.defaultProps = {
    emptyMessage: null,
    renderOption: undefined,
    renderGroupHeader: (name) => name,
};

Options.propTypes = {
    options: PropTypes.arrayOf(optionType).isRequired,
    cls: PropTypes.func.isRequired,
    emptyMessage: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
    ]),
    optionProps: PropTypes.shape({
        tabIndex: PropTypes.string.isRequired,
        onMouseDown: PropTypes.func.isRequired,
    }).isRequired,
    snapshot: PropTypes.shape({
        highlighted: PropTypes.number.isRequired,
        option: optionType,
    }).isRequired,
    renderOption: PropTypes.func,
    renderGroupHeader: PropTypes.func,
};

export default memo(Options);
