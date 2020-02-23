import getOption from '../src/lib/getOption';
import { friends } from './data';

describe('Unit test for getOption function', () => {
    test('Can find option by value', () => {
        const optionToFind = friends[Math.floor(Math.random() * friends.length)];

        expect(getOption(optionToFind.value, friends)).toStrictEqual(optionToFind);
        expect(getOption([optionToFind.value], friends)).toStrictEqual([optionToFind]);
        expect(getOption('foo', friends)).toEqual(null);
        expect(getOption('', friends)).toEqual(null);
    });
});
