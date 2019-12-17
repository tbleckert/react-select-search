import cancelablePromise from '../src/lib/cancelablePromise';

describe('Cancelable promises', () => {
    test('Resolves', (done) => {
        const promise = new Promise((resolve) => {
            setTimeout(() => resolve('yes'), 50);
        });

        const result = cancelablePromise(promise);

        expect.assertions(1);

        result.promise.then((response) => {
            expect(response).toBe('yes');
            done();
        });
    });

    test('Rejects', (done) => {
        const promise = new Promise((resolve, reject) => {
            setTimeout(() => reject('yes'), 50);
        });

        const result = cancelablePromise(promise);

        expect.assertions(1);

        result.promise.catch((error) => {
            expect(error).toBe('yes');
            done();
        });
    });

    test('Can cancel promise', (done) => {
        const promise = new Promise((resolve) => {
            setTimeout(() => resolve('yes'), 50);
        });

        const result = cancelablePromise(promise);

        result.cancel();

        expect.assertions(1);

        result.promise.catch((error) => {
            expect(error.message).toBe('canceled');
            done();
        });
    });

    test('Ignores reject if cancelled', (done) => {
        const promise = new Promise((resolve, reject) => {
            setTimeout(() => reject('yes'), 50);
        });

        const result = cancelablePromise(promise);

        result.cancel();

        expect.assertions(1);

        result.promise.catch((error) => {
            expect(error.message).toBe('canceled');
            done();
        });
    });
});
