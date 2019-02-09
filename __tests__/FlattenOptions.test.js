import React from 'react';
import Enzyme, { mount } from 'enzyme';
import FlattenOptions from '../src/FlattenOptions';

describe('FlattenOptions function tests', () => {
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