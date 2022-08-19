import React, { useState } from 'react';
import { connect } from 'react-redux';
import recebeEmail from '../redux/actions';

const VALID_EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  console.log('Login');
  const minLength = 7;
  const isPasswordValid = password.length < minLength;
  const isEmailValid = !VALID_EMAIL_REGEX.test(email);
  const isButtonDisabled = isPasswordValid || isEmailValid;
  console.log(isPasswordValid, isEmailValid, isButtonDisabled);
  return (
    <div>
      <input
        name="email"
        type="email"
        data-testid="email-input"
        value={ email }
        onChange={ ({ target: { value } }) => setEmail(value) }
      />
      <input
        name="password"
        type="password"
        data-testid="password-input"
        onChange={ ({ target: { value } }) => setPassword(value) }
        value={ password }
      />
      <button
        type="submit"
        data-testid="login-submit-btn"
        disabled={ isButtonDisabled }
      >
        Enter

      </button>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => ({
  pegaEmail: (email) => dispatch(recebeEmail(email)),
});
export default connect(null, mapDispatchToProps)(Login);
