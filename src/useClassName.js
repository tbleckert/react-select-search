import { useMemo } from 'react';

export default function useClassName(className) {
    return useMemo(() => {
        if (typeof className === 'string') {
            const [base] = className.split(' ');
            const bem = (k) => `${base}__${k}`;

            return {
                container: className,
                value: bem('value'),
                input: bem('input'),
                select: bem('select'),
                options: bem('options'),
                option: bem('option'),
                group: bem('group'),
                'group-header': bem('group-header'),
                'is-selected': 'is-selected',
                'is-highlighted': 'is-highlighted',
                'is-loading': 'is-loading',
                'has-focus': 'has-focus',
            };
        }

        return className;
    }, [className]);
}
