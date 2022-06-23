import highlight from '../src/lib/highlight';
import { friends } from './data';

describe('Unit test for highlight function', () => {
    test('Can move down', () => {
        expect(highlight(-1, 'down', friends)).toEqual(0);
    });

    test('Can move up', () => {
        expect(highlight(3, 'up', friends)).toEqual(2);
    });

    test('Can reverse to end or beginning', () => {
        expect(highlight(-1, 'up', friends)).toEqual(friends.length - 1);
        expect(highlight(friends.length - 1, 'down', friends)).toEqual(0);
    });
});
