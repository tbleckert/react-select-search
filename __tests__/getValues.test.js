import { friends } from './data';
import getValues from '../src/lib/getValues';

describe('Unit test for getValues function', () => {
    test('Can get multiple values', () => {
        const values = friends.map((f) => f.value);

        expect(getValues(friends)).toStrictEqual(values);
    });

    test('Can get single value', () => {
        const optionToFind = friends[Math.floor(Math.random() * friends.length)];

        expect(getValues(optionToFind)).toStrictEqual(optionToFind.value);
    });

    test('Returns null if no option', () => {
        expect(getValues(false)).toStrictEqual(null);
        expect(getValues({ name: 'Hamburger' })).toStrictEqual(null);
    });
});
