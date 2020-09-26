"use strict";

exports.__esModule = true;
exports["default"] = fuzzySearch;
var Fuse = null;

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
  if (!Fuse) {
    return options;
  }

  var fuse = new Fuse(options, fuseOptions);
  return fuse.search(value);
}