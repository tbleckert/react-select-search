import fuzzySearch from '../src/fuzzySearch';
import flattenOptions from '../src/lib/flattenOptions';
import { countries, fontStacks } from './data';

const options = flattenOptions(countries);
const fontOptions = flattenOptions(fontStacks);

describe('Unit test for search function', () => {
    test('Can search', () => {
        const newOptions = fuzzySearch(options, 'swden');
        const exactMatch = fuzzySearch(options, 'Italy');
        const noOptions = fuzzySearch(options, 'foobar');

        expect(newOptions.length).toEqual(1);
        expect(newOptions[0].name).toEqual('Sweden');
        expect(exactMatch[0].name).toEqual('Italy');
        expect(noOptions.length).toEqual(0);
    });

    test('Can search groups', () => {
        const newOptions = fuzzySearch(fontOptions, 'Sans serif');
        const noOptions = fuzzySearch(fontOptions, 'foobar');

        expect(newOptions.length).toEqual(1);
        expect(noOptions.length).toEqual(0);
    });
});
