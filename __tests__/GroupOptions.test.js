import GroupOptions from '../src/lib/GroupOptions';

describe('Unit test for GroupOptions function', () => {
    const flattenOptions = [
        {
            "name": "Monoton",
            "value": "Monoton",
            "data-stack": "Monoton, cursive",
            "groupId": "v6kufti7z",
            "groupName": "Cursive"
        },
        {
            "name": "Gloria Hallelujah",
            "value": "Gloria Hallelujah",
            "data-stack": "\"Gloria Hallelujah\", cursive",
            "groupId": "v6kufti7z",
            "groupName": "Cursive"
        }
    ];

    const groupedOptions = GroupOptions(flattenOptions);

    test('first element of group options must have a non-empty property "items"', () => {
        expect(groupedOptions[0].items).toHaveLength(2);
    });
});
