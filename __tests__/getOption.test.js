import getOption from '../src/lib/getOption';
import { friends } from './data';

describe('Unit test for getOption function', () => {
    test('Can get option by value', () => {
        const optionToFind =
            friends[Math.floor(Math.random() * friends.length)];

        expect(getOption(optionToFind.value, friends)).toStrictEqual(
            optionToFind,
        );
        expect(getOption('foo', friends)).toEqual(null);
    });

    test('Can get option by value (multiple)', () => {
        const option1 = friends[0];
        const option2 = friends[1];

        expect(
            getOption([option1.value, option2.value], friends),
        ).toStrictEqual([option1, option2]);
    });

    test('Return null if no default value can be found', () => {
        const option1 = { ...friends[0], disabled: true };
        const option2 = { ...friends[1], disabled: true };

        expect(getOption(null, [option1, option2])).toEqual(null);
    });
});
