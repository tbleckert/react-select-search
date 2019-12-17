import findByValue from '../src/lib/findByValue';

describe('Find options by value', () => {
    const options = [
        {
            "name": "Monoton",
            "value": "monoton",
        },
        {
            "name": "Gloria Hallelujah",
            "value": "gloria",
        }
    ];

    test('Should return object from options', () => {
        const value = 'monoton';
        const option = findByValue(options, value);

        expect(typeof option).toBe('object');
        expect(option.value).toBe(value);
        expect(option.name).toBe('Monoton');
    });

    test('Should return null if source is not an array', () => {
        const value = 'monoton';

        expect(findByValue(null, value)).toBe(null);
        expect(findByValue('foo', value)).toBe(null);
    });
});
