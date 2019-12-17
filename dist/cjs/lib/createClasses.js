"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createClasses;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var classes = {
  main: null,
  variant: null,
  focus: '!has-focus',
  disabled: '!is-disabled',
  searching: '!is-searching',
  value: 'value',
  input: 'input',
  select: 'select',
  options: 'options',
  row: 'row',
  option: 'option',
  optionSelected: '!is-selected',
  optionDisabled: '!is-disabled',
  optionHighlighted: '!is-highlighted',
  group: 'group',
  groupHeader: 'group-header'
};

function e(baseClass, className, key) {
  if (key === 'main') {
    return baseClass.split(' ')[0].trim();
  }

  if (key === 'variant') {
    var classNames = baseClass.split(' ');
    classNames.shift();

    if (classNames.length > 0) {
      return classNames.join(' ').trim();
    }

    return '';
  }

  if (className.indexOf('!') === 0) {
    return className.replace('!', '');
  }

  return "".concat(baseClass.split(' ')[0].trim(), "__").concat(className);
}

function createClasses(baseClass) {
  var returnObj = {};
  var classesArray = Object.entries(classes);
  classesArray.map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        cls = _ref2[1];

    return [key, e(baseClass, cls, key)];
  }).forEach(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        key = _ref4[0],
        cls = _ref4[1];

    returnObj[key] = cls;
  });
  return returnObj;
}