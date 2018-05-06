import test from 'ava';
import React from 'react';
import { mount } from 'enzyme';
import SelectSearch from '../src';

const options = [{ name: 'Sweden', value: 'SE' }, { name: 'Italy', value: 'IT' }];

test('has search field', (t) => {
    const component = mount(<SelectSearch name="country" options={options} value="SE" />);

    t.is(component.find('.select-search-box__search').length, 1);
});

test('displays options on focus', (t) => {
    const component = mount(<SelectSearch name="country" options={options} value="SE" />);

    component.find('.select-search-box__search').simulate('focus');

    t.is(component.find('.select-search-box__option').length, 2);
});

test('empties search field on focus', (t) => {
    const component = mount(<SelectSearch name="country" options={options} value="SE" />);
    const search = 'Italy';

    t.is(component.find('.select-search-box__search').props().value, 'Sweden');

    component.find('.select-search-box__search').simulate('focus');

    t.is(component.find('.select-search-box__search').props().value, '');

    component.find('.select-search-box__search').simulate('change', { target: { value: search } });

    t.is(component.find('.select-search-box__search').props().value, search);
});
