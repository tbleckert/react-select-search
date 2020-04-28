import React from 'react';
import renderer from 'react-test-renderer';
import Option from '../src/Components/Option';

import './helpers/setup-enzyme';
import './helpers/setup-browser-env';

describe('Test Option component', () => {
    test('Renders value element', () => {
        const tree = renderer.create((
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
        )).toJSON();

        expect(tree).toMatchSnapshot();
    });

    test('Option can be selected', () => {
        const tree = renderer.create((
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
        )).toJSON();

        expect(tree).toMatchSnapshot();
    });

    test('Option can be highlighted', () => {
        const tree = renderer.create((
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
        )).toJSON();

        expect(tree).toMatchSnapshot();
    });

    test('Can render custom option', () => {
        const tree = renderer.create((
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
        )).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
