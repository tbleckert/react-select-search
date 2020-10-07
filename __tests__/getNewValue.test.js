import getNewValue from '../src/lib/getNewValue';
import { friends } from './data';

describe('Unit test for getNewValue function', () => {
    test('Can set new single value', () => {
        const newOption = friends[Math.floor(Math.random() * friends.length)];

        expect(getNewValue(newOption, newOption, friends, false)).toEqual(newOption);
        expect(getNewValue(newOption, null, friends, false)).toEqual(newOption);
    });

    test('Can set new multiple value', () => {
        const newOption = friends[1];
        const secondOption = friends[2];

        expect(getNewValue(newOption, [secondOption], friends, true)).toEqual([secondOption, newOption]);
        expect(getNewValue(newOption, secondOption, friends, true)).toEqual([secondOption, newOption]);
        expect(getNewValue(newOption, null,  friends,true)).toEqual([newOption]);
    });

    test('Can remove value in multiple', () => {
        const newOption = friends[Math.floor(Math.random() * friends.length)];

        expect(getNewValue(newOption, [newOption], friends, true)).toEqual([]);
    });

    test('Can convert single to multiple', () => {
        const oldOption = friends[0];
        const newOption = friends[1];

        expect(getNewValue(newOption, oldOption, friends, true)).toEqual([oldOption, newOption]);
    });
});
