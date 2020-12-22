import getOption from '../src/lib/getOption';
import { friends } from './data';

describe('Unit test for getOption function', () => {
    test('Can get option by value', () => {
        const optionToFind = friends[Math.floor(Math.random() * friends.length)];

        expect(getOption(optionToFind.value, null, friends, false)).toStrictEqual(optionToFind);
        expect(getOption([optionToFind.value], null, friends, false)).toStrictEqual([optionToFind]);
        expect(getOption('foo', null, friends, false)).toEqual(null);
        expect(getOption('', null, friends, false)).toEqual(null);
    });

    test('Can get multiple options by value', () => {
        const option1 = friends[0];
        const option2 = friends[1];

        expect(getOption(option1.value, [option2], friends, true)).toStrictEqual([option2, option1]);
        expect(getOption(option1.value, [option1], friends, true)).toStrictEqual([]);
    });

    test('Can convert single value to multiple', () => {
        const option1 = friends[0];
        const option2 = friends[1];

        expect(getOption(option1.value, option2, friends, true)).toStrictEqual([option2, option1]);
    });
});
