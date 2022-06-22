import getOptions from '../src/lib/getOptions';
import { friends } from './data';

describe('Unit test for getOptions function', () => {
    test('Can get options by value', () => {
        const optionToFind = friends[Math.floor(Math.random() * friends.length)];

        expect(getOptions(optionToFind.value, null, friends, false)).toStrictEqual(optionToFind);
        expect(getOptions([optionToFind.value], null, friends, false)).toStrictEqual(optionToFind);
        expect(getOptions('foo', null, friends, false)).toEqual(null);
        expect(getOptions('', null, friends, false)).toEqual(null);
    });

    test('Can get multiple options by value', () => {
        const option1 = friends[0];
        const option2 = friends[1];

        expect(getOptions(option1.value, [option2], friends, true)).toStrictEqual([option2, option1]);
        expect(getOptions(option1.value, [option1], friends, true)).toStrictEqual([]);
    });

    test('Can convert single value to multiple', () => {
        const option1 = friends[0];
        const option2 = friends[1];

        expect(getOptions(option1.value, option2, friends, true)).toStrictEqual([option2, option1]);
    });

    test('Ignores new value if option can\'t be found', () => {
        const option1 = friends[0];

        expect(getOptions('foo', [option1], friends, true)).toStrictEqual([option1]);
    });
});
