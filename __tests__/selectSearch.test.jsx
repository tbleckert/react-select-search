import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import { countries, fontStacks, friends } from './data';
import './helpers/setup-enzyme';
import './helpers/setup-browser-env';
import Adapter from 'enzyme-adapter-react-16';
import SelectSearch from '../src';
import SelectSearchComponent from '../src/SelectSearch';
import Value from '../src/Components/Value';
import Options from '../src/Components/Options';
import Option from '../src/Components/Option';

const className = 'select-search';
const random = (source) => Math.floor(Math.random() * source.length);

describe('Test component', () => {
    test('Renders element', () => {
        const wrapper = mount(<SelectSearch className={className} options={countries} />);

        expect(wrapper.find(`div.${className}`).length).toBe(1);
    });

    test('Has correct modifiers', () => {
        const wrapper = mount(<SelectSearch search multiple className={className} options={countries} />);

        expect(wrapper.find(`div.${className}`).hasClass(`${className}--search`)).toBe(true);
        expect(wrapper.find(`div.${className}`).hasClass(`${className}--multiple`)).toBe(true);
        expect(wrapper.find(`div.${className}`).hasClass(`${className}--disabled`)).toBe(false);
        expect(wrapper.find(`div.${className}`).hasClass(`${className}--focus`)).toBe(false);

        wrapper.find('input').at(0).simulate('click');

        expect(wrapper.find(`div.${className}`).hasClass(`has-focus`)).toBe(true);

        const wrapper2 = mount(<SelectSearch disabled className={className} options={countries} />);

        expect(wrapper2.find(`div.${className}`).hasClass(`${className}--search`)).toBe(false);
        expect(wrapper2.find(`div.${className}`).hasClass(`${className}--multiple`)).toBe(false);
        expect(wrapper2.find(`div.${className}`).hasClass(`${className}--disabled`)).toBe(true);
    });

    test('Renders value element', () => {
        const wrapper = mount(<SelectSearch className={className} options={countries} />);

        expect(wrapper.find(Value).length).toBe(1);
        expect(wrapper.find(Value).at(0).prop('readOnly')).toBe(true);
    });

    test('Value element has correct default value', () => {
        const option = countries[Math.floor(Math.random() * countries.length)];
        const wrapper = mount(<SelectSearch className={className} defaultValue={option.value} options={countries} />);
        const valueComp = wrapper.find(Value).at(0);

        expect(valueComp.prop('value')).toBe(option.name);
    });

    test('Options displayed on focus', () => {
        const option = countries[Math.floor(Math.random() * countries.length)];
        const wrapper = mount(<SelectSearch className={className} defaultValue={option.value} options={countries} />);
        const valueComp = wrapper.find(Value).at(0);

        expect(wrapper.find(Options).length).toBe(0);
        expect(wrapper.find(Option).length).toBe(0);

        valueComp.find('input').simulate('focus');

        expect(wrapper.find(Options).length).toBe(1);
        expect(wrapper.find(Option).length).toBe(countries.length);
    });

    test('Can select option', () => {
        const option = countries[random(countries)];
        const wrapper = mount(<SelectSearch className={className} defaultValue={option.value} options={countries} />);

        wrapper.find('input').at(0).simulate('click');

        const selected = random(countries);
        const selectedOption = wrapper.find(Option).at(selected);

        selectedOption.find('button').simulate('click');

        expect(wrapper.find('input').at(0).prop('value')).toBe(countries[selected].name);
    });

    test('Test controlled input', () => {
        const mockCallback = jest.fn();
        const wrapper = mount(<SelectSearch className={className} defaultValue='SE' value='' onChange={mockCallback} options={countries} />);

        expect(wrapper.find('input').at(0).prop('value')).toBe('');

        wrapper.find('input').at(0).simulate('click');

        const selected = random(countries);
        const selectedOption = wrapper.find(Option).at(selected);

        selectedOption.invoke('onChange')();

        expect(mockCallback.mock.calls.length).toBe(1);
        expect(mockCallback.mock.calls[0][0]).toBe(countries[selected].value);
        expect(mockCallback.mock.calls[0][1]).toStrictEqual({ ...countries[selected], index: selected });
        expect(wrapper.find('input').at(0).prop('value')).toBe('');
    });

    test('Test uncontrolled input', () => {
        const wrapper = mount(<SelectSearch className={className} defaultValue='SE' value='' options={countries} />);

        expect(wrapper.find('input').at(0).prop('value')).toBe('Sweden');
        expect(wrapper.childAt(0).childAt(0).prop('onChange')).toBe(null);

        wrapper.find('input').at(0).simulate('click');

        const selected = random(countries);
        const selectedOption = wrapper.find(Option).at(selected);

        selectedOption.invoke('onChange')();

        expect(wrapper.find('input').at(0).prop('value')).toBe(countries[selected].name);
    });

    test('Can search', () => {
        const option = countries[random(countries)];
        const wrapper = mount(<SelectSearch search className={className} defaultValue={option.value} options={countries}/>);

        expect(wrapper.find('input').at(0).prop('readonly')).toBe(undefined);
        expect(wrapper.find('input').at(0).prop('value')).toBe(option.name);

        wrapper.find('input').at(0).simulate('focus');

        expect(wrapper.find('input').at(0).prop('value')).toBe('');
        expect(wrapper.find(Option).length).toBe(countries.length);

        wrapper.find('input').simulate('change', { target: { value: 'sweden' }});

        expect(wrapper.find(Option).length).toBe(1);
    });

    test('Search empty on focus', () => {
        const option = countries[random(countries)];
        const wrapper = mount(<SelectSearch search className={className} defaultValue={option.value} options={countries} />);
        const input = wrapper.find('input').at(0);

        expect(input.prop('value')).toBe(option.name);

        wrapper.find('input').at(0).simulate('focus');

        expect(wrapper.find('input').at(0).prop('value')).toBe('');

        wrapper.childAt(0).childAt(0).setState({ focus: false });

        expect(wrapper.find('input').at(0).prop('value')).toBe(option.name);
    });

    test('Can highlight option', () => {
        const highlighted = random(countries);
        const wrapper = mount(<SelectSearch className={className} options={countries} />);
        const scrollIntoViewMock = jest.fn();

        global.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;

        wrapper.find('input').at(0).simulate('focus');

        expect(scrollIntoViewMock.mock.calls.length).toBe(0);

        wrapper.childAt(0).childAt(0).setState({ highlighted });

        expect(scrollIntoViewMock.mock.calls.length).toBe(1);
        expect(wrapper.find('.is-highlighted').length).toBe(1);
    });

    test('Scrolls into view on selected option', () => {
        const selected = random(countries);
        const wrapper = mount(<SelectSearch className={className} defaultValue={countries[selected].value} options={countries} />);
        const scrollIntoViewMock = jest.fn();

        global.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;

        wrapper.find('input').at(0).simulate('focus');

        expect(scrollIntoViewMock.mock.calls.length).toBe(1);
        expect(wrapper.find('.is-selected').length).toBe(1);
    });
});
