import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import { countries, fontStacks, friends } from './data';
import Options from '../src/Components/Options';
import Context from '../src/Context';
import './helpers/setup-enzyme';
import Adapter from 'enzyme-adapter-react-16';
import createClasses from '../src/lib/createClasses';
import FlattenOptions from '../src/lib/FlattenOptions';
import GroupOptions from '../src/lib/GroupOptions';
import Option from '../src/Components/Option';

const classes = createClasses('select-search');
const theme = {
    classes,
    renderers: {},
};

describe('Test Options component', () => {
    test('Renders element', () => {
        const options = [];
        const wrapper = mount((
            <Context.Provider value={theme}>
                <Options options={options} />
            </Context.Provider>
        ));

        expect(wrapper.find(`ul.${classes.options}`).length).toBe(1);
    });

    test('Renders options', () => {
        const flatOptions = FlattenOptions(fontStacks);
        const groupedOptions = GroupOptions(flatOptions);
        const totalRows = groupedOptions.map((item) => {
            if (item.items) {
                return 1 + item.items.length;
            }

            return 1;
        }).reduce((a, b) => a + b);

        const wrapper = mount((
            <Context.Provider value={theme}>
                <Options options={groupedOptions} />
            </Context.Provider>
        ));

        expect(wrapper.find(Option).length).toBe(totalRows);
        expect(wrapper.find(Option).at(0).key()).toBe(groupedOptions[0].value);
        expect(wrapper.find(Option).at(1).key()).toBe(groupedOptions[1].groupId);
    });
});
