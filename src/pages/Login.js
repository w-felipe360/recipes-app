import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import recebeEmail from '../redux/actions';
import { setLocalStorage, saveTokenToLocalStorage } from '../helpers/localStorage';

const VALID_EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const minLength = 7;
  const isPasswordValid = password.length < minLength;
  const isEmailValid = !VALID_EMAIL_REGEX.test(email);
  const isButtonDisabled = isPasswordValid || isEmailValid;
  const dispatch = useDispatch();
  const chave = { email };
  const history = useHistory();
  const sendAction = () => {
    dispatch(recebeEmail(email));
    setLocalStorage('user', chave);
    saveTokenToLocalStorage('mealsToken', '1');
    saveTokenToLocalStorage('cocktailsToken', '1');
    history.push('/foods');
    // console.log(chave);
  };
  console.log(isPasswordValid, isEmailValid, isButtonDisabled);
  return (
    <div>
      <input
        name="email"
        placeholder="E-mail"
        type="email"
        data-testid="email-input"
        value={ email }
        onChange={ ({ target: { value } }) => setEmail(value) }
      />
      <input
        name="password"
        placeholder="Senha"
        type="password"
        data-testid="password-input"
        onChange={ ({ target: { value } }) => setPassword(value) }
        value={ password }
      />
      <button
        type="submit"
        data-testid="login-submit-btn"
        disabled={ isButtonDisabled }
        onClick={ sendAction }
      >
        Enter

      </button>
    </div>
  );
};

export default Login;
