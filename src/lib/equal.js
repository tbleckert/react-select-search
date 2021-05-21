/* eslint-disable no-restricted-syntax */
// eslint-disable-next-line no-unused-vars, no-var
var envHasBigInt64Array = typeof BigInt64Array !== 'undefined';

module.exports = function equal(a, b) {
    if (a === b) return true;

    if (a && b && typeof a === 'object' && typeof b === 'object') {
        if (a.constructor !== b.constructor) return false;

        let length; let i;
        if (Array.isArray(a)) {
            length = a.length;
            // eslint-disable-next-line eqeqeq
            if (length != b.length) return false;
            // eslint-disable-next-line no-plusplus
            for (i = length; i-- !== 0;) if (!equal(a[i], b[i])) return false;
            return true;
        }

        if ((a instanceof Map) && (b instanceof Map)) {
            if (a.size !== b.size) return false;
            for (i of a.entries()) if (!b.has(i[0])) return false;
            for (i of a.entries()) if (!equal(i[1], b.get(i[0]))) return false;
            return true;
        }

        if ((a instanceof Set) && (b instanceof Set)) {
            if (a.size !== b.size) return false;
            for (i of a.entries()) if (!b.has(i[0])) return false;
            return true;
        }

        if (ArrayBuffer.isView(a) && ArrayBuffer.isView(b)) {
            length = a.length;
            // eslint-disable-next-line eqeqeq
            if (length != b.length) return false;
            // eslint-disable-next-line no-plusplus
            for (i = length; i-- !== 0;) if (a[i] !== b[i]) return false;
            return true;
        }

        if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
        if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
        if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();

        const keys = Object.keys(a);
        length = keys.length;
        if (length !== Object.keys(b).length) return false;

        // eslint-disable-next-line no-plusplus
        for (i = length; i-- !== 0;) {
            if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
        }

        // eslint-disable-next-line no-plusplus
        for (i = length; i-- !== 0;) {
            const key = keys[i];

            if (!equal(a[key], b[key])) return false;
        }

        return true;
    }

    // true if both NaN, false otherwise
    // eslint-disable-next-line no-self-compare
    return a !== a && b !== b;
};
