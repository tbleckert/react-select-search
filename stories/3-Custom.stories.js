import React from 'react';
import SelectSearch from '../src';
import '../style.css';
import classes from '../style.module.css';
import { fontStacks, friends } from './data';

export default {
  title: 'Custom',
};

function renderFontValue(valueProps, snapshot, className) {
    const { option } = snapshot;
    const style = {
        fontFamily: (option && 'stack' in option) ? option.stack : null,
    };

    return (
        <input {...valueProps} className={className} style={style} value={snapshot.displayValue} />
    );
}

function renderFontOption(props, { stack, name }, snapshot, className) {
    return (
        <button {...props} className={className} type="button">
            <span style={{ fontFamily: stack }}>{name}</span>
        </button>
    );
}

function renderFriend(props, option, snapshot, className) {
    const imgStyle = {
        borderRadius: '50%',
        verticalAlign: 'middle',
        marginRight: 10,
    };

    return (
        <button {...props} className={className} type="button">
            <span><img alt="" style={imgStyle} width="32" height="32" src={option.photo} /><span>{option.name}</span></span>
        </button>
    );
}

export const FontExample = () => (
    <SelectSearch
        options={fontStacks}
        renderValue={renderFontValue}
        renderOption={renderFontOption}
        value="Monoton"
    />
);

export const AvatarExample = () => (
    <SelectSearch
        className="select-search select-search--multiple"
        options={friends}
        renderOption={renderFriend}
        multiple
        search
        placeholder="Search friends"
    />
);

export const CSSModules = () => (
    <SelectSearch
        className={(key) => classes[key]}
        multiple
        options={[
            { value: 'hamburger', name: 'Hamburger' },
            { value: 'fries', name: 'Fries' },
            { value: 'milkshake', name: 'Milkshake' },
        ]}
    />
);
