function search(q, text) {
    const searchLength = q.length;
    const textLength = text.length;

    if (searchLength > textLength) {
        return false;
    }

    if (text.indexOf(q) >= 0) {
        return true;
    }

    mainLoop: for (let i = 0, j = 0; i < searchLength; i += 1) {
        const ch = q.charCodeAt(i);

        while (j < textLength) {
            if (text.charCodeAt(j++) === ch) {
                continue mainLoop;
            }
        }

        return false;
    }

    return true;
}

export default function fuzzySearch(options, query) {
    return !query.length
        ? options
        : options.filter((o) =>
              search(
                  query.toLowerCase(),
                  `${o.name} ${o.group || ''}`.trim().toLowerCase(),
              ),
          );
}
