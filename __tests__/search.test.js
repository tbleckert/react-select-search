import fuzzySearch from '../src/fuzzySearch';
import flattenOptions from '../src/lib/flattenOptions';
import { countries } from './data';

const options = flattenOptions(countries);

describe('Unit test for search function', () => {
    test('Can search', () => {
        const newOptions = fuzzySearch(options);

        expect(typeof newOptions).toEqual('function');
        expect(newOptions('sweden').length).toEqual(1);
        expect(newOptions('sweden')[0].name).toEqual('Sweden');
    });
});
