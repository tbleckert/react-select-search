import { friends } from './data';
import getValue from '../src/lib/getValue';

describe('Unit test for getValue function', () => {
    test('Can get value from option', () => {
        const friend = friends[0];

        expect(getValue(friend)).toStrictEqual(friend.value);
    });

    test('Non option should return null', () => {
        expect(getValue({ name: 'Name' })).toStrictEqual(null);
    });
});
