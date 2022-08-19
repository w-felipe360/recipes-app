import React from 'react';
import PropTypes from 'prop-types';

const ComboBox = (
  { value, onChange, data, name,
    className, ...otherProps },
) => (
  <select
    className={ className }
    name={ name }
    value={ value }
    onChange={ onChange }
    { ...otherProps }
  >
    {data.map((option) => (
      <option key={ option }>{option}</option>
    ))}
  </select>
);

ComboBox.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
};

ComboBox.defaultProps = {
  className: null,
  value: '',
};

export default ComboBox;
