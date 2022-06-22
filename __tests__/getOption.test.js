import getOption from '../src/lib/getOption';
import { friends } from './data';

describe('Unit test for getOption function', () => {
    test('Can get option by value', () => {
        const optionToFind = friends[Math.floor(Math.random() * friends.length)];

        expect(getOption(optionToFind.value, friends)).toStrictEqual(optionToFind);
        expect(getOption('foo', friends)).toEqual(undefined);
    });

    test('If value looks like an option, return it', () => {
        const optionToFind = friends[Math.floor(Math.random() * friends.length)];

        expect(getOption(optionToFind, friends)).toEqual(optionToFind);
    });

    test('Return default value if value is null, skip disabled', () => {
        const option1 = friends[1];
        const option2 = friends[2];

        expect(getOption(null, friends)).toEqual(friends[0]);
        expect(getOption(null, [option1, option2])).toEqual(option2);
    });

    test('Return undefined if no default value can be found', () => {
        const option1 = { ...friends[0], disabled: true };
        const option2 = { ...friends[1], disabled: true };

        expect(getOption(null, [option1, option2])).toEqual(undefined);
    });
});
