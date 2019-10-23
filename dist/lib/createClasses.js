"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createClasses;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var classes = {
  main: null,
  value: 'value',
  search: 'search',
  select: 'select',
  options: 'options',
  option: 'option',
  group: 'group',
  groupHeader: 'group-header'
};

function e(baseClass, className) {
  if (className === null) {
    return baseClass;
  }

  return "".concat(baseClass, "__").concat(className);
}

function createClasses(baseClass) {
  var classesArray = Object.entries(classes);
  return Object.fromEntries(classesArray.map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        cls = _ref2[1];

    return [key, e(baseClass, cls)];
  }));
}