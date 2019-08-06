import React from 'react';
import PropTypes from 'prop-types';
import Options from './Options';
import Value from './Value';
import { withSelectSearch } from '../';

const Select = withSelectSearch(props => (
    <div className="select-search-box select-search-box--select">
        {'valueProps' in props && (
            <Value {...props.valueProps} />
        )}
        {props.options.length > 0 && props.focus && (
            <div className="select-search-box__select">
                <Options options={props.options} />
            </div>
        )}
    </div>
));

Select.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    valueProps: PropTypes.object,
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Select;
