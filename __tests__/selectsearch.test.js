import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import SelectSearch from '../src';
import { countries, fontStacks, friends } from './data';
import './helpers/setup-enzyme';
import Adapter from 'enzyme-adapter-react-16';


const renderFriend = (option) => (<span><img alt="" width="40" height="40" src={option.photo} /><span>{option.name}</span></span>);


describe('Full render no-multiple select with search field', () => {
    const component = mount(<SelectSearch name="country" options={countries} value="SE" />);

    test('has search field', () => {
        expect(component.find('.select-search-box__search')).toHaveLength(1);
    });

    test('default selected must be Sweden', () => {
        expect(component.find('.select-search-box__search').props().value).toBe('Sweden');
    });

    test('displays options on focus', () => {
        component.find('.select-search-box__search').simulate('focus');

        expect(component.find('.select-search-box__option')).toHaveLength(243);
    });

    test('search field on focus should be empty', () => {
        expect(component.find('.select-search-box__search').props().value).toBe('');
    });

    const search = 'Ital';

    test('empties search field on focus', () => {
        component.find('.select-search-box__search').simulate('change', { target: { value: search } });

        expect(component.find('.select-search-box__option')).toHaveLength(2);
    });

    test('not empty search field after change', () => {
        expect(component.find('.select-search-box__search').props().value).toBe(search);
    });

    test('select another option', () => {
        component.find('.select-search-box__search').simulate('blur').simulate('focus');
        component.find('.select-search-box__option[data-value="BH"]').simulate('click');

        expect(component.find('.select-search-box__search').props().value).toBe('Bahrain');
    });
});


describe('Full render multiselect with search field', () => {
    const component = mount(
            <SelectSearch
                name="friends"
                multiple
                value={['tiffany.gonzales', 'rudolf.wilson']}
                options={friends}
                renderOption={renderFriend}
            />
        );

    test('input field must be empty', () => {
        component.find('.select-search-box__search').simulate('focus');

        expect(component.find('.select-search-box__search').props().value).toBe('');
    });

    test('must have default 2 selected items', () => {
        expect(component.find('.select-search-box__option--selected')).toHaveLength(2);
    });

    test('selecting item by click', () => {
        component.find('.select-search-box__option:not(.select-search-box__option--selected)').first().simulate('click');

        expect(component.find('.select-search-box__option--selected')).toHaveLength(3);
    });

    test('unselecting item by click', () => {
        component.find('.select-search-box__option--selected').first().simulate('click');

        expect(component.find('.select-search-box__option--selected')).toHaveLength(2);
    });
});


describe('Full render multiselect without search field', () => {
    const component = mount(
        <SelectSearch
            multiple
            search={false}
            value={['tiffany.gonzales', 'rudolf.wilson', 'emerald.hensley']}
            options={friends}
            renderOption={renderFriend}
        />
    );

    test('input field must be disabled', () => {
        expect(component.find('.select-search-box__search')).toHaveLength(0);
    });

    test('must have default 3 selected items', () => {
        expect(component.find('.select-search-box__option--selected')).toHaveLength(3);
    });

});


describe('Full render no-multiple select without search field and with empty value', () => {
    const component = mount(
        <SelectSearch
            search={false}
            value=''
            options={friends}
            renderOption={renderFriend}
        />
    );

    test('with empty .values', () => {
        expect(component.find('.select-search-box__search--placeholder').text()).toBe('');
    });
});


describe('Full render multiselect without search field and with empty value', () => {
    const component = mount(
        <SelectSearch
            multiple
            search={false}
            value=''
            options={friends}
            renderOption={renderFriend}
        />
    );

    test('with empty state.values', () => {
        expect(component.find('.select-search-box__out>option').text()).toBe('Nothing selected');
    });
});


describe('Group tests', () => {
    const component = mount(
        <SelectSearch
            value='Playfair Display'
            options={fontStacks}
        />
    );

    test('must have one grouped option with two sub-options', () => {
        expect(component.find('.select-search-box__group-header')).toHaveLength(4);
        expect(component.find('.select-search-box__option')).toHaveLength(5);
    });
});


describe('Unit tests', () => {
    Enzyme.configure({
        adapter: new Adapter(),
        disableLifecycleMethods: true
    });

    let input;
    const renderFriend = (option) => (<span><span>{option.name}</span></span>);

    test('set the state.search changes search field immediately', () => {
        class Component extends React.Component {
            render() {
                return (
                    <SelectSearch
                        multiple
                        value={['tiffany.gonzales', 'rudolf.wilson']}
                        options={friends}
                        renderOption={renderFriend}
                    />
                );
            }
        }

        const component = shallow(<Component />);
        const cmpInstance = component.dive().dive().instance();

        return new Promise((resolve) => {
            cmpInstance.setState({ search: 'ti' }, resolve);
        }).then(() => {
            input = cmpInstance.renderSearchField();

            expect(input.props.value).toBe('ti');
        });
    });

    test('renderSearchField function. Multiple without search field', () => {
        class Component extends React.Component {
            render() {
                return (
                    <SelectSearch
                        multiple
                        search={false}
                        options={friends}
                        renderOption={renderFriend}
                    />
                );
            }
        }

        const component = shallow(<Component />);
        const cmpInstance = component.dive().dive().instance();
        input = cmpInstance.renderSearchField();

        expect(input).toBe(null);
    });

    test('renderSearchField function. Drop down list without search field in default must contain a default element text', () => {
        class Component extends React.Component {
            render() {
                return (
                    <SelectSearch
                        search={false}
                        value='tiffany.gonzales'
                        options={friends}
                        renderOption={renderFriend}
                    />
                );
            }
        }

        const component = shallow(<Component />);
        const cmpInstanceForProps = component.dive().dive()
        const cmpInstance = cmpInstanceForProps.instance();

        cmpInstanceForProps.setProps({ search: false });
        input = cmpInstance.renderSearchField();

        expect(shallow(input).text()).toBe('Tiffany Gonzales');
    });
});
