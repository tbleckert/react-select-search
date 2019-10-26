import createClasses from '../src/lib/createClasses';

describe('Create classes', () => {
    const baseClass = 'react-select-search-test';
    const expectedClasses = {
        main: `${baseClass}`,
        search: `${baseClass}__search`,
        select: `${baseClass}__select`,
        options: `${baseClass}__options`,
        row: `${baseClass}__row`,
        option: `${baseClass}__option`,
        group: `${baseClass}__group`,
        groupHeader: `${baseClass}__group-header`,
    };

    test('Should return expected object of class names', () => {
        const classNames = createClasses(baseClass);

        expect(classNames).toEqual(expectedClasses);
    });
});
