/**
 * @jsx React.DOM
 */

(function () {

	'use strict';

	var React     = require('react'),
	    Fuse      = require('fuse.js'),
	    _itemHeight,
	    Component;

	Component = React.createClass({

		displayName: 'SelectSearch',
		
		hideTimer: null,
		
		focus: false,
		
		selected: null,

		getInitialState: function () {
			return {
				search: null,
				value: this.props.value,
				options: this.props.options
			};
		},

		getDefaultProps: function () {
			return {
				options: [],
				className: 'select-search-box',
				value: null,
				placeholder: null,
				name: null,
				valueChanged: function () {},
				optionSelected: function () {},
				onBlur: function () {},
				onFocus: function () {}
			};
		},

		filterOptions: function (options, value) {
			if (options && options.length > 0 && value && value.length > 0) {
				var fuse         = new Fuse(options, {keys: ['name']}),
			        foundOptions = fuse.search(value);

			    return foundOptions;
			}
			
			return options;
		},

		_className: function (base, element) {
			return base + '__' + element;
		},

		onChange: function (e) {
			var value = e.target.value, foundOptions = this.filterOptions(this.props.options, value);

			this.selected = null;

			this.setState({options: foundOptions, search: value});
		},

		onFocus: function () {
			var className, element, viewportHeight, elementPos;

			clearTimeout(this.hideTimer);

			this.focus = true;
			this.setState({search: null, options: this.props.options});

			if (this.refs.hasOwnProperty('select')) {
				element   = this.refs.select.getDOMNode();
				className = element.className;

				element.className = className + ' ' + className + '--' + 'display' + ' ' + className + '--' + 'prehide';
				
				setTimeout(function () {
					viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
					elementPos     = element.getBoundingClientRect();
					
					element.className = className + ' ' + className + '--' + 'display';
					element.style.maxHeight = viewportHeight - elementPos.top - 20 + 'px';
				}, 50);
			}
			
			this.props.onFocus();
		},

		onBlur: function (e) {
			var element, className = this._className(this.props.className, 'select'), option;

			this.focus = false;
			this.selected = null;
			
			option = this.findByValue(this.props.options, this.state.value);
			
			if (option) {
				this.setState({search: option.name});
			}

			if (this.refs.hasOwnProperty('select')) {
				element = this.refs.select.getDOMNode();
				element.className += ' ' + className + '--' + 'prehide';

				this.hideTimer = setTimeout(function () {
					element.className = className;
					this.setState({options: []});
					this.props.onBlur();
				}.bind(this), 200);
			}
		},

		onKeyPress: function (e) {
			if (!this.state.options || this.state.options.length < 1) {
				return;
			}

			if (e.key === 'Enter') {
				e.preventDefault();
				
				var selectedOption = (this.selected) ? this.optionByIndex(this.selected) : this.optionByIndex(0);
				
				if (selectedOption) {
					this.chooseOption(selectedOption.value);
					this.refs.search.getDOMNode().blur();
				}
			}
		},

		onKeyDown: function (e) {
			if (!this.state.options || this.state.options.length < 1) {
				return;
			}

			if (e.key === 'ArrowDown') {
				e.preventDefault();

				if (typeof this.selected === 'undefined' || this.selected === null) {
					this.selectOption(0, true);
				} else {
					this.selectOption(this.selected + 1, true);
				}
			} else if (e.key === 'ArrowUp') {
				e.preventDefault();

				if (typeof this.selected === 'undefined' || this.selected === null) {
					this.selectOption(this.state.options.length - 1);
				} else {
					this.selectOption(this.selected - 1);
				}
			}
		},

		optionByIndex: function (index) {
			var option = null;

			this.state.options.every(function (object, i) {
				if (index === i) {
					option = object;
					return false;
				}

				return true;
			});

			return option;
		},

		findByValue: function (source, value) {
			if ((!source || source.length < 1) && (!this.state.search || this.state.search.length < 1)) {
				source = this.props.options;
			}
			
			return source.filter(function (object) {
				return object.value === value;
			})[0];
		},

		selectOption: function (value, down) {
			var optionsParent = this.refs.selectOptions.getDOMNode(),
			    options       = optionsParent.childNodes,
			    className     = this._className(this._className(this.props.className, 'select'), 'option'),
			    selectedClass = className + ' ' + className + '--' + 'hover',
			    totalOptions  = options.length,
			    selected      = null,
			    selectedNodeName,
			    i,
			    node;

			for (i = 0; i < totalOptions; i += 1) {
				node = options[i];

				if (i === value) {
					if (node.getAttribute('data-value') === this.state.value) {
						node.className = className + ' ' + className + '--' + 'selected';
					} else {
						node.className = selectedClass;
					}
					
					selectedNodeName = node.textContent;
					selected = i;
				} else {
					if (node.getAttribute('data-value') === this.state.value) {
						node.className = className + ' ' + className + '--' + 'selected';
					} else {
						node.className = className;
					}
				}
			}

			if (!selectedNodeName) {
				selectedNodeName = this.state.search;
			}

			this.selected = selected;
			this.props.optionSelected(selected, this.state, this.props);
		},

		chooseOption: function (value) {
			var foundOption,
			    options,
			    option;

			if (!value) {
				option = this.state.options[0];
			} else {
				option = this.findByValue(this.props.options, value);
			}

			this.props.valueChanged(option, this.state, this.props);

			this.setState({value: option.value, search: option.name, options: this.props.options});
		},

		removeSelected: function (value) {
			if (!value) {
				return false;
			}
			
			var option = this.findByValue(this.props.options, value);
			
			if (!options) {
				return false;
			}
			
			this.props.valueChanged(null, this.state, this.props);
			this.setState({value: null, search: null});
		},

		render: function () {
			var className = this.props.className,
			    selectClass = this._className(this.props.className, 'select'),
			    foundOptions,
			    optionClass = this._className(selectClass, 'option'),
			    optionSelectedClass = optionClass + ' ' + optionClass + '--selected',
			    select = null,
			    option = null,
			    options = [];
			
			foundOptions = this.state.options;
			
			if (foundOptions && foundOptions.length > 0) {
				if (this.state.value) {
					option = this.findByValue(this.props.options, this.state.value);
					
					if (option) {
						options.push(<li className={optionSelectedClass} onClick={this.chooseOption.bind(this, option.value)} key={option.value + '-option'} data-value={option.value}>{option.name}</li>);
					}
				}
				
				foundOptions.forEach(function (element) {
					if (element.value !== this.state.value) {
						options.push(<li className={optionClass} onClick={this.chooseOption.bind(this, element.value)} key={element.value + '-option'} data-value={element.value}>{element.name}</li>);
					}
				}.bind(this));
				
				if (options.length > 0) {
					select = (
						<ul ref="selectOptions" className={this._className(selectClass, 'options')}>
							{options}
						</ul>
					);
				}
			}
			
			return (
				<div className={className}>
					<input type="hidden" value={this.state.value} name={this.props.name} />
					<input ref="search" onFocus={this.onFocus} onKeyDown={this.onKeyDown} onKeyPress={this.onKeyPress} onBlur={this.onBlur} className={this._className(className, 'search')} type="search" value={this.state.search} onChange={this.onChange} placeholder={this.props.placeholder} />
					<div ref="select" className={selectClass}>
						{select}	
					</div>
				</div>
			);
		}

	});

	module.exports = Component;

}).call(this);