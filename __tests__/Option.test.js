import renderer from 'react-test-renderer';
import Option from '../src/Components/Option';

describe('Test Option component', () => {
    test('Renders with default props', () => {
        const component = renderer.create(
            <Option
                name="Hamburger"
                value="hamburger"
                cls={(cls) => cls}
                highlighted={false}
                selected={false}
            />
        );

        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('Highlighted', () => {
        const component = renderer.create(
            <Option
                name="Hamburger"
                value="hamburger"
                cls={(cls) => cls}
                highlighted={true}
                selected={false}
            />
        );

        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('Selected', () => {
        const component = renderer.create(
            <Option
                name="Hamburger"
                value="hamburger"
                cls={(cls) => cls}
                highlighted={false}
                selected={true}
            />
        );

        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
