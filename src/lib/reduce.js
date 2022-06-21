export default function reduce(middleware, items, query) {
    return middleware.filter((cb) => typeof cb === 'function').reduce(
        (data, cb) => cb(data, query),
        items
    );
}
