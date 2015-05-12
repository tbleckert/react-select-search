# React Select Search (WIP)
React powered selectbox with filter using [fuse.js](https://github.com/krisk/Fuse) (Javascript fuzzy-search).
  
__Note__: This is a work in progress and it may be a little buggy at this time. But feel free to test it and report any found bugs  
_Example design comes from the [beautiful work](https://dribbble.com/shots/1079035-Select-Album?list=searches&tag=select&offset=20) by [Rovane Durso](https://dribbble.com/RovaneDurso)._

![](https://dl.dropboxusercontent.com/u/6306766/react-select-search.png)

## Demo

Live demo can be found here: http://react-select-search.tobiasbleckert.se/

## How to use

    React.render(
	    <SelectSearch
	        name="country"
	        value="SE"
	        placeholder="Choose country"
	        className="my-selectbox"
	        options={objectWithOptions}
	        optionSelected={callbackWhenOptionMarked}
	        valueChanged={callbackWhenValueChanged}
	        onFocus={searchFocusCallback}
	        onBlur={searchBlurCallback} />,
	    document.getElementById('selectSearch')
    );
    
These are all available options. The React component renders a hidden field with the __name__ property and the current __value__ to use in forms.
