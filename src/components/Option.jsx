import React from 'react';

function Option({
    optionProps,
    highlighted,
    selected,
    option,
    cls,
    renderOption,
    disabled,
}) {
    const props = {
        ...optionProps,
        value: encodeURIComponent(option.value),
        disabled,
    };
    const className = cls({
        option: true,
        'is-selected': selected,
        'is-highlighted': highlighted,
    });

    return (
        <li className={cls('row')} role="menuitem" data-index={option.index}>
            {renderOption &&
                renderOption(
                    props,
                    option,
                    { selected, highlighted },
                    className,
                )}
            {!renderOption && (
                <button type="button" className={className} {...props}>
                    {option.name}
                </button>
            )}
        </li>
    );
}

export default Option;
