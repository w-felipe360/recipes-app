import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './renderWithRouterAndRedux';
import SearchBar from '../components/SearchBar';
import App from '../App';

test('se o filtro de busca está funcionando corretamente', async () => {
  const { history } = renderWithRouterAndRedux(<App />);
  const emailInput = screen.getByPlaceholderText('E-mail');
  const passwordInput = screen.getByPlaceholderText('Senha');
  const button = screen.getByRole('button', {
    name: /enter/i,
  });
  userEvent.type(emailInput, 'testando@trybe.com');
  userEvent.type(passwordInput, '1234567');
  userEvent.click(button);
  const searchIcon = screen.getByTestId('search-top-btn');
  userEvent.click(searchIcon);
  const textbox = screen.getByRole('textbox');
  const buttonSearch = screen.getByRole('button', {
    name: /procurar/i,
  });
  const ingredientRadio = screen.getByRole('radio', {
    name: /ingredient/i,
  });
  userEvent.type(textbox, 'Milk');
  userEvent.click(ingredientRadio);
  userEvent.click(buttonSearch);
  const recipe1 = await screen.findByRole('main');
  expect(recipe1).toBeInTheDocument();
  const corba = await screen.findByText(/corba/i);
  userEvent.click(corba);
  expect(history.location.pathname).toBe('/foods/52977');
  //   history.goBack();
  // userEvent.click(searchIcon);
  // expect(console.log(screen.logTestingPlaygroundURL()));
//   const nameRadio = screen.getByRole('radio', {
//     name: /name/i,
//   });
//   userEvent.click(nameRadio);
});
test('testando outros seachs', async () => {
  const { history } = renderWithRouterAndRedux(<App />);
  const emailInput = screen.getByPlaceholderText('E-mail');
  const passwordInput = screen.getByPlaceholderText('Senha');
  const button = screen.getByTestId('login-submit-btn');
  userEvent.type(emailInput, 'teste@trybe.com');
  userEvent.type(passwordInput, '1234567');
  userEvent.click(button);
  const searchIcon = screen.getByTestId('search-top-btn');
  userEvent.click(searchIcon);
  const textbox = screen.getByRole('textbox');
  const buttonSearch = screen.getByRole('button', {
    name: /procurar/i,
  });
  const nameRadio = screen.getByRole('radio', {
    name: /name/i,
  });
  userEvent.click(nameRadio);
  userEvent.type(textbox, 'Burek');
  userEvent.click(buttonSearch);
  const corba = await screen.findByText(/corba/i);
  expect(corba).toBeInTheDocument();
  userEvent.click(corba);
  expect(history.location.pathname).toBe('/foods/52977');
});
test('se os elementos são renderizados', () => {
  renderWithRouterAndRedux(<SearchBar />);
  jest.spyOn(global, 'alert')
    .mockImplementation((message) => message);
  const textbox = screen.getByRole('textbox');
  const ingredientRadio = screen.getByRole('radio', {
    name: /ingredient/i,
  });
  const nameRadio = screen.getByRole('radio', {
    name: /name/i,
  });
  const firstLetterRadio = screen.getByRole('radio', {
    name: /first letter/i,
  });
  const buttonSearch = screen.getByRole('button', {
    name: /procurar/i,
  });
  userEvent.click(firstLetterRadio);
  userEvent.click(buttonSearch);
  expect(global.alert).toBeCalled();
  expect(global.alert)
    .toHaveBeenCalledWith('Your search must have only 1 (one) character');
  expect(textbox);
  expect(ingredientRadio);
  expect(nameRadio);
  expect(firstLetterRadio);
  expect(buttonSearch);
});
