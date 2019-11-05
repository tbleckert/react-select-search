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
const classes = {
    main: 'select-search',
    value: 'value',
    input: 'input',
    select: 'select',
    options: 'options',
    row: 'row',
    option: 'option',
    group: 'group',
    groupHeader: 'group-header',
};

describe('Test select component class methods', () => {
    test('Can pass className object', () => {
        const wrapper = shallow(<SelectSearch className={classes} defaultValue="SE" options={countries} />);

        expect(wrapper.instance().theme.classes).toStrictEqual(classes);
    });

    test('getValue', () => {
        const wrapper = shallow(<SelectSearch className={className} defaultValue="SE" options={countries} />);
        expect(wrapper.instance().getValue()).toBe('SE');

        const wrapper2 = shallow(<SelectSearch className={className} multiple defaultValue="SE" options={countries} />);
        expect(wrapper2.instance().getValue()).toStrictEqual(['SE']);

        const wrapper3 = shallow(<SelectSearch className={className} multiple options={countries} />);

        expect(wrapper3.state('value')).toStrictEqual([]);

        wrapper3.setState({ value: null });

        expect(wrapper3.update().instance().getValue()).toStrictEqual([]);
    });

    test('onBlur shouldn\'t trigger handleBlur if related target is within component', () => {
        const wrapper = mount(<SelectSearch className={className} options={countries} />);
        const spy = jest.spyOn(wrapper.instance(), 'handleBlur');

        wrapper.instance().onBlur({ relatedTarget: null });
        expect(spy.mock.calls.length).toBe(1);

        wrapper.instance().onBlur({ relatedTarget: document.body });
        expect(spy.mock.calls.length).toBe(2);

        wrapper.instance().onBlur({ relatedTarget: wrapper.find('input').at(0).instance() });

        expect(spy.mock.calls.length).toBe(2);
    });

    test('onKeyPress should only trigger onChange if correct key', () => {
        const wrapper = mount(<SelectSearch className={className} options={countries} />);
        const spy = jest.spyOn(wrapper.instance(), 'onChange');

        wrapper.instance().onKeyPress({ key: 'Tab' });
        expect(spy.mock.calls.length).toBe(0);

        wrapper.instance().onKeyPress({ key: 'Enter' });
        expect(spy.mock.calls.length).toBe(1);
    });

    test('onKeyUp should only trigger handleBlur if correct key', () => {
        const wrapper = mount(<SelectSearch className={className} options={countries} />);
        const spy = jest.spyOn(wrapper.instance(), 'handleBlur');

        wrapper.instance().onKeyUp({ key: 'Tab' });
        expect(spy.mock.calls.length).toBe(0);

        wrapper.instance().onKeyUp({ key: 'Escape' });
        expect(spy.mock.calls.length).toBe(1);
    });

    test('Can use default fuse options', (done) => {
        const wrapper = mount(<SelectSearch className={className} options={countries} />);
        const spy = jest.spyOn(wrapper.instance(), 'fuzzySearch');

        wrapper.instance().getNewOptionsList(wrapper.state('options'), 'Sweden')
            .then((response) => {
                expect(spy.mock.calls.length).toBe(1);
                expect(spy.mock.calls[0][2]).toStrictEqual({
                    keys: ['name', 'groupName'],
                    threshold: 0.3,
                });

                done();
            });
    });

    test('Can use custom fuse options', (done) => {
        const fuse = {
            keys: ['name'],
            threshold: 0.8,
        };

        const wrapper = mount(<SelectSearch className={className} fuse={fuse} options={countries} />);
        const spy = jest.spyOn(wrapper.instance(), 'fuzzySearch');

        wrapper.instance().getNewOptionsList(wrapper.state('options'), 'Sweden')
            .then((response) => {
                expect(spy.mock.calls.length).toBe(1);
                expect(spy.mock.calls[0][2]).toStrictEqual(fuse);

                done();
            });
    });

    test('Single selects without placeholder should have the first option selected by default', () => {
        const wrapper = shallow(<SelectSearch className={className} options={countries} />);

        expect(wrapper.state('value')).toBe(countries[0].value);

        wrapper.setState({ value: '' });
        expect(wrapper.state('value')).toBe('');

        expect(wrapper.instance().getValue()).toBe(countries[0].value);
    });
});
