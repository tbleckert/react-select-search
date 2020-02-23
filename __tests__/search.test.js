import search from '../src/search';
import flattenOptions from '../src/lib/flattenOptions';
import { countries } from './data';

const options = flattenOptions(countries);
const fuseOptions = {
    keys: ['name', 'groupName'],
    threshold: 0.3,
};

describe('Unit test for search function', () => {
    test('Can search', () => {
        const newOptions = search('sweden', options, fuseOptions);

        expect(typeof newOptions).toEqual('object');
        expect(newOptions.length).toEqual(1);
        expect(newOptions[0].name).toEqual('Sweden');
    });

    test('Return false if unmet conditions', () => {
        const newOptions = search('sweden', null, null);

        expect(newOptions).toEqual(false);
    });
});
