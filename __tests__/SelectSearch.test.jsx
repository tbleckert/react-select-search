import React, { memo } from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import SelectSearch from '../src/SelectSearch';

import './helpers/setup-enzyme';
import './helpers/setup-browser-env';
import Option from '../src/Components/Option';
import { fontStacks } from './data';

function renderFontOption(props, { stack, name }, snapshot, className) {
    return (
        <button {...props} className={className} type="button">
            <span style={{ fontFamily: stack }}>{name}</span>
        </button>
    );
}

function renderFontValue(valueProps, snapshot, className) {
    const { selectedOption } = snapshot;
    const style = {
        fontFamily: (selectedOption && 'stack' in selectedOption) ? selectedOption.stack : null,
    };

    return (
        <input {...valueProps} className={className} style={style} value={snapshot.displayValue} />
    );
}

describe('Test SelectSearch component', () => {
    test('Renders with default props', () => {
        const tree = renderer.create((
            <SelectSearch options={[
                { value: 'foo', name: 'Foo' },
                { value: 'bar', name: 'Bar' },
            ]} />
        )).toJSON();

        expect(tree).toMatchSnapshot();
    });

    test('Renders with multiple', () => {
        const tree = renderer.create((
            <SelectSearch options={[
                { value: 'foo', name: 'Foo' },
                { value: 'bar', name: 'Bar' },
            ]} multiple />
        )).toJSON();

        expect(tree).toMatchSnapshot();
    });

    test('Renders with disabled', () => {
        const tree = renderer.create((
            <SelectSearch options={[
                { value: 'foo', name: 'Foo' },
                { value: 'bar', name: 'Bar' },
            ]} disabled />
        )).toJSON();

        expect(tree).toMatchSnapshot();
    });

    test('Renders with search', () => {
        const tree = renderer.create((
            <SelectSearch options={[
                { value: 'foo', name: 'Foo' },
                { value: 'bar', name: 'Bar' },
            ]} search />
        )).toJSON();

        expect(tree).toMatchSnapshot();
    });

    test('Renders with empty message string', () => {
        const tree = renderer.create((
            <SelectSearch
                options={[]}
                search
                printOptions="always"
                emptyMessage="Not found"
            />
        )).toJSON();

        expect(tree).toMatchSnapshot();
    });

    test('Renders with empty message renderer', () => {
        const tree = renderer.create((
            <SelectSearch
                options={[]}
                search
                printOptions="always"
                emptyMessage={() => <div>Not found</div>}
            />
        )).toJSON();

        expect(tree).toMatchSnapshot();
    });

    test('Renders with search and placeholder', () => {
        const tree = renderer.create((
            <SelectSearch options={[
                { value: 'foo', name: 'Foo' },
                { value: 'bar', name: 'Bar' },
            ]} search placeholder="Search..." />
        )).toJSON();

        expect(tree).toMatchSnapshot();
    });

    test('Renders with search and multiple', () => {
        const tree = renderer.create((
            <SelectSearch options={[
                { value: 'foo', name: 'Foo' },
                { value: 'bar', name: 'Bar' },
            ]} search multiple />
        )).toJSON();

        expect(tree).toMatchSnapshot();
    });

    test('Focus displays options', () => {
        const wrapper = mount((
            <SelectSearch options={[
                { value: 'foo', name: 'Foo' },
                { value: 'bar', name: 'Bar' },
            ]} />
        ));

        expect(wrapper.find(Option).length).toBe(0);
        expect(toJson(wrapper)).toMatchSnapshot();

        wrapper.find('.select-search__input').simulate('focus');

        expect(wrapper.find(Option).length).toBe(2);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    test('Value change triggers onChange', (done) => {
        const onChangeMock = jest.fn();
        const wrapper = mount((
            <SelectSearch onChange={onChangeMock} options={[
                { value: 'foo', name: 'Foo' },
                { value: 'bar', name: 'Bar' },
            ]} />
        ));

        expect(onChangeMock.mock.calls.length).toBe(0);

        wrapper.find('.select-search__input').simulate('focus');

        setImmediate(() => {
            wrapper.update();
            wrapper.find(Option).at(0).find('button').simulate('mouseDown');

            expect(onChangeMock.mock.calls.length).toBe(1);
            expect(onChangeMock.mock.calls[0][0]).toBe('foo');
            expect(onChangeMock.mock.calls[0][1]).toStrictEqual({ value: 'foo', name: 'Foo', index: 0, _id: 'foo' });

            done();
        });
    });

    test('Value change works without onChange handler', (done) => {
        const wrapper = mount((
            <SelectSearch options={[
                { value: 'foo', name: 'Foo' },
                { value: 'bar', name: 'Bar' },
            ]} />
        ));

        expect(toJson(wrapper)).toMatchSnapshot();

        wrapper.find('.select-search__input').simulate('focus');

        setImmediate(() => {
            wrapper.update();
            wrapper.find(Option).at(0).find('button').simulate('mouseDown');

            expect(toJson(wrapper)).toMatchSnapshot();

            done();
        });
    });

    test('Renders groups', () => {
        const wrapper = mount((
            <SelectSearch
                options={fontStacks}
                renderOption={renderFontOption}
                renderValue={renderFontValue}
            />
        ));

        expect(toJson(wrapper)).toMatchSnapshot();

        wrapper.find('.select-search__input').simulate('focus');

        expect(toJson(wrapper)).toMatchSnapshot();
    });

    test('Custom renderers work', () => {
        const wrapper = mount((
            <SelectSearch
                options={fontStacks}
                renderOption={renderFontOption}
                renderValue={renderFontValue}
                renderGroupHeader={(name) => `Type: ${name}`}
            />
        ));

        expect(toJson(wrapper)).toMatchSnapshot();

        wrapper.find('.select-search__input').simulate('focus');

        expect(toJson(wrapper)).toMatchSnapshot();
    });

    test('Custom renderers work with search', () => {
        const wrapper = mount((
            <SelectSearch
                options={fontStacks}
                search
                renderOption={renderFontOption}
                renderValue={renderFontValue}
                renderGroupHeader={(name) => `Type: ${name}`}
            />
        ));

        expect(toJson(wrapper)).toMatchSnapshot();

        wrapper.find('.select-search__input').simulate('focus');

        expect(toJson(wrapper)).toMatchSnapshot();
    });

    test('Class name as string', () => {
        const tree = renderer.create((
            <SelectSearch
                className="custom-select"
                options={fontStacks}
            />
        )).toJSON();

        expect(tree).toMatchSnapshot();
    });

    test('Class name as fn', () => {
        const tree = renderer.create((
            <SelectSearch
                className={(key) => `class-base__${key}`}
                options={fontStacks}
            />
        )).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
