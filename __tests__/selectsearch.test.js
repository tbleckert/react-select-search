import test from 'ava';
import React from 'react';
import { mount } from 'enzyme';
import SelectSearch from '../src';
import { countries, friends } from './data';


const component = mount(<SelectSearch name="country" options={countries} value="SE" />);

test('has search field', (t) => {
    t.is(component.find('.select-search-box__search').length, 1);
});

test('default selected should be Sweden', (t) => {
    t.is(component.find('.select-search-box__search').props().value, 'Sweden');
});

test('displays options on focus', (t) => {
    component.find('.select-search-box__search').simulate('focus');
    
    t.is(component.find('.select-search-box__option').length, 243);
});

test('search field on focus should be empty', (t) => {
    t.is(component.find('.select-search-box__search').props().value, '');
});

const search = 'Ital';

test('empties search field on focus', (t) => {
    component.find('.select-search-box__search').simulate('change', { target: { value: search } });

    t.is(component.find('.select-search-box__option').length, 2);
});

test('not empties search field after entering', (t) => {
    t.is(component.find('.select-search-box__search').props().value, search);
});

test('select another option', (t) => {
    component.find('.select-search-box__search').simulate('blur');
    component.find('.select-search-box__search').simulate('focus');
    component.find('.select-search-box__option[data-value="BH"]').simulate('click');
    
    t.is(component.find('.select-search-box__search').props().value, 'Bahrain');
});