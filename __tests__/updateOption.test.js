import updateOption from '../src/lib/updateOption';
import { friends } from './data';

describe('Unit test for updateOption function', () => {
    test('Can change option', () => {
        const friend = friends[0];

        expect(updateOption(friend, null).value).toEqual(friend.value);
        expect(updateOption(friend, friend[1]).value).toEqual(friend.value);
    });

    test('Can update multiple options', () => {
        const friend1 = friends[0];
        const friend2 = friends[1];

        expect(updateOption(friend1, null, true)).toStrictEqual([friend1]);
        expect(updateOption([friend1], null, true)).toStrictEqual([friend1]);
        expect(updateOption(friend1, [friend2], true)).toStrictEqual([
            friend2,
            friend1,
        ]);
        expect(updateOption(friend1, friend2, true)).toStrictEqual([
            friend2,
            friend1,
        ]);
        expect(updateOption(friend1, [friend1], true)).toStrictEqual([]);
    });

    test('Return old value if no new one', () => {
        const friend = friends[0];

        expect(updateOption(null, friend)).toStrictEqual(friend);
        expect(updateOption(null, [friend], true)).toStrictEqual([friend]);
    });
});
