<p align="center">
  <img src="http://tbleckert.github.io/react-select-search/logo.png" alt="React Select Search" />
</p>

<p align="center">
    <a href="https://www.npmjs.com/package/react-select-search">
        <img src="https://travis-ci.org/tbleckert/react-select-search.svg?branch=master" style="max-width:100%;" />
    </a>
    <a href="https://www.npmjs.com/package/react-select-search">
        <img src="https://img.shields.io/badge/license-MIT-blue.svg" style="max-width:100%;" />
    </a>
    <a href="https://www.npmjs.com/package/react-select-search">
        <img src="https://img.shields.io/npm/v/react-select-search.svg" alt="npm" style="max-width:100%;" />
    </a>
    <a href="https://www.npmjs.com/package/react-select-search">
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
    options: PropTypes.array.isRequired,
    className: PropTypes.string,
    search: PropTypes.bool,
    placeholder: PropTypes.string,
    multiple: PropTypes.bool,
    height: PropTypes.number,
    name: PropTypes.string,
    autofocus: PropTypes.bool,
    fuse: PropTypes.object,
    onChange: PropTypes.func,
    onHighlight: PropTypes.func,
    onMount: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    renderOption: PropTypes.func,
    renderValue: PropTypes.func,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
    ])
}

{
    className: 'select-search-box',
    search: true,
    value: '',
    placeholder: null,
    multiple: false,
    height: 200,
    name: null,
    autofocus: false,
    onHighlight: (value, state, props) => {},
    onMount: (value, state, props) => {},
    onBlur: (value, state, props) => {},
    onFocus: (value, state, props) => {},
    onChange: (value, state, props) => {},
    renderOption: (option, state, props) => option.name,
    renderValue: (label, valueObj, state, props) => label,
    fuse: {
        keys: ['name'],
        threshold: 0.3
    }
}
```

The height property is the minimum height (max is the remaining space below the selectbox down to the browser window end) of the dropdown if multiple is false, otherwise it's the fixed height.

For examples you can take a look at the [bootstrap.js](https://github.com/tbleckert/react-select-search/blob/gh-pages/bootstrap.js) file on the gh-pages branch.

You will also need some CSS to make it look right. Example theme can be found in [style.css](style.css)
