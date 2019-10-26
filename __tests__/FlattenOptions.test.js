import FlattenOptions from '../src/lib/FlattenOptions';

describe('Unit test for FlattenOptions function', () => {
    const groupedOptions = [
        {
            "type": "group",
            "name": "Cursive",
            "items": [
                {
                    "name": "Monoton",
                    "value": "Monoton",
                },
            ]
        },
        {
            "name": "Gloria Hallelujah",
            "value": "Gloria Hallelujah",
        },
    ];

    const flattenOptions = FlattenOptions(groupedOptions);

    test('Has correct items', () => {
        expect(flattenOptions).toHaveLength(2);
    });

    test('First item should be a group', () => {
        expect('groupId' in flattenOptions[0]).toEqual(true);
    });

    test('Second item should not be a group', () => {
        expect('groupId' in flattenOptions[1]).toEqual(false);
    });
});
