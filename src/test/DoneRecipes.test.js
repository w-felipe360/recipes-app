import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './renderWithRouterAndRedux';
import doneRecipesMockData from './mocks/doneRecipesMockData';
import { createLocalStorage, setLocalStorage } from '../helpers/localStorage';

beforeEach(() => {
  createLocalStorage('doneRecipes');
  setLocalStorage('doneRecipes', doneRecipesMockData);
});
afterEach(() => {
  localStorage.removeItem('doneRecipes');
});

describe('Testa o componente Recipes', () => {
  it('Testa se a página de DoneRecipes renderiza corretamente', async () => {
    renderWithRouterAndRedux(<App />, undefined, '/done-recipes');

    const titles = screen.getAllByRole('heading', { level: 4 });
    expect(titles).toHaveLength(2);
  });
  it('Testa se a página de DoneRecipes filtra as receitas corretamente', async () => {
    renderWithRouterAndRedux(<App />, undefined, '/done-recipes');
    const titlesStr = '0-horizontal-name';

    const filterByAllButton = screen.getByTestId('filter-by-all-btn');
    const filterByFoodButton = screen.getByTestId('filter-by-food-btn');
    const filterByDrinkButton = screen.getByTestId('filter-by-drink-btn');

    userEvent.click(filterByFoodButton);
    const titles = screen.getAllByRole('heading', { level: 4 });
    const dish = screen.getByTestId(titlesStr);
    expect(dish).toBeInTheDocument();

    userEvent.click(filterByDrinkButton);
    expect(titles).toHaveLength(1);
    const drink = screen.getByTestId(titlesStr);
    expect(drink).toBeInTheDocument();

    userEvent.click(filterByAllButton);

    const drinkAfterFilter = screen.getByTestId(titlesStr);
    expect(drinkAfterFilter).toBeInTheDocument();

    const dishAfterFilter = screen.getByTestId(titlesStr);
    expect(dishAfterFilter).toBeInTheDocument();

    const titlesAfterFilter = screen.getAllByRole('heading', { level: 4 });
    expect(titlesAfterFilter).toHaveLength(2);
  });
});
