function fuzzy(q, text) {
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
            // eslint-disable-next-line no-plusplus
            if (text.charCodeAt(j++) === ch) {
                continue mainLoop;
            }
        }

        return false;
    }

    return true;
}

function search(item, query) {
    const name = item.name.toLowerCase();

    if (fuzzy(query, name)) {
        return true;
    }

    return item.groupName && fuzzy(query, item.groupName.toLowerCase());
}

export default function fuzzySearch(options, query) {
    if (!query.length) {
        return options;
    }

    const q = query.toLowerCase();

    return options.filter((option) => search(option, q));
}
