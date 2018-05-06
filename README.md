<p align="center">
  <img src="https://www.dropbox.com/s/9nd0y69gmthml0u/react-select-search.png?dl=0" alt="React Select Search" />
</p>

<p align="center">
    <a href="https://www.npmjs.com/package/react-popup">
        <img src="https://travis-ci.org/tbleckert/react-select-search.svg?branch=master" style="max-width:100%;" />
    </a>
    <a href="https://www.npmjs.com/package/react-popup">
        <img src="https://img.shields.io/badge/license-MIT-blue.svg" style="max-width:100%;" />
    </a>
    <a href="https://www.npmjs.com/package/react-popup">
        <img src="https://img.shields.io/npm/v/react-select-search.svg" alt="npm" style="max-width:100%;" />
    </a>
    <a href="https://www.npmjs.com/package/react-popup">
        <img src="https://img.shields.io/npm/dm/react-select-search.svg" style="max-width:100%;" />
    </a>
</p>

## Demo

Live demo can be found here: [http://tbleckert.github.io/react-select-search/](http://tbleckert.github.io/react-select-search/)

## Warning

Until the 1.0.0 release, this react component is considered not to be production ready. It will most likely work for you but it's lacking tests and testing. I'm trying my hardest to get enough time to work on this and test it. Any and all help is much appreciated in forms of both testing and code contributions.

## Known issues

* Weird tab behaviour in some places in Safari

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
    options        : PropTypes.array.isRequired,
    className      : PropTypes.string.isRequired,
    search         : PropTypes.bool.isRequired,
    placeholder    : PropTypes.string,
    multiple       : PropTypes.bool.isRequired,
    height         : PropTypes.number,
    name           : PropTypes.string,
    fuse           : PropTypes.object.isRequired,
    onChange       : PropTypes.func.isRequired,
    onHighlight    : PropTypes.func.isRequired,
    onMount        : PropTypes.func.isRequired,
    onBlur         : PropTypes.func.isRequired,
    onFocus        : PropTypes.func.isRequired,
    renderOption   : PropTypes.func.isRequired,
    value          : PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
    ])
}

{
    options        : [],
    className      : 'select-search-box',
    search         : true,
    value          : '',
    placeholder    : null,
    multiple       : false,
    height         : 200,
    name           : null,
    onHighlight    : function (value, state, props) {},
    onMount        : function (value, state, props) {},
    onBlur         : function (value, state, props) {},
    onFocus        : function (value, state, props) {},
    onChange       : function (value, state, props) {},
    renderOption   : function (value, state, props) {
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
