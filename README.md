<p align="center">
  <img src="https://user-images.githubusercontent.com/263465/175054036-90835869-74dc-40f1-a541-adea18da9b8f.png" alt="React Select Search" />
</p>

<h6 align="center">
  <a href="https://react-select-search.com">Demo</a>
  ·
  <a href="https://github.com/tbleckert/react-select-search#quick-start">Quick start</a>
  ·
  <a href="https://github.com/tbleckert/react-select-search#config">Config</a>
·
  <a href="https://github.com/tbleckert/react-select-search#headless-mode-with-hooks">Headless</a>
</h6>

<p align="center">
    <a href='https://coveralls.io/github/tbleckert/react-select-search'>
        <img src='https://img.shields.io/coveralls/github/tbleckert/react-select-search?style=for-the-badge' alt='Coverage Status' />
    </a>
    <a href="https://www.npmjs.com/package/react-select-search">
        <img src="https://img.shields.io/npm/dm/react-select-search.svg?style=for-the-badge" style="max-width:100%;" />
    </a>
    <a href="https://bundlephobia.com/result?p=react-select-search">
        <img src="https://img.shields.io/bundlephobia/minzip/react-select-search?style=for-the-badge" />
    </a>
    <a href="#contributors">
        <img src="https://img.shields.io/github/contributors/tbleckert/react-select-search?style=for-the-badge" />
    </a>
</p>

## Features
* Lightweight, with zero dependencies
* Accessible
* Headless mode
* Basic HTML select functionality, including multiple
* Search/filter options
* Async options
* Apply renderers to change markup and behavior
* Keyboard support
* Group options with group names, you can search group names
* Fully stylable

## Install

Install it with npm (`npm i react-select-search`) or yarn (`yarn add react-select-search`) and import it like you normally would.

## Quick start

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
For more examples, you can take a look in the [stories](stories) directory.

You will also need some CSS to make it look right. Example theme can be found in [style.css](style.css). You can also import it:

```javascript
import 'react-select-search/style.css'
```

## Use with SSR

For use with SSR you might need to use the commonjs bundle (react-select-search/dist/cjs). If you want to utilise the example theme ([style.css](style.css)) you need to check if your build script manipulates class names, for example minifies them. If that's the case, you can use CSS modules to get the class names from the style.css file and apply them using the [className object](#custom-class-names). Example can be seen [here](stories/3-Custom.stories.js#L64) as well as here https://react-select-search.com/?path=/story/custom--css-modules.

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

| Name | Type           | Default | Description                                                                                                                                                       |
| ---- |----------------| ------- |-------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| options | array          | | See the [options documentation](#the-options-object) below                                                                                                        |
| getOptions | function       | null | Get options through a function call, can return a promise for async usage. See [get options](#get-options) for more.                                              |
| filterOptions | array          | null | An array of functions that takes the last filtered options and a search query if any. Runs after getOptions. |
| value | string, array  | null | The value should be an array if multiple mode.                                                                                                                    |
| multiple | boolean        | false | Set to true if you want to allow multiple selected options.                                                                                                       |
| search | boolean        | false | Set to true to enable search functionality                                                                                                                        |
| disabled | boolean        | false | Disables all functionality                                                                                                                                        |
| closeOnSelect | boolean        | true | The selectbox will blur by default when selecting an option. Set this to false to prevent this behavior.                                                          |
| debounce | number         | 0 | Number of ms to wait until calling [get options](#get-options) when searching.                                                                                    |
| placeholder | string         | empty string | Displayed if no option is selected and/or when search field is focused with empty value.                                                                          |
| id | string         | null | HTML ID on the top level element.                                                                                                                                 |
| autoComplete | string, on/off | off | Disables/Enables autoComplete functionality in search field.                                                                                                      |
| autoFocus | boolean        | false | Autofocus on select                                                                                                                                               |
| className | string, object | select-search-box | Set a base class string or pass a function for complete control. Se [custom classNames](#custom-class-names) for more.                                            |
| renderOption | function       | null | Function that renders the options. See [custom renderers](#custom-renderers) for more.                                                                            |
| renderGroupHeader | function       | null | Function that renders the group header. See [custom renderers](#custom-renderers) for more.                                                                       |
| renderValue | function       | null | Function that renders the value/search field. See [custom renderers](#custom-renderers) for more.                                                                 |
| emptyMessage | React node     | null | Set empty message for empty options list, you can provide render function without arguments instead plain string message                                          |
| onChange | function       | null | Function to receive and handle value changes.                                                                                                                     |
| onFocus | function       | null | Focus callback.                                                                                                                                                   |
| onBlur | function       | null | Blur callback.                                                                                                                                                    |

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

If you set a string as the `className` attribute value, the component will use that as a base for all elements.
If you want to fully control the class names you can pass an object with classnames. The following keys exists:

* container
* value
* input
* select
* options
* row
* option
* group
* group-header
* is-selected
* is-highlighted
* is-loading
* is-multiple
* has-focus

## Custom renderers

If CSS isn't enough, you can also control the HTML for the different parts of the component.

| Callback | Args                                                                                | Description |
| -------- |-------------------------------------------------------------------------------------| ----------- |
| renderOption | optionsProps: object, optionData: object, optionSnapshot: object, className: string | Controls the rendering of the options. |
| renderGroupHeader | name: string                                                                        | Controls the rendering of the group header name |
| renderValue | valueProps: object, snapshot: object, className: string                             | Controls the rendering of the value/input element |

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
If you return a promise, the class `is-loading` will be applied to the main element, giving you a chance
to change the appearance, like adding a spinner. The property `fetching` is also available in the snapshot that is sent to your render callbacks.

## Contributors

<a href="https://github.com/tbleckert/react-select-search/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=tbleckert/react-select-search" />
</a>

Made with [contrib.rocks](https://contrib.rocks).
