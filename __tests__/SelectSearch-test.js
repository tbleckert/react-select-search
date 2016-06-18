jest.autoMockOff()

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';


const SelectSearch = require('../src/index').default;

describe('SelectWithSearch', () => {

    const options = [{name: 'Sweden', value: 'SE'}, {name: 'Italy', value: 'IT'}];

    it('has search field', () => {
        const selectSearch = TestUtils.renderIntoDocument(
            <SelectSearch name="country" options={options} value="SE" />
        );

        const selectSearchNode = ReactDOM.findDOMNode(selectSearch);

        TestUtils.findRenderedDOMComponentWithClass(selectSearch, 'select-search-box__search');
    });

    it('has select options', () => {
        const selectSearch = TestUtils.renderIntoDocument(
            <SelectSearch name="country" options={options} value="SE" />
        );

        let selectSearchNode = ReactDOM.findDOMNode(selectSearch);

        TestUtils.Simulate.focus(selectSearchNode.querySelector('.select-search-box__search'));

        expect(selectSearchNode.querySelectorAll('.select-search-box__option').length).toEqual(2);
    });

    it('empties search field on focus', () => {
        const selectSearch = TestUtils.renderIntoDocument(
            <SelectSearch name="country" options={options} value="SE" />
        );

        let selectSearchNode = ReactDOM.findDOMNode(selectSearch);
        let searchField      = selectSearchNode.querySelector('.select-search-box__search');

        searchField.value = 'Foo';

        expect(searchField.value.length).toEqual(3);

        TestUtils.Simulate.focus(searchField);

        expect(searchField.value.length).toEqual(0);
    });

});