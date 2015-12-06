jest.dontMock('../index');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';


const SelectSearch = require('../index');

describe('SelectSearch', () => {

    it('has select options', () => {
        var selectSearch = TestUtils.renderIntoDocument(
            <SelectSearch name="country" options={[{name: 'Sweden', value: 'SE'}, {name: 'Italy', value: 'IT'}]} value="SE" />
        ), selectSearchNode;

        selectSearchNode = ReactDOM.findDOMNode(selectSearch);

        TestUtils.Simulate.click(selectSearchNode.querySelector('.select-search-box__search'));

        expect(selectSearchNode.querySelectorAll('.select-search-box__option').length).toEqual(2);

    });

});