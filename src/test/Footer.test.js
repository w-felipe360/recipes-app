import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './renderWithRouterAndRedux';
import Footer from '../components/Footer';

test('se no componente footer é renderizado corretamente', () => {
  renderWithRouterAndRedux(<Footer />);
  const drinkIcon = screen.getByTestId('drinks-bottom-btn');
  const mealsIcon = screen.getByTestId('meals-bottom-btn');
  expect(drinkIcon).toBeInTheDocument();
  expect(mealsIcon).toBeInTheDocument();
});
test('se ao clicar nos ícones, o usuário é redirecionado para as páginas', () => {
  const { history } = renderWithRouterAndRedux(<Footer />);
  const drinkIcon = screen.getByTestId('drinks-bottom-btn');
  userEvent.click(drinkIcon);
  expect(history.location.pathname).toBe('/drinks');
});
test('se ao clicar no ícone mealsIcon o usuário é redirecionado para /foods', () => {
  const { history } = renderWithRouterAndRedux(<Footer />);
  const mealsIcon = screen.getByTestId('meals-bottom-btn');
  userEvent.click(mealsIcon);
  expect(history.location.pathname).toBe('/foods');
});
