import classes from '../src/lib/classes';

describe('Unit test for classes function', () => {
    test('Should return string containing correct classes', () => {
        expect(classes({
            container: true,
            'is-searching': false,
        })).toEqual('container');

        expect(classes({
            container: true,
            'is-searching': true,
        })).toEqual('container is-searching');
    });
});
