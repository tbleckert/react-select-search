function fuzzy(q, text) {
    const searchLength = q.length;
    const textLength = text.length;

    if (searchLength > textLength) {
        return false;
    }

    if (text.indexOf(q) >= 0) {
        return true;
    }

    let match = true;

    for (let i = 0, j = 0; i < searchLength; i += 1) {
        const ch = q.charCodeAt(i);

        while (j < textLength) {
            // eslint-disable-next-line no-plusplus
            if (text.charCodeAt(j++) === ch) {
                break;
            }

            match = false;
        }

        if (!match) {
            return false;
        }
    }

    return true;
}

function search(item, query) {
    const name = item.name.toLowerCase();

    return fuzzy(query, name);
}

export default function fuzzySearch(options) {
    return (query) => {
        if (!query.length) {
            return options;
        }

        const q = query.toLowerCase();

        return options.filter((option) => search(option, q));
    };
}
