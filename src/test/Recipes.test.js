import { screen } from '@testing-library/react';
import React from 'react';
import Recipes from '../pages/Recipes';
import { renderWithRouterAndRedux } from './renderWithRouterAndRedux';

// const mockedData = [
//   {
//     strDrinkThumb: 'link1',
//     strMeal: 'food1',
//   },
//   {
//     strDrinkThumb: 'link2',
//     strMeal: 'food2',
//   },
//   {
//     strDrinkThumb: 'link3',
//     strMeal: 'food3',
//   },
//   {
//     strDrinkThumb: 'link4',
//     strMeal: 'food4',
//   },
//   {
//     strDrinkThumb: 'link5',
//     strMeal: 'food5',
//   },
//   {
//     strDrinkThumb: 'link6',
//     strMeal: 'food6',
//   },
// ];

// beforeEach(() => {
//   jest.spyOn(global, 'fetch')
//     .mockImplementationOnce(() => Promise.resolve({
//       json: () => Promise.resolve(mockedData),
//     }))
//     .mockImplementationOnce(() => Promise.resolve({
//       json: () => Promise.resolve(mockedData),
//     }))
//     .mockImplementationOnce(() => Promise.resolve({
//       json: () => Promise.resolve(mockedData),
//     }))
//     .mockImplementationOnce(() => Promise.resolve({
//       json: () => Promise.resolve(mockedData),
//     }));
// });

// afterEach(() => {
//   jest.resetAllMocks();
// });

describe('Testa o componente Recipes', () => {
  it('Testa se profile icon e page title estão na tela', async () => {
    const delay = 2000;
    const { history } = renderWithRouterAndRedux(<Recipes />, undefined, '/foods');
    await new Promise((r) => setTimeout(r, delay));
    const firstCard = await screen.findByTestId('0-card-img');
    expect(firstCard).toBeInTheDocument();

    expect(history.location.pathname).toBe('/foods');
    // screen.logTestingPlaygroundURL();
  });
  // it('Testa se profile icon e page title estão na tela', async () => {
  //   renderWithRouterAndRedux(<App />, undefined, '/');
  //   const emailInput = screen.getByTestId('email-input');
  //   userEvent.type(emailInput, 'tryber@test.com');

  //   const passwordInput = screen.getByTestId('password-input');
  //   userEvent.type(passwordInput, '1234567');

  //   const loginButton = screen.getByTestId('login-submit-btn');
  //   userEvent.click(loginButton);

  //   const foodCard = await screen.findByText(/food1/i);
  //   expect(foodCard).toBeInTheDocument();
  // });
});
