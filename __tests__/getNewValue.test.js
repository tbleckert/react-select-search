import getNewValue from '../src/lib/getNewValue';
import { friends } from './data';

describe('Unit test for getNewValue function', () => {
    test('Can set new single value', () => {
        const newOption = friends[Math.floor(Math.random() * friends.length)];

        expect(getNewValue(newOption, newOption, false)).toEqual(newOption);
        expect(getNewValue(newOption, null, false)).toEqual(newOption);
    });

    test('Can set new multiple value', () => {
        const newOption = friends[1];
        const secondOption = friends[2];

        expect(getNewValue(newOption, [secondOption], true)).toEqual([secondOption, newOption]);
        expect(getNewValue(newOption, secondOption, true)).toEqual([secondOption, newOption]);
        expect(getNewValue(newOption, null, true)).toEqual([newOption]);
    });

    test('Can remove value in multiple', () => {
        const newOption = friends[Math.floor(Math.random() * friends.length)];

        expect(getNewValue(newOption, [newOption], true)).toEqual([]);
    });
});
