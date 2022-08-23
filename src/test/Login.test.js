import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './renderWithRouterAndRedux';
import Login from '../pages/Login';

it('should be rendering the logging screen', () => {
  renderWithRouterAndRedux(<Login />);
  const emailInput = screen.getByPlaceholderText('E-mail');
  expect(emailInput).toBeInTheDocument();
});
test(`se ao preencher os inputs de email e senha, 
o botão de login deve estar habilitado`, () => {
  const { history } = renderWithRouterAndRedux(<Login />);
  const emailInput = screen.getByPlaceholderText('E-mail');
  const passwordInput = screen.getByPlaceholderText('Senha');
  const button = screen.getByTestId('login-submit-btn');
  expect(passwordInput).toBeInTheDocument();
  expect(button).toBeDisabled();
  userEvent.type(emailInput, 'teste@trybe.com');
  userEvent.type(passwordInput, '1234567');
  expect(button).toBeEnabled();
  userEvent.click(button);
  expect(history.location.pathname).toBe('/foods');
});
