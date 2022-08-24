import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fetch from '../../cypress/mocks/fetch';
import App from '../App';
import { renderWithRouterAndRedux } from './renderWithRouterAndRedux';

beforeEach(() => {
  jest.spyOn(global, 'fetch')
    .mockImplementation(fetch)
    .mockImplementation(fetch);
});
afterEach(() => {
  jest.resetAllMocks();
});

const ALL_CATEGORY_FILTER = 'All-category-filter';
const FIRST_CARD = '0-card-img';
const SECOND_CARD = '1-card-img';
const THIRD_CARD = '2-card-img';
const FIRST_CARD_NAME = '0-card-name';

describe('Testa o componente Recipes', () => {
  it('Testa se a página de Receitas renderiza as comidas corretamente', async () => {
    const { history } = renderWithRouterAndRedux(<App />, undefined, '/foods');
    const firstCard = await screen.findByTestId(FIRST_CARD);

    expect(firstCard).toBeInTheDocument();

    expect(history.location.pathname).toBe('/foods');
    const link = screen.getAllByTestId('card-link');
    userEvent.click(link[0]);
    expect(history.location.pathname).toContain('/foods/');
  });
  it('Testa se a página de Receitas renderiza as bebidas corretamente', async () => {
    const { history } = renderWithRouterAndRedux(<App />, undefined, '/drinks');
    const firstCard = await screen.findByTestId(FIRST_CARD);

    expect(firstCard).toBeInTheDocument();

    expect(history.location.pathname).toBe('/drinks');
    const link = screen.getAllByTestId('card-link');
    userEvent.click(link[0]);
    expect(history.location.pathname).toContain('/drinks/');
  });
  it('Testa se a página de Receitas renderiza as categorias das comidas corretamente',
    async () => {
      renderWithRouterAndRedux(<App />, undefined, '/foods');
      const firstCard = await screen.findByTestId(FIRST_CARD);

      expect(firstCard).toBeInTheDocument();

      const categoryButton = screen.getByTestId('Beef-category-filter');
      userEvent.click(categoryButton);

      const secondCard = await screen.findByTestId(SECOND_CARD);
      expect(secondCard).toBeInTheDocument();

      const allCategoryButton = screen.getByTestId(ALL_CATEGORY_FILTER);
      userEvent.click(allCategoryButton);
      await screen.findByTestId(THIRD_CARD);

      screen.logTestingPlaygroundURL();
      const firstCardName = screen.getByTestId(FIRST_CARD_NAME);
      expect(firstCardName).toBeInTheDocument();

      userEvent.click(categoryButton);
      userEvent.click(allCategoryButton);
      expect(firstCard).toBeInTheDocument();
    });
  it('Testa se a página de Receitas renderiza as categorias das bebidas corretamente',
    async () => {
      renderWithRouterAndRedux(<App />, undefined, '/drinks');
      const firstCard = await screen.findByTestId(FIRST_CARD);

      expect(firstCard).toBeInTheDocument();

      const categoryButton = screen.getByTestId('Ordinary Drink-category-filter');
      userEvent.click(categoryButton);

      const secondCard = await screen.findByTestId(SECOND_CARD);
      expect(secondCard).toBeInTheDocument();

      const allCategoryButton = screen.getByTestId(ALL_CATEGORY_FILTER);
      userEvent.click(allCategoryButton);
      await screen.findByTestId(THIRD_CARD);

      screen.logTestingPlaygroundURL();
      const firstCardName = screen.getByTestId(FIRST_CARD_NAME);
      expect(firstCardName).toBeInTheDocument();

      userEvent.click(categoryButton);
      const secondCardName = await screen.findByTestId('1-card-name');
      expect(secondCardName).toBeInTheDocument();

      userEvent.click(categoryButton);
      const thirdCardName = await screen.findByTestId('2-card-name');
      expect(thirdCardName).toBeInTheDocument();
    });
});
