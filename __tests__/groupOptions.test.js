import GroupOptions from '../src/lib/groupOptions';

describe('Unit test for GroupOptions function', () => {
    const flattenOptions = [
        {
            "name": "Monoton",
            "value": "monoton",
            "group": "Cursive"
        },
        {
            "name": "Helvetica",
            "value": "helvetica",
        },
        {
            "name": "Gloria Hallelujah",
            "value": "gloria",
            "group": "Cursive"
        },
    ];

    const groupedOptions = GroupOptions(flattenOptions);

    test('Has correct amount of items', () => {
        expect(groupedOptions.length).toEqual(2);
    });

    test('First item should be a group', () => {
        expect(groupedOptions[0].type).toEqual('group');
        expect(groupedOptions[0].name).toEqual('Cursive');
        expect('items' in groupedOptions[0]).toEqual(true);
    });

    test('Group should have correct amount of items', () => {
        expect(groupedOptions[0].items.length).toEqual(2);
    });

    test('Last item should not be a group', () => {
        expect('items' in groupedOptions[1]).toEqual(false);
    });
});
