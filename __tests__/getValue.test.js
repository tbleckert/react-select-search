import { friends } from './data';
import getValue from '../src/lib/getValue';

describe('Unit test for getValue function', () => {
    test('Can get value from option', () => {
        const friend = friends[0];

        expect(getValue(friend)).toStrictEqual(friend.value);
    });

    test('Non option should return null', () => {
        expect(getValue({ name: 'Name' })).toStrictEqual(null);
        expect(getValue()).toStrictEqual(null);
    });

    test('Can get value from multiple options', () => {
        const friend1 = friends[0];
        const friend2 = friends[1];

        expect(getValue([friend1, friend2])).toStrictEqual([
            friend1.value,
            friend2.value,
        ]);
    });
});
