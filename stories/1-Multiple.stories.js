import React from 'react';
import SelectSearch from '../src';
import '../style.css';
import { countries } from './data';

export default {
  title: 'Multiple select',
};

export const Default = () => (
    <SelectSearch
        options={[
            { value: 'hamburger', name: 'Hamburger' },
            { value: 'fries', name: 'Fries' },
            { value: 'milkshake', name: 'Milkshake' },
        ]}
        multiple
    />
);

export const WithPlaceholder = () => (
    <SelectSearch
        options={[
            { value: 'hamburger', name: 'Hamburger' },
            { value: 'fries', name: 'Fries' },
            { value: 'milkshake', name: 'Milkshake' },
        ]}
        multiple
        placeholder="Select your items"
    />
);

export const Search = () => (
    <SelectSearch
        options={countries}
        multiple
        search
        placeholder="Select your country"
    />
);

export const Group = () => (
    <SelectSearch
        options={[
            {
                name: 'Food',
                type: 'group',
                items: [{
                    value: 'hamburger',
                    name: 'Hamburger',
                }, {
                    value: 'pizza',
                    name: 'Pizza',
                }]
            },
            {
                name: 'Drinks',
                type: 'group',
                items: [{
                    value: 'soft',
                    name: 'Soft drink',
                }, {
                    value: 'beer',
                    name: 'Beer',
                }]
            }
        ]}
        multiple
    />
);
