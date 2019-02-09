import React from 'react';
import Enzyme, { mount } from 'enzyme';
import GroupOptions from '../src/GroupOptions';

describe('GroupOptions function tests', () => {
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