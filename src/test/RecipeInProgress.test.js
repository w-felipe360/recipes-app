import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './renderWithRouterAndRedux';
// import SearchBar from '../components/SearchBar';
import App from '../App';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

const url = 'foods/52977/in-progress';
test('se os elementos estão funcionando corretamente', () => {
  const { history } = renderWithRouterAndRedux(<App />);
  history.push(url);
  const shareIcon = screen.getByTestId('share-btn');
  expect(shareIcon).toBeInTheDocument();
  const heart = screen.getByTestId('favorite-btn');
  expect(heart).toBeInTheDocument();
  userEvent.click(heart);
  expect(heart)
    .toHaveAttribute('src', blackHeartIcon);
  userEvent.click(heart);
  expect(heart)
    .toHaveAttribute('src', whiteHeartIcon);
});
test('se os ingredientes aparecem na tela corretamente', async () => {
  const { history } = renderWithRouterAndRedux(<App />);
  history.push(url);
  const treze = 13;
  const lentils = await screen.findByText(/lentils - 1 cup/i);
  expect(lentils).toBeInTheDocument();
  const allCheckBoxes = await screen.findAllByRole('checkbox');
  expect(allCheckBoxes).toHaveLength(treze);
  const headingInstructions = await screen
    .findByRole('heading', { name: /instructions/i });
  expect(headingInstructions).toBeInTheDocument();
  const ingredients = screen.getByRole('heading', { name: /ingredients/i });
  expect(ingredients).toBeInTheDocument();
  const recipeName = await screen.findByText('Corba');
  expect(recipeName);
  const categoryName = await screen.findByText('Side');
  expect(categoryName).toBeInTheDocument();
  const description = await screen.findByText(/pick through your lentils for any for/i);
  expect(description).toBeInTheDocument();
});
test('se os checkboxs estão funcionando corretamente', async () => {
  const { history } = renderWithRouterAndRedux(<App />);
  history.push(url);
  const checkbox1 = await screen.findByRole('checkbox', {
    name: /lentils - 1 cup/i,
  });
  const text = await screen.findByText(/lentils - 1 cup/i);
  expect(text).toHaveAttribute('class', 'none');
  userEvent.click(checkbox1);
  expect(text).toHaveAttribute('class', 'line');
});
test('se o botão de finalizar receita funciona corretamente', async () => {
  const { history } = renderWithRouterAndRedux(<App />);
  history.push('drinks/15997/in-progress');
  const finishRecipes = await screen.findByText(/finish recipe/i);
  expect(finishRecipes.disabled).toBe(true);
  const check1 = await screen.findByRole('checkbox', {
    name: /galliano - 2 1\/2 shots/i,
  });
  const check2 = await screen.findByRole('checkbox', {
    name: /ginger ale/i,
  });
  const check3 = await screen.findByRole('checkbox', {
    name: /ice/i,
  });
  userEvent.click(check1);
  userEvent.click(check2);
  userEvent.click(check3);
  const finishRecipes2 = await screen.findByText(/finish recipe/i);
  expect(finishRecipes2).not.toBeDisabled();
  userEvent.click(finishRecipes2);
  expect(history.location.pathname).toBe('/done-recipes');
});
// test('clipboard', async () => {
//   const { history } = renderWithRouterAndRedux(<App />);
//   history.push(url);
//   const shareIcon = screen.getByTestId('share-btn');
//   userEvent.click(shareIcon);
//   const share = await findByText('Link copied!');
//   expect(share).toBeInTheDocument();
// });
