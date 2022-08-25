import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './renderWithRouterAndRedux';
import Profile from '../pages/Profile';
import App from '../App';
// import { setLocalStorage } from '../helpers/localStorage';

// beforeEach(() => {
//   jest.spyOn(localStorage);
//   const email = { email: 'w.felipebraz@gmail.com' };
//   setLocalStorage('user', JSON.stringify(email));
// });

test(`teste se os elementos do componente '/profile'
são renderizados corretamente`, () => {
  const { history } = renderWithRouterAndRedux(<App />);
  const emailInput = screen.getByPlaceholderText('E-mail');
  const passwordInput = screen.getByPlaceholderText('Senha');
  const button = screen.getByTestId('login-submit-btn');
  userEvent.type(emailInput, 'teste@trybe.com');
  userEvent.type(passwordInput, '1234567');
  userEvent.click(button);
  history.push('/profile');
  const profileEmail = screen.getByTestId('profile-email');
  expect(profileEmail).toBeInTheDocument();
  const doneRecipes = screen.getByTestId('profile-done-btn');
  const favoriteRecipes = screen.getByTestId('profile-favorite-btn');
  const logout = screen.getByTestId('profile-logout-btn');
  expect(doneRecipes).toBeInTheDocument();
  expect(logout).toBeInTheDocument();
  expect(favoriteRecipes).toBeInTheDocument();

//   const doneRecipes = screen.getByTestId('profile-done-btn');
//   const favoriteRecipes = screen.getByTestId('profile-favorite-btn');
//   const logout = screen.getByTestId('profile-logout-btn');
//   expect(email).toBeInTheDocument();
//   expect(doneRecipes).toBeInTheDocument();
//   expect(logout).toBeInTheDocument();
//   expect(favoriteRecipes).toBeInTheDocument();
});
test('se os elementos estão redirecionando para as páginas corretamente', () => {
  const { history } = renderWithRouterAndRedux(<Profile />);
  const doneRecipes = screen.getByTestId('profile-done-btn');
  userEvent.click(doneRecipes);
  history.push('/done-recipes');
  expect(history.location.pathname).toBe('/done-recipes');
});
test('se ao clicar no logout, o usuário é redirecionado para o Login', () => {
  const { history } = renderWithRouterAndRedux(<Profile />);
  const logout = screen.getByTestId('profile-logout-btn');
  userEvent.click(logout);
  history.push('/');
  expect(history.location.pathname).toBe('/');
});
test('se ao clicar no favorite recipes, o usuário é redirecionado.', () => {
  const { history } = renderWithRouterAndRedux(<App />);
  const emailInput = screen.getByPlaceholderText('E-mail');
  const passwordInput = screen.getByPlaceholderText('Senha');
  const button = screen.getByTestId('login-submit-btn');
  userEvent.type(emailInput, 'teste@trybe.com');
  userEvent.type(passwordInput, '1234567');
  userEvent.click(button);
  history.push('/profile');

  const favoriteRecipes = screen.getByTestId('profile-favorite-btn');
  userEvent.click(favoriteRecipes);
  history.push('/favorite-recipes');
  expect(history.location.pathname).toBe('/favorite-recipes');
});
