import { screen } from '@testing-library/react';
import React from 'react';
import fetch from '../../cypress/mocks/fetch';
import Recipes from '../pages/Recipes';
import { renderWithRouterAndRedux } from './renderWithRouterAndRedux';

beforeEach(() => {
  jest.spyOn(global, 'fetch')
    .mockImplementationOnce(fetch);
});
afterEach(() => {
  jest.resetAllMocks();
});

describe('Testa o componente Recipes', () => {
  it('Testa se profile icon e page title estão na tela', async () => {
    const { history } = renderWithRouterAndRedux(<Recipes />, undefined, '/foods');
    const firstCard = await screen.findByTestId('0-card-img');

    screen.logTestingPlaygroundURL();
    expect(firstCard).toBeInTheDocument();

    expect(history.location.pathname).toBe('/foods');
  });
});
