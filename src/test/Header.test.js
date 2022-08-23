import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import Header from '../components/Header';

describe('Testa o componente <Header.js />', () => {
  it('Testa se profile icon e page title estão na tela', () => {
    const route = '/profile';

    render(
      <MemoryRouter initialEntries={ [route] }>
        <Header />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('profile-top-btn')).toBeInTheDocument();
    expect(screen.getByTestId('page-title')).toBeInTheDocument();
  });
});
