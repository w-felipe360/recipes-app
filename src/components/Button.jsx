import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ children, className, ...otherProps }) => (
  <button
    className={ `btn btn-primary ${className}` }
    type="button"
    { ...otherProps }
  >
    { children }
  </button>
);

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

Button.defaultProps = {
  children: null,
  className: null,
};

export default Button;
