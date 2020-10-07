import fuzzySearch from '../src/fuzzySearch';
import flattenOptions from '../src/lib/flattenOptions';
import { countries } from './data';

const options = flattenOptions(countries);
const fuseOptions = {
    keys: ['name', 'groupName'],
    threshold: 0.3,
};

describe('Unit test for search function', () => {
    test('Can search', () => {
        const newOptions = fuzzySearch('sweden', options, fuseOptions);

        expect(typeof newOptions).toEqual('object');
        expect(newOptions.length).toEqual(1);
        expect(newOptions[0].name).toEqual('Sweden');
    });

    test('Return same options if unmet conditions', () => {
        const searchOptions = [];
        const newOptions = fuzzySearch('sweden', searchOptions, null);

        expect(newOptions).toEqual(searchOptions);
    });
});
