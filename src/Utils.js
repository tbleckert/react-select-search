export function isUndef(v) {
    return v === undefined || v === null;
}

export function isDef(v) {
    return !(isUndef(v));
}

export function isEmpty(v) {
    return isUndef(v) || v.length === 0;
}

export function isNotEmpty(v) {
    return !(isEmpty(v));
}

export function isArray(v) {
    if (isUndef(v)) return false;
    return Object.prototype.toString.call(v) === '[object Array]';
}
