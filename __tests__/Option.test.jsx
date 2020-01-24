import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Option from '../src/Components/Option';
import './helpers/setup-enzyme';
import './helpers/setup-browser-env';

describe('Test Option component', () => {
    test('Renders value element', () => {
        const wrapper = mount((
            <Option
                className={(key) => key}
                name="Foo"
                value="foo"
                type="button"
                highlighted={false}
                selected={false}
                optionProps={{
                    tabIndex: 0,
                    onMouseDown: () => {},
                }}
            />
        ));

        expect(wrapper.find('li').length).toBe(1);
        expect(wrapper.find('button').length).toBe(1);
        expect(wrapper.find('.row').length).toBe(1);
        expect(wrapper.find('.option').length).toBe(1);
    });

    test('Option can be selected', () => {
        const wrapper = mount((
            <Option
                className={(key) => key}
                name="Foo"
                value="foo"
                type="button"
                highlighted={false}
                selected={true}
                optionProps={{
                    tabIndex: 0,
                    onMouseDown: () => {},
                }}
            />
        ));

        expect(wrapper.find('.option.is-selected').length).toBe(1);
    });

    test('Option can be highlighted', () => {
        const wrapper = mount((
            <Option
                className={(key) => key}
                name="Foo"
                value="foo"
                type="button"
                highlighted={true}
                selected={false}
                optionProps={{
                    tabIndex: 0,
                    onMouseDown: () => {},
                }}
            />
        ));

        expect(wrapper.find('.option.is-highlighted').length).toBe(1);
    });

    test('Can render custom option', () => {
        const wrapper = mount((
            <Option
                className={(key) => key}
                name="Foo"
                value="foo"
                type="button"
                highlighted={true}
                selected={false}
                optionProps={{
                    tabIndex: 0,
                    onMouseDown: () => {},
                }}
                renderOption={() => <x-custom-element />}
            />
        ));

        expect(wrapper.find('x-custom-element').length).toBe(1);
    });
});
