import renderer from 'react-test-renderer';
import Value from '../src/Components/Value';

describe('Test Value component', () => {
    test('Single, without search', () => {
        const component = renderer.create(
            <Value
                search={false}
                multiple={false}
                autoFocus={false}
                placeholder=""
                valueProps={{
                    tabIndex: '0',
                    readOnly: true,
                }}
                snapshot={{
                    focus: false,
                    search: false,
                    displayValue: 'Hamburger',
                }}
                cls={(cls) => cls}
            />
        );

        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();

        expect(component.root.findByType('input').props.value).toBe('Hamburger');
    });

    test('Single, with search', () => {
        const component = renderer.create(
            <Value
                search={true}
                multiple={false}
                autoFocus={false}
                placeholder=""
                valueProps={{
                    tabIndex: '0',
                    readOnly: false,
                }}
                snapshot={{
                    focus: true,
                    search: 'ham',
                    displayValue: 'Hamburger',
                }}
                cls={(cls) => cls}
            />
        );

        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();

        expect(component.root.findByType('input').props.value).toBe('ham');
    });
});
