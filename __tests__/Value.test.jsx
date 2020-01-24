import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Value from '../src/Components/Value';
import './helpers/setup-enzyme';

describe('Test Value component', () => {
    test('Renders value element', () => {
        const wrapper = mount((
            <Value
                className={(key) => key}
                displayValue="Foo"
                valueProps={{
                    onBlur: () => {},
                    onFocus: () => {},
                    tabIndex: 0,
                    onChange: () => {},
                }}
                disabled={false}
                search={false}
            />
        ));

        expect(wrapper.find('button').length).toBe(1);
        expect(wrapper.find('.value').length).toBe(1);
        expect(wrapper.find('.input').length).toBe(1);
    });

    test('Renders search element', () => {
        const wrapper = mount((
            <Value
                className={(key) => key}
                displayValue="Foo"
                valueProps={{
                    onBlur: () => {},
                    onFocus: () => {},
                    tabIndex: 0,
                    onChange: () => {},
                }}
                disabled={false}
                search={true}
            />
        ));

        expect(wrapper.find('input').length).toBe(1);
        expect(wrapper.find('.value').length).toBe(1);
        expect(wrapper.find('.input').length).toBe(1);
    });
});
