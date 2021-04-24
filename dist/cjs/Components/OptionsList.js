"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = require("react");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Option = _interopRequireDefault(require("./Option"));

var _isSelected = _interopRequireDefault(require("../lib/isSelected"));

var _types = require("../types");

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var OptionsList = function OptionsList(_ref) {
  var options = _ref.options,
      optionProps = _ref.optionProps,
      snapshot = _ref.snapshot,
      renderOption = _ref.renderOption,
      renderGroupHeader = _ref.renderGroupHeader,
      cls = _ref.cls;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("ul", {
    className: cls('options'),
    children: options.map(function (o) {
      if (o.type === 'group') {
        return /*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
          role: "none",
          className: cls('row'),
          children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            className: cls('group'),
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
              className: cls('group-header'),
              children: renderGroupHeader ? renderGroupHeader(o.name) : o.name
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("ul", {
              className: cls('options'),
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)(OptionsList, {
                optionProps: optionProps,
                snapshot: snapshot,
                options: o.items,
                renderOption: renderOption,
                renderGroupHeader: renderGroupHeader,
                cls: cls
              })
            })]
          })
        }, o.groupId);
      }

      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Option["default"], {
        selected: (0, _isSelected["default"])(o, snapshot.option),
        highlighted: snapshot.highlighted === o.index,
        option: o,
        optionProps: optionProps,
        cls: cls,
        renderOption: renderOption
      }, o.value);
    })
  });
};

OptionsList.propTypes = process.env.NODE_ENV !== "production" ? {
  options: _propTypes["default"].arrayOf(_types.optionType).isRequired,
  optionProps: _propTypes["default"].shape({}).isRequired,
  snapshot: _propTypes["default"].shape({
    highlighted: _propTypes["default"].number.isRequired,
    option: _propTypes["default"].oneOfType([_types.optionType, _propTypes["default"].arrayOf(_types.optionType)])
  }).isRequired,
  cls: _propTypes["default"].func.isRequired,
  renderGroupHeader: _propTypes["default"].func,
  renderOption: _propTypes["default"].func
} : {};

var _default = /*#__PURE__*/(0, _react.memo)(OptionsList);

exports["default"] = _default;