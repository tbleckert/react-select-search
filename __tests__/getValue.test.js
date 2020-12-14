import { friends } from './data';
import getValue from '../src/lib/getValue';

describe('Unit test for getValue function', () => {
    test('Can get multiple values', () => {
        const values = friends.map((f) => f.value);

        expect(getValue(friends)).toStrictEqual(values);
    });

    test('Can get single value', () => {
        const optionToFind = friends[Math.floor(Math.random() * friends.length)];

        expect(getValue(optionToFind)).toStrictEqual(optionToFind.value);
    });

    test('Returns null if no option', () => {
        expect(getValue(false)).toStrictEqual(null);
        expect(getValue({ name: 'Hamburger' })).toStrictEqual(null);
    });
});
