import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './renderWithRouterAndRedux';
import App from '../App';

describe('Testa o componente <Header.js />', () => {
  it('Testa se profile icon e page title estão na tela', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/foods');
    const profile = screen.getByTestId('profile-top-btn');
    expect(screen.getByTestId('profile-top-btn')).toBeInTheDocument();
    expect(screen.getByTestId('page-title')).toBeInTheDocument();
    userEvent.click(profile);
    history.push('/profile');
    expect(history.location.pathname).toBe('/profile');
  });
});
