import getDisplayValue from '../src/lib/getDisplayValue';
import { friends } from './data';

describe('Unit test for getDisplayValue function', () => {
    test('Can get name from option by value', () => {
        const option = friends[Math.floor(Math.random() * friends.length)];
        const secondOption =
            friends[Math.floor(Math.random() * friends.length)];

        expect(getDisplayValue(option)).toEqual(option.name);
        expect(getDisplayValue([option, secondOption])).toStrictEqual(
            `${option.name}, ${secondOption.name}`,
        );
        expect(getDisplayValue('foo')).toEqual('');
        expect(getDisplayValue([{ value: 'fake-option' }])).toEqual('');
    });

    test('Can return default values', () => {
        expect(getDisplayValue(null, friends)).toEqual(friends[0].name);
        expect(getDisplayValue(null, [{ value: 'fake-option' }])).toEqual('');
        expect(getDisplayValue(null, [])).toEqual('');
        expect(getDisplayValue(null, friends, 'Placeholder')).toEqual('');
    });
});
