import PropTypes from 'prop-types';

const option = PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
});

export const optionType = PropTypes.oneOfType([
    option,
    PropTypes.shape({
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        items: PropTypes.arrayOf(option),
    }),
]);

export const valueType = PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
]);

export const classNameType = PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
]);
