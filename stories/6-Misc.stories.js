import React from 'react';
import SelectSearch from '../src';
import '../style.css';
import { countries } from './data';

export default {
  title: 'Misc',
};

export const NumericValues = () => (
    <SelectSearch
        value={0}
        options={[
            { value: 1, name: 'Second' },
            { value: 0, name: 'First' },
            { value: 'third', name: 'Third' },
        ]}
    />
);

export const Form = () => (
    <>
        <div style={{ marginBottom: '16px' }}>
            <SelectSearch
                printOptions="on-focus"
                multiple
                placeholder="Select your items"
                options={[
                    { value: 'hamburger', name: 'Hamburger' },
                    { value: 'fries', name: 'Fries' },
                    { value: 'milkshake', name: 'Milkshake' },
                ]}
            />
        </div>
        <SelectSearch
            options={[
                { value: 's', name: 'Small' },
                { value: 'm', name: 'Medium' },
                { value: 'l', name: 'Large' },
            ]}
        />
    </>
);
