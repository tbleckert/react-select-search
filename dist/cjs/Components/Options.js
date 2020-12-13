"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime");

var _react = require("react");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Option = _interopRequireDefault(require("./Option"));

var _isSelected = _interopRequireDefault(require("../lib/isSelected"));

var _types = require("../types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var Options = function Options(_ref) {
  var options = _ref.options,
      emptyMessage = _ref.emptyMessage,
      cls = _ref.cls,
      optionProps = _ref.optionProps,
      renderOption = _ref.renderOption,
      renderGroupHeader = _ref.renderGroupHeader,
      snapshot = _ref.snapshot;
  var selectRef = (0, _react.useRef)(null);
  var renderEmptyMessage = (0, _react.useCallback)(function () {
    if (emptyMessage === null) {
      return null;
    }

    return /*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
      className: cls('not-found'),
      children: typeof emptyMessage === 'function' ? emptyMessage() : emptyMessage
    });
  }, [emptyMessage, cls]);
  var focus = snapshot.focus,
      value = snapshot.value,
      highlighted = snapshot.highlighted;
  (0, _react.useEffect)(function () {
    var current = selectRef.current;

    if (!current || highlighted < 0 && Array.isArray(value) || value === null) {
      return;
    }

    var query = highlighted > -1 ? "[data-index=\"" + highlighted + "\"]" : "[data-value=\"" + escape(value) + "\"]";
    var selected = current.querySelector(query);

    if (selected) {
      var rect = current.getBoundingClientRect();
      var selectedRect = selected.getBoundingClientRect();
      current.scrollTop = selected.offsetTop - rect.height / 2 + selectedRect.height / 2;
    }
  }, [focus, value, highlighted, selectRef]);
  return (
    /*#__PURE__*/
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    (0, _jsxRuntime.jsx)("div", {
      className: cls('select'),
      ref: selectRef,
      onMouseDown: function onMouseDown(e) {
        return e.preventDefault();
      },
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("ul", {
        className: cls('options'),
        children: options.length > 0 ? options.map(function (option) {
          var isGroup = option.type === 'group';
          var items = isGroup ? option.items : [option];
          var base = {
            cls: cls,
            optionProps: optionProps,
            renderOption: renderOption
          };
          var rendered = items.map(function (o) {
            return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Option["default"], _extends({
              selected: (0, _isSelected["default"])(o, snapshot.option),
              highlighted: snapshot.highlighted === o.index
            }, base, o), o.value);
          });

          if (isGroup) {
            return /*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
              role: "none",
              className: cls('row'),
              children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
                className: cls('group'),
                children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
                  className: cls('group-header'),
                  children: renderGroupHeader(option.name)
                }), /*#__PURE__*/(0, _jsxRuntime.jsx)("ul", {
                  className: cls('options'),
                  children: rendered
                })]
              })
            }, option.groupId);
          }

          return rendered;
        }) : renderEmptyMessage()
      })
    })
  );
};

Options.defaultProps = {
  emptyMessage: null,
  renderOption: undefined,
  renderGroupHeader: function renderGroupHeader(name) {
    return name;
  }
};
Options.propTypes = process.env.NODE_ENV !== "production" ? {
  options: _propTypes["default"].arrayOf(_types.optionType).isRequired,
  cls: _propTypes["default"].func.isRequired,
  emptyMessage: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].func]),
  optionProps: _propTypes["default"].shape({
    tabIndex: _propTypes["default"].string.isRequired,
    onMouseDown: _propTypes["default"].func.isRequired
  }).isRequired,
  snapshot: _propTypes["default"].shape({
    highlighted: _propTypes["default"].number.isRequired,
    option: _propTypes["default"].oneOfType([_types.optionType, _propTypes["default"].arrayOf(_types.optionType)]),
    focus: _propTypes["default"].bool.isRequired,
    value: _types.valueType
  }).isRequired,
  renderOption: _propTypes["default"].func,
  renderGroupHeader: _propTypes["default"].func
} : {};

var _default = /*#__PURE__*/(0, _react.memo)(Options);

exports["default"] = _default;