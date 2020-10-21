import React from 'react';
import SelectSearch from '../src';
import '../style.css';
import { countries } from './data';

export default {
  title: 'Single select',
};

export const Default = () => (
    <SelectSearch
        id="test-id"
        options={[
          { value: 's', name: 'Small' },
          { value: 'm', name: 'Medium' },
          { value: 'l', name: 'Large' },
        ]}
    />
);

export const withPlaceholder = () => (
    <SelectSearch
        options={[
            { value: 's', name: 'Small' },
            { value: 'm', name: 'Medium' },
            { value: 'l', name: 'Large' },
        ]}
        placeholder="Choose a size"
    />
);

export const Search = () => (
    <SelectSearch
        options={countries}
        search
        placeholder="Select your country"
    />
);

export const SearchWithEmptyMessage = () => (
    <SelectSearch
        options={countries}
        search
        emptyMessage="Not found"
        placeholder="Select your country"
    />
);

export const SearchWithEmptyMessageRenderer = () => (
    <SelectSearch
        options={countries}
        search
        emptyMessage={() => <div style={{ textAlign: 'center', fontSize: '0.8em' }}>Not found renderer</div>}
        placeholder="Select your country"
    />
);

export const AlwaysOpen = () => (
    <SelectSearch
        options={[
            { value: 's', name: 'Small' },
            { value: 'm', name: 'Medium' },
            { value: 'l', name: 'Large' },
        ]}
        printOptions="always"
    />
);

export const StayOnSelect = () => (
    <SelectSearch
        closeOnSelect={false}
        options={[
            { value: 's', name: 'Small' },
            { value: 'm', name: 'Medium' },
            { value: 'l', name: 'Large' },
        ]}
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
    />
);
