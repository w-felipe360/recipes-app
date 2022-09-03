import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './renderWithRouterAndRedux';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import ggDrink from './mocks/ggDrink';
import { createLocalStorage, setLocalStorage } from '../helpers/localStorage';

beforeEach(() => {
  jest.spyOn(global, 'fetch')
    .mockImplementationOnce(fetch);
});

const favoriteButtonStr = 'favorite-btn';

describe('Testa o componente Recipes', () => {
  it('Testa se a página de DoneRecipes renderiza corretamente', async () => {
    createLocalStorage('favoriteRecipes');
    setLocalStorage('favoriteRecipes', ggDrink);
    // addFavoriteRecipe(ggDrink)
    window.document.execCommand = jest.fn(() => true);
    renderWithRouterAndRedux(<App />, undefined, '/drinks/15997');
    await waitForElementToBeRemoved(() => screen.getByText(/Loading.../i));

    const shareButton = screen.getByTestId('share-btn');
    userEvent.click(shareButton);
    expect(shareButton).toBeInTheDocument();
    const linkCopiedText = screen.getByText(/link copied!/i);
    expect(linkCopiedText).toBeInTheDocument();

    const favoriteButton = screen.getByTestId(favoriteButtonStr);
    expect(favoriteButton).toBeInTheDocument();
    expect(favoriteButton).toHaveAttribute('src', blackHeartIcon);
    userEvent.click(favoriteButton);
    const favoriteButtonAfterClick = screen.getByTestId(favoriteButtonStr);
    expect(favoriteButtonAfterClick).toHaveAttribute('src', whiteHeartIcon);
    userEvent.click(favoriteButtonAfterClick);

    // ❓❓
    // const startRecipe = screen.getByTestId('start-recipe-btn');
    // userEvent.click(startRecipe);

    // expect(history.location.pathname).toBe('/drinks/15997/in-progress');
  });
  // it('Testa se a página de DoneRecipes renderiza corretamente', async () => {
  //   createLocalStorage('doneRecipes');
  //   setLocalStorage('doneRecipes', doneDrink);
  //   renderWithRouterAndRedux(<App />, undefined, '/drinks/15997');
  //   await waitForElementToBeRemoved(() => screen.getByText(/Loading.../i));

  //   const favoriteButton = screen.getByTestId(favoriteButtonStr);
  //   expect(favoriteButton).toBeInTheDocument();
  //   expect(favoriteButton).toHaveAttribute('src', blackHeartIcon);
  //   userEvent.click(favoriteButton);
  //   const favoriteButtonAfterClick = screen.getByTestId(favoriteButtonStr);
  //   expect(favoriteButtonAfterClick).toHaveAttribute('src', whiteHeartIcon);
  //   userEvent.click(favoriteButtonAfterClick);
  // });
});
