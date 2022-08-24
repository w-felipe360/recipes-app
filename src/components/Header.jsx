import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import capitalizeFirstLetter from '../helpers/capitalizeFirstLetter';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

// const ICONLESS_PATHNAME = ['/profile', '/done-recipes', '/favorite-recipes'];

const Header = () => {
  const { location: { pathname } } = useHistory();
  // const hasIcon = () => !ICONLESS_PATHNAME.some((path) => path === pathname);
  const initialState = -1;
  const [click, setClick] = useState(initialState);

  return (
    <div>
      <button type="button">
        <Link to="/profile">
          <img
            src={ profileIcon }
            alt="profile-icon"
            data-testid="profile-top-btn"
          />
        </Link>
      </button>

      <h2 data-testid="page-title">{ capitalizeFirstLetter(pathname) }</h2>

      <button
        type="button"
        // data-testid="search-input"
        onClick={ () => setClick(click + 1) }
      >
        <img
          src={ searchIcon }
          alt="profile-icon"
          data-testid="search-top-btn"
        />
      </button>

      {
        click % 2 === 0 ? <SearchBar /> : null
      }
    </div>
  );
};

export default Header;
