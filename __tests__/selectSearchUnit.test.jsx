import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import { countries, fontStacks, friends } from './data';
import './helpers/setup-enzyme';
import './helpers/setup-browser-env';
import SelectSearch from '../src/SelectSearch';

const className = 'select-search';
const random = (source) => Math.floor(Math.random() * source.length);
const customClasses = {
    main: 'container',
    search: 'search',
    select: 'select',
    options: 'options',
    row: 'row',
    option: 'option',
    group: 'group',
    groupHeader: 'group-header',
};

afterEach(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
});

describe('Test component', () => {
    test('Can set classes', () => {
        const wrapper = shallow(<SelectSearch className={className} options={countries} />);

        expect(wrapper.instance().theme.classes).toStrictEqual({
            main: 'select-search',
            search: 'select-search__search',
            select: 'select-search__select',
            options: 'select-search__options',
            row: 'select-search__row',
            option: 'select-search__option',
            group: 'select-search__group',
            groupHeader: 'select-search__group-header',
        });

        const wrapper2 = shallow(<SelectSearch className={customClasses} options={countries} />);

        expect(wrapper2.instance().theme.classes).toStrictEqual(customClasses);
    });

    test('First option should be selected if no placeholder', () => {
        const wrapper = shallow(<SelectSearch className={className} options={countries} />);

        expect(wrapper.state('value')).toBe(countries[0].value);
    });

    test('First option should be selected on enter without highlight option', () => {
        const wrapper = shallow(<SelectSearch className={className} placeholder="Select country" options={countries} />);

        expect(wrapper.state('value')).toBe('');

        wrapper.instance().handleEnter();

        expect(wrapper.state('value')).toBe(countries[0].value);
    });

    test('Highlight option should be selected on enter', () => {
        const wrapper = shallow(<SelectSearch className={className} placeholder="Select country" options={countries} />);

        expect(wrapper.state('value')).toBe('');

        const highlighted = random(countries);

        wrapper.setState({ highlighted });
        wrapper.instance().handleEnter();

        expect(wrapper.state('value')).toBe(countries[highlighted].value);
    });

    test('Blur should reset values', () => {
        const wrapper = shallow(<SelectSearch className={className} options={countries} />);
        const state = { focus: true, highlighted: 1, search: 'A' };

        wrapper.setState(state);
        wrapper.instance().onBlur();

        expect(wrapper.state('focus')).toBe(false);
        expect(wrapper.state('highlighted')).toBe(null);
        expect(wrapper.state('search')).toBe('');
    });

    test('Blur should not be handled if disabled', () => {
        const wrapper = shallow(<SelectSearch className={className} disabled options={countries} />);
        const state = { focus: true, highlighted: 1, search: 'A' };

        wrapper.setState(state);
        wrapper.instance().onBlur();

        expect(wrapper.state('focus')).toBe(true);
        expect(wrapper.state('highlighted')).toBe(1);
        expect(wrapper.state('search')).toBe('A');
    });

    test('Handles onChange for multi select', () => {
        const wrapper = shallow(<SelectSearch className={className} multiple options={countries} />);
        const selected = countries[random(countries)];

        expect(Array.isArray(wrapper.state('value'))).toBe(true);

        wrapper.instance().onChange(selected.value);

        expect(wrapper.state('value')).toStrictEqual([selected.value]);

        const newSelected = countries[random(countries)];

        wrapper.instance().onChange(newSelected.value);

        expect(wrapper.state('value')).toStrictEqual([selected.value, newSelected.value]);

        wrapper.instance().onChange(selected.value);

        expect(wrapper.state('value')).toStrictEqual([newSelected.value]);

        wrapper.setState({ value: null });

        wrapper.instance().onChange(selected.value);

        expect(wrapper.state('value')).toStrictEqual([selected.value]);
    });

    test('Enter key triggers handleEnter', () => {
        const wrapper = shallow(<SelectSearch className={className} disabled options={countries} />);
        const spy = jest.spyOn(wrapper.instance(), 'handleEnter');

        wrapper.instance().onKeyPress({ keyCode: 13 });

        expect(spy).toHaveBeenCalled();

        spy.mockRestore();

        wrapper.instance().onKeyPress({ keyCode: 14 });

        expect(spy).toHaveBeenCalledTimes(0);

        const wrapper2 = shallow(<SelectSearch className={className} options={[]} />);
        const spy2 = jest.spyOn(wrapper2.instance(), 'handleEnter');

        wrapper2.instance().onKeyPress({ keyCode: 14 });

        expect(spy2).toHaveBeenCalledTimes(0);
    });

    test('onKeyDown handles key codes', () => {
        const wrapper = shallow(<SelectSearch className={className} options={countries} />);
        const blurSpy = jest.spyOn(wrapper.instance(), 'onBlur');
        const arrowDownSpy = jest.spyOn(wrapper.instance(), 'handleArrowDown');
        const arrowUpnSpy = jest.spyOn(wrapper.instance(), 'handleArrowUp');

        wrapper.instance().onKeyDown({ keyCode: 1 });

        expect(blurSpy).toHaveBeenCalledTimes(0);
        expect(arrowDownSpy).toHaveBeenCalledTimes(0);
        expect(arrowUpnSpy).toHaveBeenCalledTimes(0);

        wrapper.setState({ focus: true });
        wrapper.instance().onKeyDown({ keyCode: 1 });

        expect(blurSpy).toHaveBeenCalledTimes(0);
        expect(arrowDownSpy).toHaveBeenCalledTimes(0);
        expect(arrowUpnSpy).toHaveBeenCalledTimes(0);

        wrapper.instance().onKeyDown({ keyCode: 40 });

        expect(arrowDownSpy).toHaveBeenCalledTimes(1);

        wrapper.instance().onKeyDown({ keyCode: 38 });

        expect(arrowUpnSpy).toHaveBeenCalledTimes(1);

        wrapper.instance().onKeyDown({ keyCode: 9 });

        expect(blurSpy).toHaveBeenCalledTimes(1);
    });

    test('Can esc', () => {
        const wrapper = shallow(<SelectSearch className={className} options={countries} />);
        const spy = jest.spyOn(wrapper.instance(), 'handleEsc');

        wrapper.instance().onKeyUp({ keyCode: 1 });

        expect(spy).toHaveBeenCalledTimes(0);

        wrapper.instance().onKeyUp({ keyCode: 27 });

        expect(spy).toHaveBeenCalledTimes(1);
    });

    test('getValue has correct type', () => {
        const controlled = shallow(<SelectSearch defaultValue="IT" value="SE" onChange={() => {}} className={className} options={countries} />);
        const uncontrolled = shallow(<SelectSearch defaultValue="SE" value="IT" className={className} options={countries} />);

        expect(controlled.instance().getValue()).toBe('SE');
        expect(uncontrolled.instance().getValue()).toBe('SE');

        const uncontrolledMultiple = shallow(<SelectSearch defaultValue="SE" value="IT" multiple className={className} options={countries} />);

        expect(uncontrolledMultiple.instance().getValue()).toStrictEqual(['SE']);
    });

    test('Can highlight options by keyboard arrow down', () => {
        const wrapper = shallow(<SelectSearch defaultValue="IT" className={className} options={countries} />);

        wrapper.setState({ focus: true, highlighted: 1 });
        expect(wrapper.state('highlighted')).toBe(1);

        wrapper.instance().handleArrowDown();

        expect(wrapper.state('highlighted')).toBe(2);

        wrapper.setState({ focus: true, highlighted: null });

        wrapper.instance().handleArrowDown();

        expect(wrapper.state('highlighted')).toBe(0);

        wrapper.setState({ focus: true, highlighted: countries.length - 1 });

        wrapper.instance().handleArrowDown();

        expect(wrapper.state('highlighted')).toBe(0);
    });

    test('Can highlight options by keyboard arrow up', () => {
        const wrapper = shallow(<SelectSearch defaultValue="IT" className={className} options={countries} />);

        wrapper.setState({ focus: true, highlighted: 1 });
        expect(wrapper.state('highlighted')).toBe(1);

        wrapper.instance().handleArrowUp();

        expect(wrapper.state('highlighted')).toBe(0);

        wrapper.setState({ focus: true, highlighted: null });

        wrapper.instance().handleArrowUp();

        expect(wrapper.state('highlighted')).toBe(countries.length - 1);

        wrapper.instance().handleArrowUp();

        expect(wrapper.state('highlighted')).toBe(countries.length - 2);
    });

    test('No highlight if options empty', () => {
        const wrapper = shallow(<SelectSearch defaultValue="IT" className={className} options={[]} />);

        wrapper.setState({ focus: true });
        expect(wrapper.state('highlighted')).toBe(null);

        wrapper.instance().handleArrowUp();

        expect(wrapper.state('highlighted')).toBe(null);

        wrapper.instance().handleArrowDown();

        expect(wrapper.state('highlighted')).toBe(null);
    });

    test('Outside click triggers blur', () => {
        const wrapper = shallow(<SelectSearch defaultValue="IT" className={className} options={[]} />);
        const spy = jest.spyOn(wrapper.instance(), 'onBlur');

        wrapper.instance().handleClickOutside();

        expect(spy).toHaveBeenCalledTimes(1);
    });

    test('Focus change triggers handlers', () => {
        const wrapper = shallow(<SelectSearch defaultValue="IT" className={className} options={[]} />);
        const blurSpy = jest.spyOn(wrapper.instance(), 'handleBlur');
        const focusSpy = jest.spyOn(wrapper.instance(), 'handleFocus');

        wrapper.setState({ focus: true });

        expect(focusSpy).toHaveBeenCalledTimes(1);

        wrapper.setState({ focus: false });

        expect(blurSpy).toHaveBeenCalledTimes(1);

        wrapper.setState({ highlighted: 1 });

        expect(focusSpy).toHaveBeenCalledTimes(1);
        expect(blurSpy).toHaveBeenCalledTimes(1);
    });

    test('getOptionsList with fuzzy search', (done) => {
        const wrapper = shallow(<SelectSearch defaultValue="IT" className={className} options={countries} />);
        const options = wrapper.state('options');

        Promise.all([
            wrapper.instance().getNewOptionsList(options, null),
            wrapper.instance().getNewOptionsList(options, ''),
            wrapper.instance().getNewOptionsList(options, 'Sweden'),
        ]).then((values) => {
            expect(values[0]).toStrictEqual(options);
            expect(values[1]).toStrictEqual(options);
            expect(values[2]).toStrictEqual([{
                index: 0,
                value: 'SE',
                name: 'Sweden',
            }]);

            done();
        });
    });

    test('getOptionsList without fuzzy search', (done) => {
        const wrapper = shallow(<SelectSearch defaultValue="IT" fuse={false} className={className} options={countries} />);
        const options = wrapper.state('options');

        Promise.all([
            wrapper.instance().getNewOptionsList(options, null),
            wrapper.instance().getNewOptionsList(options, ''),
            wrapper.instance().getNewOptionsList(options, 'Sweden'),
        ]).then((values) => {
            expect(values[0]).toStrictEqual(options);
            expect(values[1]).toStrictEqual(options);
            expect(values[2]).toStrictEqual(options);

            done();
        });
    });

    test('getOptionsList with custom filter function', (done) => {
        const filter = jest.fn(() => {});
        const wrapper = shallow(<SelectSearch defaultValue="IT" filterOptions={filter} className={className} options={countries} />);
        const options = wrapper.state('options');

        wrapper.instance().getNewOptionsList(options, null)
            .then(() => {
                expect(filter.mock.calls.length).toBe(1);
                done();
            });
    });

    test('onFocus updates state', () => {
        const wrapper = shallow(<SelectSearch defaultValue="IT" className={className} options={countries} />);
        const options = wrapper.state('options');

        wrapper.setState({ focus: false, options: [], search: 'foo' });

        expect(wrapper.state('focus')).toBe(false);
        expect(wrapper.state('options')).toStrictEqual([]);
        expect(wrapper.state('search')).toBe('foo');

        wrapper.instance().onFocus();

        expect(wrapper.state('focus')).toBe(true);
        expect(wrapper.state('options')).toStrictEqual(options);
        expect(wrapper.state('search')).toBe('');
    });

    test('onFocus should do nothing if disabled', () => {
        const wrapper = shallow(<SelectSearch defaultValue="IT" disabled className={className} options={countries} />);

        wrapper.setState({ focus: false, options: [], search: 'foo' });

        expect(wrapper.state('focus')).toBe(false);
        expect(wrapper.state('options')).toStrictEqual([]);
        expect(wrapper.state('search')).toBe('foo');

        wrapper.instance().onFocus();

        expect(wrapper.state('focus')).toBe(false);
        expect(wrapper.state('options')).toStrictEqual([]);
        expect(wrapper.state('search')).toBe('foo');
    });

    test('onChange calls prop if function', () => {
        const onChange = jest.fn((value, option) => {});
        const wrapper = shallow(<SelectSearch value="IT" onChange={onChange} className={className} options={countries} />);
        const option = random(countries);

        wrapper.instance().onChange(countries[option].value);

        expect(onChange.mock.calls.length).toBe(1);
        expect(onChange.mock.calls[0][0]).toBe(countries[option].value);
        expect(onChange.mock.calls[0][1]).toStrictEqual({
            index: option,
            value: countries[option].value,
            name: countries[option].name,
        });
    });

    test('onSearch calls new options list and sets state', (done) => {
        const wrapper = shallow(<SelectSearch defaultValue="IT" className={className} options={countries} />);
        const spy = jest.spyOn(wrapper.instance(), 'getNewOptionsList');

        wrapper.instance().getNewOptionsList.mockImplementation((options) => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(options);

                    setImmediate(() => {
                        expect(wrapper.update().state('searching')).toBe(false);
                        expect(wrapper.update().state('options')).toStrictEqual(options);
                        done();
                    });
                }, 50);
            });
        });

        expect(wrapper.instance().searchPromise).toBe(null);
        expect(spy.mock.calls.length).toBe(0);
        expect(wrapper.state('search')).toBe('');
        expect(wrapper.state('searching')).toBe(false);

        wrapper.instance().onSearch({
            target: {
                value: 's',
            },
        });

        expect(spy.mock.calls.length).toBe(1);
        expect(wrapper.state('search')).toBe('s');
        expect(wrapper.state('searching')).toBe(true);
        expect(typeof wrapper.instance().searchPromise).toBe('object');

        const spy2 = jest.spyOn(wrapper.instance().searchPromise, 'cancel');

        wrapper.instance().onSearch({
            target: {
                value: 'sw',
            },
        });

        expect(spy2.mock.calls.length).toBe(1);
    });

    test('onSearch sets error if fails', (done) => {
        const wrapper = shallow(<SelectSearch defaultValue="IT" className={className} options={countries} />);
        const spy = jest.spyOn(wrapper.instance(), 'getNewOptionsList');

        wrapper.instance().getNewOptionsList.mockImplementation(() => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    reject('fail');

                    setImmediate(() => {
                        expect(wrapper.update().state('searching')).toBe(false);
                        expect(wrapper.update().state('error')).toBe('fail');
                        done();
                    });
                }, 50);
            });
        });

        expect(wrapper.instance().searchPromise).toBe(null);
        expect(spy.mock.calls.length).toBe(0);
        expect(wrapper.state('search')).toBe('');
        expect(wrapper.state('searching')).toBe(false);

        wrapper.instance().onSearch({
            target: {
                value: 's',
            },
        });

        expect(spy.mock.calls.length).toBe(1);
        expect(wrapper.state('search')).toBe('s');
        expect(wrapper.state('searching')).toBe(true);
        expect(typeof wrapper.instance().searchPromise).toBe('object');
    });

    test('maxOptions limits results', () => {
        const wrapper = shallow(<SelectSearch defaultValue="IT" maxOptions={10} className={className} options={countries} />);
        const options = wrapper.instance().getOptionsForRender();

        expect(options.length).toBe(10);
    });
});
