import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import { countries, fontStacks, friends } from './data';
import Context from '../src/Context';
import './helpers/setup-enzyme';
import Adapter from 'enzyme-adapter-react-16';
import createClasses from '../src/lib/createClasses';
import Option from '../src/Components/Option';
import Group from '../src/Components/Group';

const classes = createClasses('select-search');
const theme = {
    classes,
    renderers: {},
};

describe('Test Option component', () => {
    test('Renders element', () => {
        const wrapper = mount((
            <Context.Provider value={theme}>
                <Option name="Helvetica" value="helvetica" snapshot={{}} />
            </Context.Provider>
        ));

        expect(wrapper.find(`li.${classes.row}`).length).toBe(1);
        expect(wrapper.find(`button.${classes.option}`).length).toBe(1);
        expect(wrapper.find(`button.${classes.option}`).text()).toBe('Helvetica');
        expect(wrapper.find(Group).length).toBe(0);
    });

    test('Renders group', () => {
        const wrapper = mount((
            <Context.Provider value={theme}>
                <Option name="Helvetica" type="group" groupId="1" items={[]} />
            </Context.Provider>
        ));

        expect(wrapper.find(Group).length).toBe(1);
    });

    test('Can click option', () => {
        const mockCallback = jest.fn();
        const wrapper = mount((
            <Context.Provider value={theme}>
                <Option name="Helvetica" value="helvetica" onChange={mockCallback} snapshot={{}} />
            </Context.Provider>
        ));

        const button = wrapper.find(`button.${classes.option}`);

        button.simulate('click');

        expect(mockCallback.mock.calls.length).toBe(1);
    });

    test('Can\'t click disabled option', () => {
        const mockCallback = jest.fn();
        const wrapper = mount((
            <Context.Provider value={theme}>
                <Option name="Helvetica" value="helvetica" disabled={true} snapshot={{ highlighted: null }} />
            </Context.Provider>
        ));

        const button = wrapper.find(`button.${classes.option}`);

        button.simulate('click');

        expect(mockCallback.mock.calls.length).toBe(0);
    });

    test('Uses custom renderer', () => {
        const themeWithRenderer = {
            classes,
            renderers: {
                option: (props, option) => (
                    <button {...props} type="button">
                        <span>{option.name.toUpperCase()}</span>
                    </button>
                ),
            },
        };

        const option = { name: 'Helvetica', value: 'helvetica' };
        const wrapper = mount((
            <Context.Provider value={themeWithRenderer}>
                <Option {...option} option={option} snapshot={{ highlighted: false, value: null }} />
            </Context.Provider>
        ));

        expect(wrapper.find(`li.${classes.row}`).length).toBe(1);
        expect(wrapper.find(`button.${classes.option}`).length).toBe(1);
        expect(wrapper.find(`button.${classes.option}`).text()).toBe('Helvetica'.toUpperCase());
    });
});
