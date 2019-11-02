import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import { countries, fontStacks, friends } from './data';
import './helpers/setup-enzyme';
import './helpers/setup-browser-env';
import Adapter from 'enzyme-adapter-react-16';
import SelectSearch from '../src/SelectSearch';
import Value from '../src/Components/Value';
import Group from '../src/Components/Group';
import Options from '../src/Components/Options';
import Option from '../src/Components/Option';

const className = 'select-search';
const random = (source) => Math.floor(Math.random() * source.length);

describe('Test select component', () => {
    test('Renders element', () => {
        const wrapper = mount(<SelectSearch className={className} options={countries} />);

        expect(wrapper.find(`div.${className}`).length).toBe(1);
        expect(wrapper.find(Value).length).toBe(1);
    });

    test('Sets correct default for controlled select', () => {
        const wrapper = mount(<SelectSearch
            className={className}
            options={countries}
            value="SE"
            defaultValue="IT"
            onChange={() => {}}
        />);

        expect(wrapper.state('value')).toBe('SE');
    });

    test('Sets correct default for uncontrolled select', () => {
        const wrapper = mount(<SelectSearch
            className={className}
            options={countries}
            value="SE"
            defaultValue="IT"
        />);

        expect(wrapper.state('value')).toBe('IT');
    });

    test('Value is first option if no placeholder', () => {
        const wrapper = mount(<SelectSearch className={className} options={countries} />);

        expect(wrapper.state('value')).toBe(countries[0].value);
        expect(wrapper.find(Value).find('input').at(0).instance().value).toBe(countries[0].name);
    });

    test('Value is empty if placeholder', () => {
        const wrapper = mount(<SelectSearch className={className} placeholder="Select" options={countries} />);

        expect(wrapper.state('value')).toBe('');
        expect(wrapper.find(Value).find('input').at(0).instance().value).toBe('');
    });

    test('Value is readonly', () => {
        const wrapper = mount(<SelectSearch className={className} options={countries} />);

        expect(wrapper.find('input').at(0).instance().hasAttribute('readonly')).toBe(true);
    });

    test('Displays options on focus', () => {
        const wrapper = mount(<SelectSearch className={className} options={countries} />);

        expect(wrapper.childAt(0).hasClass('has-focus')).toBe(false);

        wrapper.find('input').simulate('focus');

        expect(wrapper.find(Options).length).toBe(1);
        expect(wrapper.find(Option).length).toBe(countries.length);
        expect(wrapper.childAt(0).hasClass('has-focus')).toBe(true);
    });

    test('Displays options containing groups on focus', () => {
        const wrapper = mount(<SelectSearch className={className} options={fontStacks} />);

        expect(wrapper.childAt(0).hasClass('has-focus')).toBe(false);

        wrapper.find('input').simulate('focus');

        expect(wrapper.find(Options).length).toBe(5);
        expect(wrapper.find(Group).length).toBe(4);
        expect(wrapper.find(Option).length).toBe(10);
        expect(wrapper.childAt(0).hasClass('has-focus')).toBe(true);
    });

    test('Selects option on click and closes', () => {
        const wrapper = mount(<SelectSearch className={className} options={countries} />);

        wrapper.find('input').simulate('focus');
        wrapper.find(Option).at(10).find('button').simulate('click');

        expect(wrapper.state('value')).toBe(countries[10].value);
        expect(wrapper.state('focus')).toBe(false);
        expect(wrapper.find(Options).length).toBe(0);
        expect(wrapper.find(Value).find('input').at(0).instance().value).toBe(countries[10].name);

        wrapper.find('input').simulate('focus');
        wrapper.find(Option).at(11).find('button').simulate('click');

        expect(wrapper.state('value')).toBe(countries[11].value);
        expect(wrapper.find(Value).find('input').at(0).instance().value).toBe(countries[11].name);
    });

    test('Can disable', () => {
        const wrapper = mount(<SelectSearch className={className} disabled options={countries} />);

        wrapper.find('input').simulate('focus');

        expect(wrapper.find(`div.${className}.is-disabled`).length).toBe(1);
        expect(wrapper.state('focus')).toBe(false);
        expect(wrapper.find(Options).length).toBe(0);
    });

    test('Can disable single options', () => {
        const options = countries.slice();

        options[10].disabled = true;

        const wrapper = mount(<SelectSearch className={className} placeholder="Select" options={options} />);

        wrapper.find('input').simulate('focus');
        wrapper.find(Option).at(10).find('button').simulate('click');

        expect(wrapper.state('focus')).toBe(true);
        expect(wrapper.state('value')).toBe('');
        expect(wrapper.find(Option).at(10).find('li').hasClass('is-disabled')).toBe(true);
    });

    test('Search renders correctly', () => {
        const placeholder = 'Search';
        const wrapper = mount(<SelectSearch className={className} search placeholder={placeholder} options={countries} />);

        expect(wrapper.find(`div.${className}--search`).length).toBe(1);
        expect(wrapper.state('value')).toBe('');
        expect(wrapper.find('input').instance().getAttribute('placeholder')).toBe(placeholder);
        expect(wrapper.find('input').at(0).instance().hasAttribute('readonly')).toBe(false);
    });

    test('Search value is first option if no placeholder', () => {
        const wrapper = mount(<SelectSearch className={className} search options={countries} />);

        expect(wrapper.state('value')).toBe(countries[0].value);
        expect(wrapper.find('input').instance().value).toBe(countries[0].name);
    });

    test('Clears input value if search on focus', () => {
        const wrapper = mount(<SelectSearch className={className} search options={countries} />);

        expect(wrapper.state('value')).toBe(countries[0].value);
        expect(wrapper.find('input').instance().value).toBe(countries[0].name);

        wrapper.find('input').simulate('focus');

        expect(wrapper.state('value')).toBe(countries[0].value);
        expect(wrapper.find('input').instance().value).toBe('');
    });

    test('Can autocous', () => {
        const wrapper = mount(<SelectSearch className={className} search autoFocus options={countries} />);

        expect(wrapper.find('input:focus').length).toBe(1);
        expect(wrapper.state('focus')).toBe(true);
        expect(wrapper.find(Options).length).toBe(1);
        expect(wrapper.find(Option).length).toBe(countries.length);
        expect(wrapper.childAt(0).hasClass('has-focus')).toBe(true);
    });

    test('Can search', (done) => {
        const wrapper = mount(<SelectSearch className={className} search options={countries} />);

        wrapper.find('input').simulate('focus');
        wrapper.find('input').simulate('change', {
            target: { value: 'Sweden' }
        });

        setImmediate(() => {
            expect(wrapper.state('search')).toBe('Sweden');
            expect(wrapper.update().find(Option).length).toBe(1);

            done();
        });
    });

    test('Multiple renders correctly', () => {
        const wrapper = mount(<SelectSearch className={className} multiple options={countries} />);

        expect(wrapper.find(`div.${className}--multiple`).length).toBe(1);
        expect(wrapper.find(Options).length).toBe(1);
        expect(wrapper.find(Option).length).toBe(countries.length);
        expect(wrapper.state('value')).toStrictEqual([]);
        expect(wrapper.find(Value).length).toBe(0);
    });

    test('Multiple can select and deselect option', () => {
        const wrapper = mount(<SelectSearch className={className} multiple options={countries} />);

        wrapper.find(Option).at(11).find('button').simulate('click');
        expect(wrapper.state('value')).toStrictEqual([countries[11].value]);
        expect(wrapper.find(`.${className}__option.is-selected`).length).toBe(1);

        wrapper.find(Option).at(11).find('button').simulate('click');
        expect(wrapper.state('value')).toStrictEqual([]);
        expect(wrapper.find(`.${className}__option.is-selected`).length).toBe(0);
    });

    test('Multiple can select multiple options', () => {
        const wrapper = mount(<SelectSearch className={className} multiple options={countries} />);

        wrapper.find(Option).at(11).find('button').simulate('click');
        expect(wrapper.state('value')).toStrictEqual([countries[11].value]);
        expect(wrapper.find(`.${className}__option.is-selected`).length).toBe(1);

        wrapper.find(Option).at(12).find('button').simulate('click');
        expect(wrapper.state('value')).toStrictEqual([countries[11].value, countries[12].value]);
        expect(wrapper.find(`.${className}__option.is-selected`).length).toBe(2);
    });

    test('Multiple can have search', () => {
        const wrapper = mount(<SelectSearch className={className} search multiple options={countries} />);

        expect(wrapper.find(Value).length).toBe(1);
    });

    test('Can highlight options with keyboard', () => {
        const wrapper = mount(<SelectSearch className={className} options={countries} />);
        expect(wrapper.state('highlighted')).toBe(null);

        wrapper.find('input').simulate('focus');
        wrapper.find('input').simulate('keydown', { keyCode: 40 });

        expect(wrapper.state('highlighted')).toBe(0);

        wrapper.find('input').simulate('keydown', { keyCode: 40 });
        expect(wrapper.state('highlighted')).toBe(1);

        wrapper.find('input').simulate('keydown', { keyCode: 38 });
        expect(wrapper.state('highlighted')).toBe(0);

        wrapper.find('input').simulate('keydown', { keyCode: 38 });
        expect(wrapper.state('highlighted')).toBe(countries.length - 1);

        wrapper.find('input').simulate('keydown', { keyCode: 38 });
        expect(wrapper.state('highlighted')).toBe(countries.length - 2);

        wrapper.find('input').simulate('keydown', { keyCode: 40 });
        wrapper.find('input').simulate('keydown', { keyCode: 40 });
        expect(wrapper.state('highlighted')).toBe(0);
    });

    test('Can select highlighted options with keyboard', () => {
        const wrapper = mount(<SelectSearch className={className} options={countries} />);
        expect(wrapper.state('highlighted')).toBe(null);

        wrapper.find('input').simulate('focus');
        wrapper.find('input').simulate('keydown', { keyCode: 40 });
        wrapper.find('input').simulate('keydown', { keyCode: 40 });

        expect(wrapper.state('highlighted')).toBe(1);

        wrapper.find('input').simulate('keypress', { keyCode: 13 });

        expect(wrapper.state('value')).toBe(countries[1].value);
        expect(wrapper.state('focus')).toBe(false);
    });

    test('Blurs on esc and tab', () => {
        const wrapper = mount(<SelectSearch className={className} options={countries} />);
        expect(wrapper.state('highlighted')).toBe(null);

        wrapper.find('input').simulate('focus');
        expect(wrapper.state('focus')).toBe(true);

        // esc
        wrapper.find('input').simulate('keyup', { keyCode: 27 });
        expect(wrapper.state('focus')).toBe(false);

        wrapper.find('input').simulate('focus');
        expect(wrapper.state('focus')).toBe(true);

        // tab
        wrapper.find('input').simulate('keydown', { keyCode: 9 });
        expect(wrapper.state('focus')).toBe(false);
    });
});
