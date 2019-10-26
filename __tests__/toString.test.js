import toString from '../src/lib/toString';

describe('Values should transform to string', () => {
    test('undefined and null should transform to empty string', () => {
        expect(toString(undefined)).toBe('');
        expect(toString(null)).toBe('');
    });

    test('numbers should transform to string', () => {
        expect(toString(1)).toBe('1');
        expect(toString(1.5)).toBe('1.5');
    });

    test('strings should stay equal to input', () => {
        expect(toString('foo')).toBe('foo');
    });
});
