import React from 'react';
import renderer from 'react-test-renderer';
import Options from '../src/Components/Options';

describe('Test Options component', () => {
    test('Renders correctly without groups', () => {
        const tree = renderer.create((
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
        )).toJSON();

        expect(tree).toMatchSnapshot();
    });

    test('Renders correctly with groups', () => {
        const tree = renderer.create((
            <Options
                className={(key) => key}
                options={[
                    {
                        name: 'Group',
                        type: 'group',
                        items: [
                            { value: 'foo', name: 'Foo' },
                            { value: 'bar', name: 'Bar' },
                        ]
                    },
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
        )).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
