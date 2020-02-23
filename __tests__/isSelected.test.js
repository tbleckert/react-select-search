import isSelected from '../src/lib/isSelected';

describe('Unit test for isSelected function', () => {
    test('Should be true', () => {
        const str = isSelected('foo', 'foo');
        const arr = isSelected('foo', ['foo', 'bar']);

        expect(str).toEqual(true);
        expect(arr).toEqual(true);
    });

    test('Should be false', () => {
        const str = isSelected('foo', 'bar');
        const arr = isSelected('foo', ['bar']);
        const arr2 = isSelected('foo', []);

        expect(str).toEqual(false);
        expect(arr).toEqual(false);
        expect(arr2).toEqual(false);
    });
});
