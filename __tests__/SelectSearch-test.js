jest.dontMock('../index');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';


const SelectSearch = require('../index').default;

describe('SelectWithSearch', () => {

    const selectSearch = TestUtils.renderIntoDocument(
        <SelectSearch name="country" options={[{name: 'Sweden', value: 'SE'}, {name: 'Italy', value: 'IT'}]} value="SE" />
    );

    it('has select options', () => {
        var selectSearchNode = ReactDOM.findDOMNode(selectSearch);

        TestUtils.Simulate.focus(selectSearchNode.querySelector('.select-search-box__search'));

        expect(selectSearchNode.querySelectorAll('.select-search-box__option').length).toEqual(2);
    });

    it('empties search field on focus', () => {
        var selectSearchNode = ReactDOM.findDOMNode(selectSearch),
            searchField      = selectSearchNode.querySelector('.select-search-box__search');

        TestUtils.Simulate.focus(searchField);

        expect(searchField.value.length).toEqual(0);
    });

});