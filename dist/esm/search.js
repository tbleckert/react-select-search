function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

let Fuse = null;

try {
  // eslint-disable-next-line global-require,import/no-extraneous-dependencies
  Fuse = require('fuse.js');
} catch (e) {
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.warn('React Select Search: Not using fuzzy search. Please install fuse.js to enable this feature.');
  }
}

function fuzzySearch(value, options, fuseOptions) {
  const fuse = new Fuse(options, fuseOptions);
  return fuse.search(value).map((item, index) => _objectSpread(_objectSpread({}, item), {}, {
    index
  }));
}

export default function search(value, options, fuseOptions) {
  if (value.length && Fuse && fuseOptions) {
    return fuzzySearch(value, options, fuseOptions);
  }

  return false;
}