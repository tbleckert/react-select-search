import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import useSelect from '../src/useSelect';
import { friends } from './data';
import './helpers/setup-enzyme';
import './helpers/setup-browser-env';
import flattenOptions from '../src/lib/flattenOptions';
import groupOptions from '../src/lib/groupOptions';

const CustomSelect = ({ options, value, multiple, disabled }) => {
    const [snapshot, valueProps, optionProps] = useSelect({
        options,
        value,
        multiple,
        disabled,
    });

    return <div snapshot={snapshot} valueProps={valueProps} optionProps={optionProps} />;
};

describe('Test SelectSearch component', () => {
    test('Renders with default props', () => {
        const flatOptions = flattenOptions(friends);
        const groupedOptions = groupOptions(flatOptions);
        const initialOption = flatOptions[1];
        const wrapper = mount(<CustomSelect options={friends} value={initialOption.value} />);
        const output = wrapper.find('div').props();

        expect(output.snapshot).toStrictEqual({
            value: initialOption,
            highlighted: -1,
            options: groupedOptions,
            disabled: false,
            displayValue: initialOption.name,
            focus: false,
            searching: false,
            search: '',
        });
	});

	test('Renders without value present', () => {
        const flatOptions = flattenOptions(friends);
        const groupedOptions = groupOptions(flatOptions);
        const initialOption = flatOptions[1];
        const wrapper = mount(<CustomSelect options={friends} value={undefined} />);
        const output = wrapper.find('div').props();

        expect(output.snapshot).toStrictEqual({
            value: null,
            highlighted: -1,
            options: groupedOptions,
            disabled: false,
            displayValue: "",
            focus: false,
            searching: false,
            search: '',
        });
    });
});
