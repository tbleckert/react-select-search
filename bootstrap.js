import React from 'react';
import { render } from 'react-dom';
import SelectSearch from './react-select-search';

const countryElement  = document.getElementById('countrySelect');
const fontElement = document.getElementById('fontSelect');
const friendsElement   = document.getElementById('friendsSelect');
const fontStacks = [
    {name: 'Roboto', value: 'Roboto', 'data-stack': 'Roboto, sans-serif'},
    {name: 'Playfair Display', value: 'Playfair Display', 'data-stack': '"Playfair Display", serif'},
    {name: 'Monoton', value: 'Monoton', 'data-stack': 'Monoton, cursive'},
    {name: 'Gloria Hallelujah', value: 'Gloria Hallelujah', 'data-stack': '"Gloria Hallelujah", cursive'},
    {name: 'VT323', value: 'VT323', 'data-stack': 'VT323, monospace'}
];
// https://randomuser.me/
const friends = [
    {name: 'Annie Cruz', value: 'annie.cruz', photo: 'https://randomuser.me/api/portraits/women/60.jpg'},
    {name: 'Eli Shelton', value: 'eli.shelton', photo: 'https://randomuser.me/api/portraits/men/7.jpg'},
    {name: 'Loretta Rogers', value: 'loretta.rogers', photo: 'https://randomuser.me/api/portraits/women/51.jpg'},
    {name: 'Lloyd Fisher', value: 'lloyd.fisher', photo: 'https://randomuser.me/api/portraits/men/34.jpg'},
    {name: 'Tiffany Gonzales', value: 'tiffany.gonzales', photo: 'https://randomuser.me/api/portraits/women/71.jpg'},
];
/** https://gist.github.com/Keeguon/2310008 */
const countryOptions = require('./data/countries');

let fontStack;

/** Render selectbox */
render(
    <SelectSearch name="font" value="Playfair Display" renderOption={renderFontOption} onChange={onSelectChange} onBlur={onBlur} onMount={onBlur} options={fontStacks} search={false} placeholder="Choose font" />,
    fontElement
);

function getSearchElement(props) {
    let outElement = document.querySelector('[name="' + props.name + '"]');

    if (!outElement) {
        return null;
    }

    return outElement.nextSibling;
}

function setFontStackOnSearch(value, props) {
    let search = getSearchElement(props);

    if (search) {
        search.style.fontFamily = value['data-stack'];
    }
}

function clearFontStackOnSearch(value, props) {
    let search = getSearchElement(props);

    if (search) {
        search.style.fontFamily = '';
    }
}

function onChange(value, state, props) {
    fontStack = option['data-stack'];
    this.refs.search.style.fontFamily = fontStack;
}

function onBlur(value, state, props) {
    setFontStackOnSearch(value, props);
}

function renderFontOption (option) {
    let style = {
        fontFamily: option['data-stack']
    };

    return <span style={style}>{option.name}</span>;
}

function onSelectChange(value, state, props) {
    let outElement = document.querySelector('[name="' + props.name + '"]');

    if (outElement) {
        if ('createEvent' in document) {
            const event = document.createEvent('HTMLEvents');
            event.initEvent('change', true, true);
            outElement.dispatchEvent(event);
        } else {
            outElement.fireEvent('onchange');
        }
    }

    if (value.hasOwnProperty('data-stack')) {
        setFontStackOnSearch(value, props);
    }
}

render(
    <SelectSearch
        name="country"
        mode="input"
        value="SE"
        options={countryOptions}
        placeholder="Your country" />,
    countryElement
);

function renderFriend(option) {
    const imgStyle = {
        borderRadius: '50%',
        verticalAlign: 'middle',
        marginRight: 10
    };

    return (<span><img style={imgStyle} width="40" height="40" src={option.photo} /><span>{option.name}</span></span>);
}

render(
    <SelectSearch name="friends" multiple={true} height={172} options={friends} placeholder="Search friends" renderOption={renderFriend} />,
    friendsElement
);
