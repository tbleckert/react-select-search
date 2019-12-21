import findGroupIndex from '../src/lib/findGroupIndex';

describe('Unit test for GroupOptions function', () => {
    const groupedOptions = [
        {
            "type": "group",
            "name": "Serif",
            "groupId": "serif",
            "items": [
                {
                    "name": "Playfair Display",
                    "value": "playfair",
                },
            ]
        },
        {
            "type": "group",
            "name": "Cursive",
            "groupId": "cursive",
            "items": [
                {
                    "name": "monoton",
                    "value": "monoton",
                },
            ]
        }
    ];

    test('Finds correct index in group', () => {
        const serifIndex = findGroupIndex(groupedOptions, 'serif');
        const cursiveIndex = findGroupIndex(groupedOptions, 'cursive');

        expect(serifIndex).toEqual(0);
        expect(cursiveIndex).toEqual(1);
    });

    test('Returns null on not found', () => {
        const index = findGroupIndex(groupedOptions, 'foo');

        expect(index).toEqual(null);
    });
});
