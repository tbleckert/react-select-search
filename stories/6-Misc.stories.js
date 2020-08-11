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
