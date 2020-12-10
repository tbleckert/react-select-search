import renderer from 'react-test-renderer';
import Options from '../src/Components/Options';
import { countries } from './data';

describe('Test Options component', () => {
    test('Not found', () => {
        const component = renderer.create(
            <Options
                options={[]}
                cls={(cls) => cls}
                emptyMessage="Not found"
                optionProps={{
                    tabIndex: '0',
                    onMouseDown: () => {},
                }}
                snapshot={{
                    highlighted: -1,
                    option: null,
                    focus: false,
                    value: null,
                }}
            />
        );

        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();

        expect(component.root.findAllByType('li').length).toBe(1);
        expect(component.root.findByType('li').props.className).toBe('not-found');
        expect(component.root.findByType('li').props.children).toBe('Not found');
    });
});
