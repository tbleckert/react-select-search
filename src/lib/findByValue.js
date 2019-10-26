export default function findByValue(source, value) {
    if (!source) {
        return null;
    }

    return source.filter(object => object.value === value)[0];
}
