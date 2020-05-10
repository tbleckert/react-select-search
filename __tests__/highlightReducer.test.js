import highlightReducer from '../src/highlightReducer';
import flattenOptions from '../src/lib/flattenOptions';
import { countries, friends } from './data';

const options = flattenOptions(countries);
const optionsWithDisabled = flattenOptions(friends);

describe('Unit test for highlightReducer function', () => {
    test('Falsy value should return -1', () => {
        const state = highlightReducer(0, null);

        expect(state).toEqual(-1);
    });

    test('Missing options should return input', () => {
        const state = highlightReducer(0, { key: 'ArrowLeft', options: null });

        expect(state).toEqual(0);
    });

    test('ArrowDown should increment input if not last option', () => {
        const state = highlightReducer(0, { key: 'ArrowDown', options });

        expect(state).toEqual(1);
    });

    test('ArrowDown should equal 0 if last option', () => {
        const state = highlightReducer(options.length - 1, { key: 'ArrowDown', options });

        expect(state).toEqual(0);
    });

    test('ArrowDown should equal -1 if more than max', () => {
        const state = highlightReducer(options.length, { key: 'ArrowDown', options });

        expect(state).toEqual(-1);
    });

    test('ArrowUp should decrease input if not first option', () => {
        const state = highlightReducer(1, { key: 'ArrowUp', options });

        expect(state).toEqual(0);
    });

    test('ArrowUp should equal last option if first option', () => {
        const state = highlightReducer(0, { key: 'ArrowUp', options });

        expect(state).toEqual(options.length - 1);
    });

    test('ArrowUp should equal -1 if below zero', () => {
        const state = highlightReducer(-1, { key: 'ArrowUp', options });

        expect(state).toEqual(-1);
    });

    test('Should skip to next option if option is disabled', () => {
        const state = highlightReducer(0, { key: 'ArrowDown', options: friends });

        expect(state).toEqual(2);
    });
});
