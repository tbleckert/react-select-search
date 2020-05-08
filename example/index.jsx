import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import { fontStacks, countries, friends as friendsOptions } from './data';
import '../style.css';
import SelectSearch from '../src';

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

function renderFontValue(valueProps, snapshot, className) {
    const { value } = snapshot;
    const style = {
        fontFamily: (value && 'stack' in value) ? value.stack : null,
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

const App = () => {
    const [fontOptions, setFontOptions] = useState([]);
    const [font, setFont] = useState('Monoton');
    const [country, setCountry] = useState('SE');
    const [friends, setFriends] = useState([]);
    const [drink, setDrink] = useState('');
    const [disabled, setDisabled] = useState(false);
    const text = (disabled) ? 'Enable' : 'Disable';
    const clear = () => {
        setFont('');
        setCountry('');
        setFriends([]);
        setDrink('');
    };

    useEffect(() => {
        setTimeout(() => setFontOptions(fontStacks), 250);
    }, []);

    return (
        <div>
            <div className="test-btns">
                <button type="button" className="clear" onClick={clear}>Clear values</button>
                <button type="button" className="clear" onClick={() => setDisabled(!disabled)}>{text}</button>
            </div>
            <SelectSearch
                options={fontOptions}
                value={font}
                onChange={setFont}
                renderValue={renderFontValue}
                renderOption={renderFontOption}
                disabled={disabled}
            />
            <SelectSearch
                value={country}
                options={countries}
                onChange={setCountry}
                placeholder="Your country"
                search
                disabled={disabled}
            />
            <SelectSearch
                multiple
                className="select-search-box select-search-box--friends"
                value={friends}
                onChange={setFriends}
                options={friendsOptions}
                placeholder="Search friends"
                renderOption={renderFriend}
                disabled={disabled}
                search
            />
            <SelectSearch
                options={[]}
                getOptions={(query) => {
                    return new Promise((resolve, reject) => {
                        fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`)
                            .then(response => response.json())
                            .then(({ drinks }) => {
                                resolve(drinks.map(({ idDrink, strDrink }) => ({ value: idDrink, name: strDrink })))
                            })
                            .catch(reject);
                    });
                }}
                placeholder="Your favorite drink"
                onChange={setDrink}
                value={drink}
                search
                disabled={disabled}
            />
        </div>
    );
};

render(
    <App />,
    document.getElementById('app'),
);
