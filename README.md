# React Select Search

![](https://travis-ci.org/tbleckert/react-select-search.svg?branch=master)

React powered selectbox with filter using [fuse.js](https://github.com/krisk/Fuse) (Javascript fuzzy-search).

_Example design comes from the [beautiful work](https://dribbble.com/shots/1079035-Select-Album?list=searches&tag=select&offset=20) by [Rovane Durso](https://dribbble.com/RovaneDurso)._

![](https://dl.dropboxusercontent.com/u/6306766/react-select-search.png)

## Note!

A React 0.12.* supported version can be found in 0.2.* (and below) tagged releases

## Demo

Live demo can be found here: [http://tbleckert.github.io/react-select-search/](http://tbleckert.github.io/react-select-search/)

## How to use

Install it with npm (`npm install react-select-search --save`) and require it like you normally would.

    React.render(
	    <SelectSearch
	        name="country"
	        value="SE"
	        placeholder="Choose country"
            search={true}
	        multiple={false}
	        height={height in pixels, used if multiple select}
	        className="my-selectbox"
	        options={objectWithOptions}
	        fuse={fuseJsOptions}
	        optionSelected={callbackWhenOptionMarked}
	        valueChanged={callbackWhenValueChanged}
	        renderOption={modifyOptionHtml}
	        onMount={componentDidMountCallback}
	        onFocus={searchFocusCallback}
	        onBlur={searchBlurCallback} />,
	    document.getElementById('selectSearch')
    );

These are all available options. The React component renders a hidden field with the __name__ property and the current __value__ to use in forms.  

You will also need some CSS to make it look right. The important piece is the options.

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
