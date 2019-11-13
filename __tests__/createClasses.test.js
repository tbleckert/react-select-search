import createClasses from '../src/lib/createClasses';

describe('Create classes', () => {
    const baseClass = 'react-select-search-test';
    const expectedClasses = {
        main: `${baseClass}`,
        modifier: 'friends',
        value: `${baseClass}__value`,
        input: `${baseClass}__input`,
        select: `${baseClass}__select`,
        options: `${baseClass}__options`,
        row: `${baseClass}__row`,
        option: `${baseClass}__option`,
        group: `${baseClass}__group`,
        groupHeader: `${baseClass}__group-header`,
    };

    test('Should return expected object of class names', () => {
        const classNames = createClasses(`${baseClass} friends`);

        expect(classNames).toEqual(expectedClasses);
    });
});
