import PropTypes from 'prop-types';
var option = PropTypes.shape({
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
});
export var optionType = PropTypes.oneOfType([option, PropTypes.shape({
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(option)
})]);
export var valueType = PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]);
export var classNameType = PropTypes.oneOfType([PropTypes.string, PropTypes.func]);