import React from 'react';
import SelectSearch from '../src';
import '../style.css';
import { colors, countries, food } from './data';

export default {
    title: 'Multiple',
    component: SelectSearch,
    args: {
        multiple: true,
    },
};

const Template = (args) => <SelectSearch {...args} />;

export const Default = Template.bind({});

Default.args = {
    options: colors,
};

export const Search = Template.bind({});

Search.args = {
    placeholder: 'Search country',
    search: true,
    options: countries,
};

export const Grouped = Template.bind({});

Grouped.args = {
    options: food,
};
