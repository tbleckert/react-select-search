"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime");

var _react = require("react");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _types = require("../types");

var _OptionsList = _interopRequireDefault(require("./OptionsList"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Options = function Options(_ref) {
  var options = _ref.options,
      optionProps = _ref.optionProps,
      snapshot = _ref.snapshot,
      cls = _ref.cls,
      renderGroupHeader = _ref.renderGroupHeader,
      renderOption = _ref.renderOption,
      emptyMessage = _ref.emptyMessage;
  var selectRef = (0, _react.useRef)(null);
  var value = snapshot.value,
      highlighted = snapshot.highlighted;
  var renderEmptyMessage = (0, _react.useCallback)(function () {
    if (emptyMessage === null) {
      return null;
    }

    return /*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
      className: cls('not-found'),
      children: typeof emptyMessage === 'function' ? emptyMessage() : emptyMessage
    });
  }, [emptyMessage, cls]);
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
  }, [value, highlighted, selectRef]);
  return (
    /*#__PURE__*/
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    (0, _jsxRuntime.jsx)("div", {
      className: cls('select'),
      ref: selectRef,
      onMouseDown: function onMouseDown(e) {
        return e.preventDefault();
      },
      children: options.length ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_OptionsList["default"], {
        optionProps: optionProps,
        snapshot: snapshot,
        options: options,
        renderOption: renderOption,
        renderGroupHeader: renderGroupHeader,
        cls: cls
      }) : /*#__PURE__*/(0, _jsxRuntime.jsx)("ul", {
        className: cls('options'),
        children: renderEmptyMessage()
      })
    })
  );
};

Options.defaultProps = {
  renderOption: null,
  renderGroupHeader: null,
  emptyMessage: null
};
Options.propTypes = process.env.NODE_ENV !== "production" ? {
  options: _propTypes["default"].arrayOf(_types.optionType).isRequired,
  optionProps: _propTypes["default"].shape({
    tabIndex: _propTypes["default"].string.isRequired,
    onMouseDown: _propTypes["default"].func.isRequired
  }).isRequired,
  snapshot: _propTypes["default"].shape({
    highlighted: _propTypes["default"].number.isRequired,
    value: _types.valueType
  }).isRequired,
  cls: _propTypes["default"].func.isRequired,
  renderGroupHeader: _propTypes["default"].func,
  renderOption: _propTypes["default"].func,
  emptyMessage: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].func])
} : {};

var _default = /*#__PURE__*/(0, _react.memo)(Options);

exports["default"] = _default;