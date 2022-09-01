import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './renderWithRouterAndRedux';

beforeEach(() => {
  jest.spyOn(global, 'fetch')
    .mockImplementationOnce(fetch);
});
afterEach(() => {
  jest.resetAllMocks();
});

describe('Testa o componente Recipes', () => {
  it('Testa se a página de DoneRecipes renderiza corretamente', async () => {
    renderWithRouterAndRedux(<App />, undefined, '/drinks/15997');
    await waitForElementToBeRemoved(() => screen.getByText(/Loading.../i));
    screen.logTestingPlaygroundURL();

    const shareBtn = screen.getByTestId('share-btn');
    userEvent.click(shareBtn);
    expect(shareBtn).toBeInTheDocument();
    const linkCopiedText = screen.getByText(/link copied!/i);
    expect(linkCopiedText).toBeInTheDocument();

    screen.logTestingPlaygroundURL();
    // const titles = screen.getAllByRole('heading', { level: 4 });
    // expect(titles).toHaveLength(2);
  });
});
