<p align="center">
  <img src="http://tbleckert.github.io/react-select-search/logo.png" alt="React Select Search" />
</p>

<p align="center">
    <a href="https://www.npmjs.com/package/react-select-search">
        <img src="https://travis-ci.org/tbleckert/react-select-search.svg?branch=next" style="max-width:100%;" />
    </a>
    <a href='https://coveralls.io/github/tbleckert/react-select-search?branch=next'>
        <img src='https://coveralls.io/repos/github/tbleckert/react-select-search/badge.svg?branch=next' alt='Coverage Status' />
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
    <a href="https://beerpay.io/tbleckert/react-select-search">
      <img src="https://beerpay.io/tbleckert/react-select-search/badge.svg?style=flat" />
    </a>
</p>

## Features
* Accessible
* Basic HTML select functionality, including multiple
* Search/filter options
* Apply renderers to change markup and behavior
* Keyboard support
* Group options with group names, you can search group names
* Fully stylable

## Demo

Live demo can be found here: [http://tbleckert.github.io/react-select-search/](http://tbleckert.github.io/react-select-search/)

<img src="https://user-images.githubusercontent.com/263465/40550492-86aa5662-603a-11e8-8518-315529cbdec3.png" alt="Demo" />

## How to use

Install it with npm (`npm install react-select-search --save`) and import it like you normally would.

```javascript
import SelectSearch from 'react-select-search';

/**
 * The options array should contain objects.
 * Required keys are "name" and "value" but you can have and use any number of key/value pairs.
 */
const options = [
    {name: 'Swedish', value: 'sv'},
    {name: 'English', value: 'en'},
    {
        type: 'group',
        name: 'Group name',
        items: [
            {name: 'Spanish', value: 'es'},
        ]
    },
];

/* Simple example */
<SelectSearch options={options} defaultValue="sv" name="language" placeholder="Choose your language" />
```
For examples you can take a look at the [example](example/index.jsx) file.

You will also need some CSS to make it look right. Example theme can be found in [style.css](style.css)
