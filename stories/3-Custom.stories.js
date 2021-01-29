import { useState } from 'react';
import SelectSearch, { fuzzySearch } from '../src';
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
        filterOptions={fuzzySearch}
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

const button = {
    marginLeft: '16px',
    display: 'inline-flex',
    position: 'relative',
    alignItems: 'center',
    height: '37px',
    padding: '0 16px',
    borderRadius: '3px',
    border: 'none',
    background: 'rgb(49, 173, 122)',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
    outline: 'none',
};

export const ControllableDisplay = () => {
    const [displayOptions, setDisplayOptions] = useState(false);

    return (
        <div style={{ display: 'flex' }}>
            <SelectSearch
                printOptions={(displayOptions) ? 'always' : 'never'}
                options={[
                    { value: 'hamburger', name: 'Hamburger' },
                    { value: 'fries', name: 'Fries' },
                    { value: 'milkshake', name: 'Milkshake' },
                ]}
            />
            <button type="button" style={button} onClick={() => setDisplayOptions(!displayOptions)}>
                {!displayOptions ? 'Display options' : 'Hide options'}
            </button>
        </div>
    );
};
