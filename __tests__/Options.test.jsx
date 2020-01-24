import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Options from '../src/Components/Options';
import './helpers/setup-enzyme';
import './helpers/setup-browser-env';

describe('Test Options component', () => {
    test('Renders value element', () => {
        const wrapper = mount((
            <Options
                className={(key) => key}
                options={[
                    { value: 'foo', name: 'Foo' },
                    { value: 'bar', name: 'Bar' },
                ]}
                snapshot={{
                    value: null,
                    highlighted: null,
                    focus: false,
                }}
                optionProps={{
                    tabIndex: 1,
                    onMouseDown: () => {},
                }}
            />
        ));

        expect(wrapper.find('li').length).toBe(2);
        expect(wrapper.find('ul').length).toBe(1);
    });
});
