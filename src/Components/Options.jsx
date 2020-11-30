import React, {
    memo,
    useCallback,
    useEffect,
    useRef,
} from 'react';
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
    const selectRef = useRef(null);
    const renderEmptyMessage = useCallback(() => {
        if (emptyMessage === null) {
            return null;
        }

        const content = (typeof emptyMessage === 'function') ? emptyMessage() : emptyMessage;

        return <li className={cls('not-found')}>{content}</li>;
    }, [emptyMessage, cls]);
    const { focus, value, highlighted } = snapshot;

    useEffect(() => {
        const { current } = selectRef;

        if (!current || Array.isArray(value) || (highlighted < 0 && value === undefined)) {
            return;
        }

        const query = (highlighted > -1) ? `[data-index="${highlighted}"]` : `[data-value="${escape(value)}"]`;
        const selected = current.querySelector(query);

        if (selected) {
            const rect = current.getBoundingClientRect();
            const selectedRect = selected.getBoundingClientRect();

            current.scrollTop = selected.offsetTop - (rect.height / 2) + (selectedRect.height / 2);
        }
    }, [focus, value, highlighted, selectRef]);

    return (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div className={cls('select')} ref={selectRef} onMouseDown={(e) => e.preventDefault()}>
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
        </div>
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
        option: PropTypes.oneOfType([optionType, PropTypes.arrayOf(optionType)]),
        focus: PropTypes.bool.isRequired,
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
            PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
        ]),
    }).isRequired,
    renderOption: PropTypes.func,
    renderGroupHeader: PropTypes.func,
};

export default memo(Options);
