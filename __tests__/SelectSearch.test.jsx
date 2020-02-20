import React from 'react';
import renderer from 'react-test-renderer';
import SelectSearch from '../src/SelectSearch';

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
});
