import React from 'react';

export const renderOption = (domProps, option, snapshot, className) => (
    <button className={className} {...domProps}>
        {option.name}
    </button>
);

export const renderValue = (valueProps, snapshot, className) => (
    <input
        {...valueProps}
        className={className}
    />
);

export const renderGroupHeader = name => name;
