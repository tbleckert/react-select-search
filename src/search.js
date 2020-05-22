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

    return fuse.search(value).map((item, index) => ({ ...item, index }));
}

export default function search(value, options, fuseOptions) {
    if (value.length && Fuse && fuseOptions) {
        return fuzzySearch(value, options, fuseOptions);
    }

    return false;
}
