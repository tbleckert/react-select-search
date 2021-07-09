import debounce from '../src/lib/debounce';

describe('Unit tests for debounce function', () => {
    test('Callback should only be triggered once after wait', (done) => {
        const callback = jest.fn();
        const wait = 20;
        const debounced = debounce(callback, 20);

        debounced();
        debounced();
        debounced();

        expect(callback.mock.calls.length).toBe(0);

        setTimeout(() => {
            expect(callback.mock.calls.length).toBe(1);
            done();
        }, wait);
    });
});
