import getDisplayValue from '../src/lib/getDisplayValue';
import { friends } from './data';

describe('Unit test for getDisplayValue function', () => {
    test('Can get name from option by value', () => {
        const option = friends[Math.floor(Math.random() * friends.length)];
        const secondOption = friends[Math.floor(Math.random() * friends.length)];

        expect(getDisplayValue(option)).toEqual(option.name);
        expect(getDisplayValue([option, secondOption])).toStrictEqual(`${option.name}, ${secondOption.name}`);
        expect(getDisplayValue('foo')).toEqual('');
    });
});
