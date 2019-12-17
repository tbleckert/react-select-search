import FindGroupIndex from '../src/lib/FindGroupIndex';

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
        const serifIndex = FindGroupIndex(groupedOptions, 'serif');
        const cursiveIndex = FindGroupIndex(groupedOptions, 'cursive');

        expect(serifIndex).toEqual(0);
        expect(cursiveIndex).toEqual(1);
    });

    test('Returns null on not found', () => {
        const index = FindGroupIndex(groupedOptions, 'foo');

        expect(index).toEqual(null);
    });
});
