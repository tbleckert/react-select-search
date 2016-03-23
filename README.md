# React Select Search

![](https://travis-ci.org/tbleckert/react-select-search.svg?branch=master) ![](https://img.shields.io/badge/license-MIT-blue.svg) ![](https://img.shields.io/npm/v/react-select-search.svg) ![](https://img.shields.io/npm/dm/react-select-search.svg)

React powered selectbox with filter using [fuse.js](https://github.com/krisk/Fuse) (Javascript fuzzy-search).

_Example design comes from the [beautiful work](https://dribbble.com/shots/1079035-Select-Album?list=searches&tag=select&offset=20) by [Rovane Durso](https://dribbble.com/RovaneDurso)._

![](https://dl.dropboxusercontent.com/u/6306766/react-select-search.png)

## Note!
This version support __React 0.14__.  
A React 0.12.* supported version can be found in 0.2.* (and below) tagged releases

## Demo

Live demo can be found here: [http://tbleckert.github.io/react-select-search/](http://tbleckert.github.io/react-select-search/)

## How to use

Install it with npm (`npm install react-select-search --save`) and import it like you normally would.

```javascript
import SelectSearch from 'react-select-search'

/**
 * The options array should contain objects.
 * Required keys are "name" and "value" but you can have and use any number of key/value pairs.
 */
const options = [
    {name: 'Swedish', value: 'sv'},
    {name: 'English', value: 'en'}
];

/* Simple example */
<SelectSearch options={options} value="sv" name="language" placeholder="Choose your language" />
```

Below is a full list of properties and defaults (displayed in React style).

```javascript
{
    options        : React.PropTypes.array.isRequired,
    className      : React.PropTypes.string.isRequired,
    search         : React.PropTypes.bool.isRequired,
    placeholder    : React.PropTypes.string,
    multiple       : React.PropTypes.bool.isRequired,
    height         : React.PropTypes.number,
    name           : React.PropTypes.string,
    fuse           : React.PropTypes.object.isRequired,
    valueChanged   : React.PropTypes.func.isRequired,
    optionSelected : React.PropTypes.func.isRequired,
    onMount        : React.PropTypes.func.isRequired,
    onBlur         : React.PropTypes.func.isRequired,
    onFocus        : React.PropTypes.func.isRequired,
    renderOption   : React.PropTypes.func.isRequired,
    mode           : React.PropTypes.string.isRequired,
    value          : React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.array
    ])
}

{
    options        : [],
    className      : 'select-search-box',
    search         : true,
    value          : null,
    placeholder    : null,
    multiple       : false,
    height         : 200,
    name           : null,
    mode           : 'select',
    valueChanged   : function () {},
    optionSelected : function () {},
    onMount        : function () {},
    onBlur         : function () {},
    onFocus        : function () {},
    onChange       : function () {},
    renderOption   : function (option) {
        return option.name;
    },
    fuse: {
        keys      : ['name'],
        threshold : 0.3
    }
}
```

The height property is the minimum height (max is the remaining space below the selectbox down to the browser window end) of the dropdown if multiple is false, otherwise it's the fixed height. 

For examples you can take a look at the [bootstrap.js](https://github.com/tbleckert/react-select-search/blob/gh-pages/bootstrap.js) file on the gh-pages branch.

You will also need some CSS to make it look right. The important piece is the options.

```css
/** The option list should not be visible by default */
.select-search-box__select {
	display: none;
}

	/** If it's a multiple select, you can style it with this selector */
	.select-search-box--multiple .select-search-box__select {
		display: block;
	}
	
	/** The list receives the modifier class "display" when the select has focus */
	.select-search-box__select--display {
		display: block;
	}

	/**
	 * The option list hides when the selectbox loses focus.
	 * To prevent the list from dissapearing before the option click event
	 * we use a timer that hides it after 200ms.
	 * To make it look like it dissapears right away
	 * you can use this class and set opacity to 0
	 *
	 * I found that using the mousedown event wasn't a good option.
	 */
	.select-search-box__select--prehide {
		opacity: 0;
	}

/** UL with the options */
.select-search-box__options {

}

/** The option (LI), look at the state classes below */
.select-search-box__option {

}

	/** When the option has been selected */
	.select-search-box__option--selected {
	
	}

	/** When the option is selected (when navigation with the arrow keys, up/down) */
	.select-search-box__option--hover, .select-search-box__option:hover {
	
	}
```
