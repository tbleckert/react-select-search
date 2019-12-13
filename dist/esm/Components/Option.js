function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import Context from '../Context';
import Group from './Group';

var Option =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(Option, _React$PureComponent);

  function Option(props) {
    var _this;

    _classCallCheck(this, Option);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Option).call(this, props));
    _this.ref = createRef();
    return _this;
  }

  _createClass(Option, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this2 = this;

      var prevSnap = prevProps.snapshot;
      var prevFocus = prevSnap.focus;
      var _this$props = this.props,
          snapshot = _this$props.snapshot,
          value = _this$props.value,
          index = _this$props.index;
      var focus = snapshot.focus,
          highlighted = snapshot.highlighted;
      var scrollConf = {
        behavior: 'auto',
        block: 'center'
      };
      setImmediate(function () {
        if (focus) {
          var selected = Array.isArray(snapshot.value) && snapshot.value.indexOf(value) >= 0 || value === snapshot.value;
          var isHighlighted = index === highlighted;
          var prevIsHighlighted = index === prevSnap.highlighted;

          if (isHighlighted && isHighlighted !== prevIsHighlighted || selected && focus !== prevFocus) {
            _this2.ref.current.scrollIntoView(scrollConf);
          }
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      if (this.props.type === 'group') {
        return React.createElement(Group, this.props);
      }

      var _this$props2 = this.props,
          name = _this$props2.name,
          value = _this$props2.value,
          index = _this$props2.index,
          disabled = _this$props2.disabled,
          onChange = _this$props2.onChange,
          snapshot = _this$props2.snapshot;
      var optionClass = [this.context.classes.option];
      var renderOption = this.context.renderers.option;
      var highlighted = index === snapshot.highlighted;
      var selected = Array.isArray(snapshot.value) && snapshot.value.indexOf(value) >= 0 || value === snapshot.value;

      if (selected) {
        optionClass.push(this.context.classes.optionSelected);
      }

      if (highlighted) {
        optionClass.push(this.context.classes.optionHighlighted);
      }

      if (disabled) {
        optionClass.push(this.context.classes.optionDisabled);
      }

      var optionSnapshot = {
        highlighted: highlighted,
        selected: selected
      };
      var optionProps = {
        disabled: disabled,
        value: value,
        className: optionClass.join(' '),
        onMouseDown: onChange,
        tabIndex: -1,
        role: 'menuitem',
        'data-selected': selected ? 'true' : null,
        'data-highlighted': highlighted ? 'true' : null,
        key: value
      };
      var content = typeof renderOption === 'function' ? renderOption(optionProps, this.props, optionSnapshot) : React.createElement("button", _extends({}, optionProps, {
        type: "button"
      }), name);
      return React.createElement("li", {
        ref: this.ref,
        key: value,
        role: "presentation",
        className: this.context.classes.row
      }, content);
    }
  }]);

  return Option;
}(React.PureComponent);

Option.contextType = Context;
Option.defaultProps = {
  type: null,
  groupId: null,
  disabled: false,
  index: null,
  value: null,
  items: null
};
Option.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  type: PropTypes.string,
  groupId: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object),
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  index: PropTypes.number,
  snapshot: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    highlighted: PropTypes.number,
    focus: PropTypes.bool
  }).isRequired
};
export default Option;