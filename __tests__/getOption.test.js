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
        const option1ToFind = friends[Math.floor(Math.random() * friends.length)];
        const option2 = friends[Math.floor(Math.random() * friends.length)];

        expect(getOption(option1ToFind.value, [option2], friends, true)).toStrictEqual([option2, option1ToFind]);
        expect(getOption(option1ToFind.value, [option1ToFind], friends, true)).toStrictEqual([]);
    });

    test('Can convert single value to multiple', () => {
        const option1ToFind = friends[Math.floor(Math.random() * friends.length)];
        const option2 = friends[Math.floor(Math.random() * friends.length)];

        expect(getOption(option1ToFind.value, option2, friends, true)).toStrictEqual([option2, option1ToFind]);
    });
});
