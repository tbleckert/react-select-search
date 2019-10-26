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
                    "data-stack": "Monoton, cursive"
                },
                {
                    "name": "Gloria Hallelujah",
                    "value": "Gloria Hallelujah",
                    "data-stack": "\"Gloria Hallelujah\", cursive"
                }
            ]
        }
    ];

    const flattenOptions = FlattenOptions(groupedOptions);

    test('first element of group options must have a non-empty property "items"', () => {
        expect(flattenOptions).toHaveLength(2);
    });
});
