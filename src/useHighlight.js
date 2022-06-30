import { useState } from 'react';
import highlight from './lib/highlight';

export default function useHighlight(options, onSelect, ref) {
    const [highlighted, setHighlighted] = useState(-1);

    return [
        {
            onKeyDown: (e) => {
                const key = e.key.replace('Arrow', '').toLowerCase();

                if (key === 'down' || key === 'up') {
                    e.preventDefault();
                    setHighlighted(highlight(highlighted, key, options));
                }
            },
            onKeyUp: (e) => {
                if (e.key === 'Escape') {
                    e.preventDefault();
                    ref.current.blur();
                } else if (e.key === 'Enter') {
                    e.preventDefault();

                    if (options[highlighted]) {
                        onSelect(options[highlighted].value);
                    }
                }
            },
        },
        highlighted,
        setHighlighted,
    ];
}
