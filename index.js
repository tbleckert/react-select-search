/**
 * @jsx React.DOM
 */

(function () {

	'use strict';

	var React     = require('react'),
	    Fuse      = require('fuse.js'),
	    _classes  = {},
	    _itemHeight,
	    _selectHeight,
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
		
		componentWillMount: function () {
			_classes = {
				container: this.props.className,
				search:    this.e('search'),
				select:    this.e('select'),
				options:   this.e('options'),
				option:    this.e('option')
			};
		},
		
		componentDidUpdate: function (prevProps, prevState) {
			if (this.state.value !== prevState.value) {
				this.refs.search.getDOMNode().blur();
			}
		},

		filterOptions: function (options, value) {
			if (options && options.length > 0 && value && value.length > 0) {
				var fuse         = new Fuse(options, {keys: ['name']}),
			        foundOptions = fuse.search(value);

			    return foundOptions;
			}
			
			return options;
		},

		e: function (element, base) {
			base || (base = this.props.className);
			
			return base + '__' + element;
		},
		
		m: function (modifier, base) {
			modifier = modifier.split(' ');
			var finalClass = [];
			
			modifier.forEach(function (className) {
				finalClass.push(base + '--' + className);
			});
			
			return finalClass.join(' ');
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
				className = _classes.select + ' ' + this.m('display', _classes.select);

				element.className = className + ' ' + this.m('prehide', _classes.select);
				
				setTimeout(function () {
					viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
					elementPos     = element.getBoundingClientRect();
					_selectHeight  = viewportHeight - elementPos.top - 20;
					
					element.style.maxHeight = _selectHeight + 'px';
					
					if (!_itemHeight) {
						_itemHeight = element.querySelector('.' + _classes.option).offsetHeight;
					}
					
					element.className = className;
					element.scrollTop = 0;
				}, 50);
			}
			
			this.props.onFocus();
		},

		onBlur: function (e) {
			var element, option;

			this.focus = false;
			this.selected = null;
			
			option = this.findByValue(this.props.options, this.state.value);
			
			if (option) {
				this.setState({search: option.name});
			}

			if (this.refs.hasOwnProperty('select')) {
				element = this.refs.select.getDOMNode();
				element.className = _classes.select + ' ' + this.m('prehide', _classes.select) + ' ' + this.m('display', _classes.select);

				this.hideTimer = setTimeout(function () {
					element.className = _classes.select;
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
			
			this.scrollToSelected();
		},
		
		scrollToSelected: function () {
			var select = this.refs.select.getDOMNode();
			select.scrollTop = _itemHeight * this.selected;
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
			    className     = _classes.option,
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
			var foundOptions,
			    select = null,
			    option = null,
			    options = [];
			
			foundOptions = this.state.options;
			
			if (foundOptions && foundOptions.length > 0) {
				if (this.state.value) {
					option = this.findByValue(this.props.options, this.state.value);
					
					if (option) {
						options.push(<li className={_classes.option + ' ' + this.m('selected', _classes.option)} onClick={this.chooseOption.bind(this, option.value)} key={option.value + '-option'} data-value={option.value}>{option.name}</li>);
					}
				}
				
				foundOptions.forEach(function (element) {
					if (element.value !== this.state.value) {
						options.push(<li className={_classes.option} onClick={this.chooseOption.bind(this, element.value)} key={element.value + '-option'} data-value={element.value}>{element.name}</li>);
					}
				}.bind(this));
				
				if (options.length > 0) {
					select = (
						<ul ref="selectOptions" className={_classes.options}>
							{options}
						</ul>
					);
				}
			}
			
			return (
				<div className={_classes.container}>
					<input type="hidden" value={this.state.value} name={this.props.name} />
					<input ref="search" onFocus={this.onFocus} onKeyDown={this.onKeyDown} onKeyPress={this.onKeyPress} onBlur={this.onBlur} className={_classes.search} type="search" value={this.state.search} onChange={this.onChange} placeholder={this.props.placeholder} />
					<div ref="select" className={_classes.select}>
						{select}	
					</div>
				</div>
			);
		}

	});

	module.exports = Component;

}).call(this);