import getNewValue from '../src/lib/getNewValue';
import { friends } from './data';

describe('Unit test for getNewValue function', () => {
    test('Can set new single value', () => {
        const newOption = friends[Math.floor(Math.random() * friends.length)];

        expect(getNewValue(newOption.value, 'foo', false)).toEqual(newOption.value);
        expect(getNewValue(newOption.value, null, false)).toEqual(newOption.value);
    });

    test('Can set new multiple value', () => {
        const newOption = friends[Math.floor(Math.random() * friends.length)];

        expect(getNewValue(newOption.value, ['foo'], true)).toEqual(['foo', newOption.value]);
        expect(getNewValue(newOption.value, 'foo', true)).toEqual(['foo', newOption.value]);
        expect(getNewValue(newOption.value, null, true)).toEqual([newOption.value]);
    });

    test('Can remove value in multiple', () => {
        const newOption = friends[Math.floor(Math.random() * friends.length)];

        expect(getNewValue(newOption.value, [newOption.value], true)).toEqual([]);
    });
});
