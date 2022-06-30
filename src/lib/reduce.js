export default function reduce(middleware, items, query) {
    return middleware.filter(Boolean)
        .reduce((data, cb) => cb(data, query), items)
        .map((item, i) => ({ ...item, index: i }));
}
