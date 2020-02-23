import GroupOptions from '../src/lib/groupOptions';

describe('Unit test for GroupOptions function', () => {
    const flattenOptions = [
        {
            "name": "Monoton",
            "value": "monoton",
            "groupId": "v6kufti7z",
            "groupName": "Cursive"
        },
        {
            "name": "Helvetica",
            "value": "helvetica",
        },
        {
            "name": "Gloria Hallelujah",
            "value": "gloria",
            "groupId": "v6kufti7z",
            "groupName": "Cursive"
        },
    ];

    const groupedOptions = GroupOptions(flattenOptions);

    test('Has correct amount of items', () => {
        expect(groupedOptions.length).toEqual(2);
    });

    test('First item should be a group', () => {
        expect(groupedOptions[0].groupId).toEqual('v6kufti7z');
        expect('items' in groupedOptions[0]).toEqual(true);
    });

    test('Group should have correct amount of items', () => {
        expect(groupedOptions[0].items.length).toEqual(2);
    });

    test('Last item should not be a group', () => {
        expect('items' in groupedOptions[1]).toEqual(false);
    });
});
