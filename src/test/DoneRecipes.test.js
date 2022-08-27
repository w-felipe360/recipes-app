import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './renderWithRouterAndRedux';
import doneRecipesMockData from './mocks/doneRecipesMockData';
import { createLocalStorage, setLocalStorage } from '../helpers/localStorage';
import DoneRecipes from '../pages/DoneRecipes';

beforeEach(() => {
  createLocalStorage('doneRecipes');
  setLocalStorage('doneRecipes', doneRecipesMockData);
});
afterEach(() => {
  localStorage.removeItem('doneRecipes');
});

describe('Testa o componente Recipes', () => {
  it('Testa se a página de Receitas renderiza as comidas corretamente', async () => {
    const { history } = renderWithRouterAndRedux(<App />, undefined, '/done-recipes');

    const titles = screen.getAllByRole('heading', { level: 4 });
    expect(titles).toHaveLength(2);
    screen.logTestingPlaygroundURL();
  });
  it('Testa se a página de Receitas renderiza as comidas corretamente', async () => {
    const { history } = renderWithRouterAndRedux(<App />, undefined, '/done-recipes');

    const filterByAllButton = screen.getByTestId('filter-by-all-btn');
    const filterByFoodButton = screen.getByTestId('filter-by-food-btn');
    const filterByDrinkButton = screen.getByTestId('filter-by-drink-btn');

    userEvent.click(filterByFoodButton);
    const titles = screen.getAllByRole('heading', { level: 4 });
    const dish = screen.getByTestId('0-horizontal-name');
    expect(dish).toBeInTheDocument();

    userEvent.click(filterByDrinkButton);
    expect(titles).toHaveLength(1);
    const drink = screen.getByTestId('0-horizontal-name');
    expect(drink).toBeInTheDocument();

    userEvent.click(filterByAllButton);

    const drinkAfterFilter = screen.getByTestId('0-horizontal-name');
    expect(drinkAfterFilter).toBeInTheDocument();

    const dishAfterFilter = screen.getByTestId('0-horizontal-name');
    expect(dishAfterFilter).toBeInTheDocument();

    const titlesAfterFilter = screen.getAllByRole('heading', { level: 4 });
    expect(titlesAfterFilter).toHaveLength(2);
    screen.logTestingPlaygroundURL();
  });
});
