import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ children, type, name, value, checked, ...otherProps }) => (
  <label htmlFor={ `form-${name}` }>
    { children }
    <input
      name={ name }
      id={ `form-${name}` }
      type={ type }
      value={ value }
      checked={ checked }
      { ...otherProps }
    />
  </label>
);

Input.propTypes = {
  children: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  checked: PropTypes.bool,
};

Input.defaultProps = {
  checked: null,
  children: '',
};

export default Input;
