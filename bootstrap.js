'use strict';

import React from 'react';
import ReactDom from 'react-dom';
import SelectSearch from './react-select-search';

var countryElement  = document.getElementById('countrySelect'),
    languageElement = document.getElementById('languageSelect'),
    friendsElement   = document.getElementById('friendsSelect'),
    languageOptions = [
        {name: 'Swedish', value: 'sv'},
        {name: 'English', value: 'en'},
        {name: 'Italian', value: 'it'}
    ],
    // https://randomuser.me/
    friends = [
        {name: 'Annie Cruz', value: 'annie.cruz', photo: 'https://randomuser.me/api/portraits/women/60.jpg'},
        {name: 'Eli Shelton', value: 'eli.shelton', photo: 'https://randomuser.me/api/portraits/men/7.jpg'},
        {name: 'Loretta Rogers', value: 'loretta.rogers', photo: 'https://randomuser.me/api/portraits/women/51.jpg'},
        {name: 'Lloyd Fisher', value: 'lloyd.fisher', photo: 'https://randomuser.me/api/portraits/men/34.jpg'},
        {name: 'Tiffany Gonzales', value: 'tiffany.gonzales', photo: 'https://randomuser.me/api/portraits/women/71.jpg'},
    ],
    /** https://gist.github.com/Keeguon/2310008 */
    countryOptions = require('./data/countries.json'), _optionsParent = null, _optionsParentHeight = null, _optionHeight = null;

/** Render selectbox */
ReactDom.render(
    <SelectSearch name="language" value="sv" options={languageOptions} search={false} placeholder="Choose language" />,
    languageElement
);

function onMount(value) {
    console.log('Mount', value);
}

function onChange(value, state, props) {
    console.log('Change', value);
}

function onHighlight(value, state, props) {
    console.log('Highlight', value);
}

function onBlur(value, state, props) {
    console.log('Blur', value);
}

function onFocus(value, state, props) {
    console.log('Focus', value);
}

ReactDom.render(
    <SelectSearch
        name="country"
        mode="input"
        options={countryOptions}
        onMount={onMount}
        onChange={onChange}
        onHighlight={onHighlight}
        onBlur={onBlur}
        onFocus={onFocus}
        placeholder="Your country" />,
    countryElement
);

function renderFriend(option) {
    let imgStyle = {
        borderRadius: '50%',
        verticalAlign: 'middle',
        marginRight: 10
    };

    return (<span><img style={imgStyle} width="40" height="40" src={option.photo} /><span>{option.name}</span></span>);
}

ReactDom.render(
    <SelectSearch name="friends" multiple={true} height={172} options={friends} placeholder="Search friends" renderOption={renderFriend} />,
    friendsElement
);