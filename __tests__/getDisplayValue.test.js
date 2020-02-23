import getDisplayValue from '../src/lib/getDisplayValue';
import { friends } from './data';

describe('Unit test for getDisplayValue function', () => {
    test('Can get name from option by value', () => {
        const option = friends[Math.floor(Math.random() * friends.length)];
        const secondOption = friends[Math.floor(Math.random() * friends.length)];

        expect(getDisplayValue(option.value, friends)).toEqual(option.name);
        expect(getDisplayValue([option.value, secondOption.value], friends)).toStrictEqual(`${option.name}, ${secondOption.name}`);
        expect(getDisplayValue('foo', friends)).toEqual('');
        expect(getDisplayValue(null, friends)).toEqual('');
    });
});
