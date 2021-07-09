<p align="center">
  <img src="https://user-images.githubusercontent.com/263465/71013376-e4bc3180-20f0-11ea-9768-2a21f6e1607d.png" alt="React Select Search" />
</p>

<p align="center">
    <a href="https://www.npmjs.com/package/react-select-search">
        <img src="https://travis-ci.org/tbleckert/react-select-search.svg?branch=main" style="max-width:100%;" />
    </a>
    <a href='https://coveralls.io/github/tbleckert/react-select-search'>
        <img src='https://coveralls.io/repos/github/tbleckert/react-select-search/badge.svg' alt='Coverage Status' />
    </a>
    <a href="https://codeclimate.com/github/tbleckert/react-select-search/maintainability">
        <img src="https://api.codeclimate.com/v1/badges/ca5314831e777b903ca8/maintainability" />
    </a>
    <a href="https://www.npmjs.com/package/react-select-search">
        <img src="https://img.shields.io/npm/v/react-select-search.svg" alt="npm" style="max-width:100%;" />
    </a>
    <a href="https://www.npmjs.com/package/react-select-search">
        <img src="https://img.shields.io/npm/dm/react-select-search.svg" style="max-width:100%;" />
    </a>
    <a href="https://bundlephobia.com/result?p=react-select-search">
      <img src="https://badgen.net/bundlephobia/minzip/react-select-search" />
    </a>
</p>

## Features
* Lightweight, with zero dependencies*
* Accessible
* Headless mode
* Basic HTML select functionality, including multiple
* Search/filter options
* Async options
* Apply renderers to change markup and behavior
* Keyboard support
* Group options with group names, you can search group names
* Fully stylable

_*One optional dependency required for built-in fuzzy search_

## Demo

Live demo can be found here: [https://react-select-search.com](https://react-select-search.com)
  
<img src="https://user-images.githubusercontent.com/263465/71011520-d4ef1e00-20ed-11ea-9fad-b3c952089258.png" alt="Demo" />

## Install

Install it with npm (`npm install react-select-search --save`) and import it like you normally would.

## Quick example

```jsx harmony
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
<SelectSearch options={options} value="sv" name="language" placeholder="Choose your language" />
```
For example, you can take a look in the [stories](stories) directory.

You will also need some CSS to make it look right. Example theme can be found in [style.css](style.css).

## Use with SSR

For use with SSR you might need to use the commonjs bundle (react-select-search/dist/cjs). If you want to utilise the example theme ([style.css](style.css)) you need to check if you're build script manipulates class names, for example minifies them. If that's the case, you can use CSS modules to get the class names from the style.css file and apply them using the [className function](#custom-class-names). Example can be seen [here](stories/3-Custom.stories.js#L64) as well as here https://react-select-search.com/?path=/story/custom--css-modules.

## Headless mode with hooks

If you want complete control (more than styling and [custom renderers](#custom-renderers)) you can use hooks to pass data to your own components and build it yourself.

```jsx harmony
import React from 'react';
import { useSelect } from 'react-select-search';

const CustomSelect = ({ options, value, multiple, disabled }) => {
    const [snapshot, valueProps, optionProps] = useSelect({
        options,
        value,
        multiple,
        disabled,
    });

    return (
        <div>
            <button {...valueProps}>{snapshot.displayValue}</button>
            {snapshot.focus && (
                <ul>
                    {snapshot.options.map((option) => (
                        <li key={option.value}>
                            <button {...optionProps} value={option.value}>{option.name}</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
```

## Configuration

Below is all the available options you can pass to the component. Options without defaults are required.

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| options | array | | Se the [options documentation](#the-options-object) below |
| getOptions | function | null | Get options through a function call, can return a promise for async usage. See [get options](#get-options) for more. |
| filterOptions | function | null | Takes the current options list and should return a function that handles the filtering. Runs after getOptions. See [fuzzySearch.js](src/fuzzySearch.js) for example. |
| value | string, array | null | The value should be an array if multiple mode. |
| multiple | boolean | false | Set to true if you want to allow multiple selected options. |
| search | boolean | false | Set to true to enable search functionality |
| disabled | boolean | false | Disables all functionality |
| printOptions | string | auto | Can be: auto, always, never, on-focus. This property controls when the options list should be rendered. |
| closeOnSelect | boolean | true | The selectbox will blur by default when selecting an option. Set this to false to prevent this behavior. |
| debounce | number | 0 | Number of ms to wait until calling [get options](#get-options) when searching. |
| placeholder | string | empty string | Displayed if no option is selected and/or when search field is focused with empty value. |
| id | string | null | HTML ID on the top level element. |
| autoComplete | string, on/off | off | Disables/Enables autoComplete functionality in search field. |
| autoFocus | boolean | false | Autofocus on select |
| className | string, function | select-search-box | Set a base class string or pass a function for complete control. Se [custom classNames](#custom-class-names) for more. |
| renderOption | function | null | Function that renders the options. See [custom renderers](#custom-renderers) for more. |
| renderGroupHeader | function | null | Function that renders the group header. See [custom renderers](#custom-renderers) for more. |
| renderValue | function | null | Function that renders the value/search field. See [custom renderers](#custom-renderers) for more. |
| emptyMessage | string, function | null | Set empty message for empty options list, you can provide render function without arguments instead plain string message|
| onChange | function | null | Function to receive and handle value changes. |
| onFocus | function | null | Focus callback. |
| onBlur | function | null | Blur callback. |

## The options object

The options object can contain any properties and values you like. The only required one is `name`.

| Property | Type | Description | Required |
| -------- | ---- | ----------- | -------- |
| name     | string | The name of the option | Yes |
| value    | string | The value of the option | Yes, if the type is not "group" |
| type     | string | If you set the type to "group" you can add an array of options that will be grouped | No |
| items    | array | Array of option objects that will be used if the type is set to "group" | Yes, if `type` is set to "group" |
| disabled | boolean | Set to `true` to disable this option | No |

## Custom class names

If you set a string as the `className` attribute value, the component will use that as a base and BEM-ify the class names for all elements.
If you want to fully control the class names you can pass a function that takes a key and returns a class name. The following keys exists:

* container
* value
* input
* select
* options
* option
* group
* group-header
* is-selected
* is-highlighted
* is-loading
* has-focus

## Custom renderers

If CSS isn't enough, you can also control the HTML for the different parts of the component.

| Callback | Args | Description |
| -------- | ---- | ----------- |
| renderOption | optionsProps: object, optionData: object, optionSnapshot: object | Controls the rendering of the options. |
| renderGroupHeader | name: string | Controls the rendering of the group header name |
| renderValue | valueProps: object, ref: React.ref, selectedValue: object | Controls the rendering of the value/input element |

The optionProps and the valueProps are needed for the component you render to work. For example:

```jsx
<SelectSearch renderValue={(valueProps) => <input {...valueProps} />} />
```

Monkeypatch it if you need to but make sure to not remove important props.

The optionSnapshot is an object that contains the object state: `{ selected: bool, highlighted: bool }`.

## Get options

You can fetch options asynchronously with the `getOptions` property. You can either return options directly or through a `Promise`.

```jsx
function getOptions(query) {
    return new Promise((resolve, reject) => {
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`)
            .then(response => response.json())
            .then(({ drinks }) => {
                resolve(drinks.map(({ idDrink, strDrink }) => ({ value: idDrink, name: strDrink })))
            })
            .catch(reject);
    });
}
```

The function runs on each search query update, so you might want to throttle the fetches.
If you return a promise, the class `is-searching` will be applied to the main element, giving you a chance
to change the appearance, like adding a spinner. The property `searching` is also available in the snapshot that is sent to your render callbacks.

## IE11 support

The main build is an ES module and targets modern browsers. In particular, it specifically excludes IE11 in the build process. If you need to support IE11, you should require the CommonJS build instead like so

```js
import SelectSearch from 'react-select-search/dist/cjs/index.js';
```
