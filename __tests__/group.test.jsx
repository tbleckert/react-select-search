import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import { countries, fontStacks, friends } from './data';
import Group from '../src/Components/Group';
import Context from '../src/Context';
import './helpers/setup-enzyme';
import Adapter from 'enzyme-adapter-react-16';
import createClasses from '../src/lib/createClasses';

const classes = createClasses('select-search');
const theme = {
    classes,
    renderers: {},
};

describe('Test Group component', () => {
    test('Renders element', () => {
        const name = 'My group';
        const wrapper = mount((
            <Context.Provider value={theme}>
                <Group groupId="1" name={name} items={[]} />
            </Context.Provider>
        ));

        expect(wrapper.find(`li.${classes.row}`).length).toBe(1);
        expect(wrapper.find(`.${classes.groupHeader}`).length).toBe(1);
        expect(wrapper.find(`.${classes.groupHeader}`).text()).toBe(name);
    });

    test('Uses custom renderer', () => {
        const themeWithRenderer = {
            classes,
            renderers: {
                groupHeader: (name) => (
                    <span>{`Group: ${name}`}</span>
                ),
            },
        };

        const name = 'My group';
        const wrapper = mount((
            <Context.Provider value={themeWithRenderer}>
                <Group groupId="1" name={name} items={[]} />
            </Context.Provider>
        ));

        expect(wrapper.find(`.${classes.groupHeader} > span`).length).toBe(1);
        expect(wrapper.find(`.${classes.groupHeader} > span`).text()).toBe(`Group: ${name}`);
    });

    test('Renders options', () => {
        const name = 'My group';
        const wrapper = mount((
            <Context.Provider value={theme}>
                <Group groupId="1" name={name} items={[]} />
            </Context.Provider>
        ));

        expect(wrapper.find(`li.${classes.row} .${classes.options}`).length).toBe(1);
    });
});
