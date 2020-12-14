import renderer from 'react-test-renderer';
import Option from '../src/Components/Option';

const optionProps = {
    tabIndex: '-1',
    onMouseDown: () => {},
};

describe('Test Option component', () => {
    test('Renders with default props', () => {
        const component = renderer.create(
            <Option
                option={{
                    name: 'Hamburger',
                    value: 'hamburger',
                }}
                cls={(cls) => cls}
                highlighted={false}
                selected={false}
                optionProps={optionProps}
            />
        );

        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('Highlighted', () => {
        const component = renderer.create(
            <Option
                option={{
                    name: 'Hamburger',
                    value: 'hamburger',
                }}
                cls={(cls) => cls}
                highlighted={true}
                selected={false}
                optionProps={optionProps}
            />
        );

        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('Selected', () => {
        const component = renderer.create(
            <Option
                option={{
                    name: 'Hamburger',
                    value: 'hamburger',
                }}
                cls={(cls) => cls}
                highlighted={false}
                selected={true}
                optionProps={optionProps}
            />
        );

        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
