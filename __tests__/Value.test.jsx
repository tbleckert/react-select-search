import React from 'react';
import renderer from 'react-test-renderer';
import Value from '../src/Components/Value';

describe('Test Value component', () => {
    test('Renders value element', () => {
        const tree = renderer.create((
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
        )).toJSON();

        expect(tree).toMatchSnapshot();
    });

    test('Renders search element', () => {
        const tree = renderer.create((
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
        )).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
