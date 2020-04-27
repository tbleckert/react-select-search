import isSelected from '../src/lib/isSelected';

const option = { value: 'foo', name: 'Foo' };
const secondOption = { value: 'bar', name: 'Bar' };

describe('Unit test for isSelected function', () => {
    test('Should be true', () => {
        const str = isSelected(option, option);
        const arr = isSelected(option, [option, secondOption]);

        expect(str).toEqual(true);
        expect(arr).toEqual(true);
    });

    test('Should be false', () => {
        const str = isSelected(option, secondOption);
        const arr = isSelected(option, [secondOption]);
        const arr2 = isSelected(option, []);

        expect(str).toEqual(false);
        expect(arr).toEqual(false);
        expect(arr2).toEqual(false);
    });
});
