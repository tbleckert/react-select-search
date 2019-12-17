<p align="center">
  <img src="https://user-images.githubusercontent.com/263465/71013376-e4bc3180-20f0-11ea-9768-2a21f6e1607d.png" alt="React Select Search" />
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
    <a href="https://bundlephobia.com/result?p=react-select-search@next">
      <img src="https://badgen.net/bundlephobia/minzip/react-select-search@next" />
    </a>
    <a href="https://beerpay.io/tbleckert/react-select-search">
      <img src="https://beerpay.io/tbleckert/react-select-search/badge.svg?style=flat" />
    </a>
</p>

## Features
* Lightweight, with zero dependencies*
* Full test coverage
* Accessible
* Basic HTML select functionality, including multiple
* Search/filter options
* Apply renderers to change markup and behavior
* Keyboard support
* Group options with group names, you can search group names
* Fully stylable

_*One optional dependency required for built-in fuzzy search_

## Demo

Live demo can be found here: [http://tbleckert.github.io/react-select-search/](http://tbleckert.github.io/react-select-search/)
  
<img src="https://user-images.githubusercontent.com/263465/71011520-d4ef1e00-20ed-11ea-9fad-b3c952089258.png" alt="Demo" />

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

## Configuration

Below is all the available options you can pass to the component. Options without defaults are required.

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| options | array | | Se the [options documentation](#the-options-object) below |
| defaultValue | string, array | undefined | Set only a defaultValue for [uncontrolled](#controlled-component) usage. The value should be an array if multiple mode. |
| value | string, array | undefined | Use together with `onChange` for [controlled](#controlled-component) usage. The value should be an array if multiple mode. |
| multiple | boolean | false | Set to true if you want to allow multiple selected options. |
| search | boolean | false | Set to true to enable search functionality |
| disabled | boolean | false | Disables all functionality |
| placeholder | string | empty string | Displayed if no option is selected and/or when search field is focused with empty value. |
| autoComplete | string, on/off | off | Disables/Enables autoComplete functionality in search field. |
| autoFocus | boolean | false | Autofocus on select |
| fuse | object, boolean | true | Use fuse.js to apply fuzzy search on search. Set to true to use default options or pass a fuse.js config option. If `search` is enabled and no `filterOptions` callback is passed, this will be set to `true` automatically. |
| className | string, object | select-search-box | Set a base class string or pass in a className object for complete controll. Se [custom classNames](#custom-classnames) for more. |
| onChange | function | null | Function to receive and handle value changes. Use together with the `value` prop for [controlled](#controlled-component) component usage. |
| renderOption | function | null | Function that renders the options. See [custom renderers](#custom-renderers) for more. |
| renderValue | function | null | Function that renders the value/search field. See [custom renderers](#custom-renderers) for more. |
| renderGroupHeader | function | null | Function that renders the group header. See [custom renderers](#custom-renderers) for more. |
| filterOptions | function | null | Filter the options list. See [filter options](#filter-options) for more. |

## The options object

The options object can contain any properties and values you like. The only required one is `name`.

| Property | Type | Description | Required |
| -------- | ---- | ----------- | -------- |
| name     | string | The name of the option | Yes |
| value    | string | The value of the option | Yes, if the type is not "group" |
| type     | string | If you set the type to "group" you can add an array of options that will be grouped | No |
| items    | array | Array of option objects that will be used if the type is set to "group" | Yes, if `type` is set to "group" |
| disabled | boolean | Set to `true` to disable this option | No |

## Controlled component

You can decide if you want full control of the state or if you want it handled automatically.
If you decide to not control it, the component will not be updated if you change the value.

To control the component you need to set an `onChange` handler and keep the `value` attribute up to date yourself.
If you don't want to control it, you can omit the `onChange` handler and set `defaultValue` instead of `value`.

## Custom class names

If you set a string as the `className` attribute value, the component will use that as a base and BEMify the class names for all elements.
If you want to fully control the class names you can pass on object with the following shape:

```js
{
    main: 'select',
    variant: 'multiple',
    focus: 'has-focus',
    disabled: 'is-disabled',
    searching: 'is-searching',
    value: 'select-value',
    input: 'select-input',
    select: 'select-select',
    options: 'select-options',
    row: 'select-row',
    option: 'select-option',
    optionSelected: 'is-selected',
    optionDisabled: 'is-disabled',
    optionHighlighted: 'is-highlighted',
    group: 'select-group',
    groupHeader: 'select-group-header',
}
```

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

The optionSnapshot is an object that contains the object state: `{ selected: bool, highlighted: bool, disabled: bool }`.
