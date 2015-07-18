/**
 * @jsx React.DOM
 */

'use strict';

var React           = require('react'),
    SelectSearch    = require('./react-select-search'),
    countryElement  = document.getElementById('countrySelect'),
    languageElement = document.getElementById('languageSelect'),
    fontElement     = document.getElementById('fontSelect'),
    skillsElement   = document.getElementById('skillsSelect'),
    fontOptions     = [
    	{name: 'Helvetica', value: 'helvetica', stack: "'Helvetica Neue',HelveticaNeue,Helvetica,Arial,sans-serif"},
    	{name: 'Courier', value: 'courier', stack: "'Courier New',Courier,'Lucida Sans Typewriter','Lucida Typewriter',monospace"},
    	{name: 'Tahoma', value: 'tahoma', stack: "Tahoma,Verdana,Segoe,sans-serif"},
    	{name: 'Impact', value: 'impact', stack: "Impact,Haettenschweiler,'Arial Narrow Bold',sans-serif"},
    	{name: 'Futura', value: 'futura', stack: "Futura,'Trebuchet MS',Arial,sans-serif"}
    ],
    languageOptions = [
    	{name: 'Swedish', value: 'sv'},
    	{name: 'English', value: 'en'}
    ],
    skillsOptions = [
    	{name: 'JavaScript', value: 'js'},
    	{name: 'HTML', value: 'html'},
    	{name: 'CSS', value: 'css'},
    	{name: 'PHP', value: 'php'},
    	{name: 'Python', value: 'python'}
    ],
    /** https://gist.github.com/Keeguon/2310008 */
    countryOptions = require('./data/countries.json'), _optionsParent = null, _optionsParentHeight = null, _optionHeight = null;

/** React debug */
window.react = React;

/** Render selectbox */
React.render(
	<SelectSearch name="country" options={countryOptions} value="SE" placeholder="Choose country" />,
	countryElement
);

React.render(
	<SelectSearch name="language" value="sv" options={languageOptions} search={false} placeholder="Choose language" />,
	languageElement
);

var fontStack = '';

function renderOption(option) {
	return '<span style="font-family: ' + option.stack + ';">' + option.name + '</span>';
}

function valueChanged(option) {
	fontStack = option.stack;
	this.refs.search.getDOMNode().style.fontFamily = fontStack;
}

function onFocus() {
	this.refs.search.getDOMNode().style.fontFamily = '';
}

function onBlur(option) {
	this.refs.search.getDOMNode().style.fontFamily = fontStack;
}

React.render(
	<SelectSearch name="font" options={fontOptions} renderOption={renderOption} valueChanged={valueChanged} onBlur={onBlur} onFocus={onFocus} placeholder="Choose font" />,
	fontElement
);

React.render(
	<SelectSearch name="skills" multiple={true} height={172} options={skillsOptions} placeholder="Choose skills" />,
	skillsElement
);
