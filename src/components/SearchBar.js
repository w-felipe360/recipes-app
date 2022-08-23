import React, { useState } from 'react';

const SearchBar = () => {
  const [search, setSearch] = useState();

  const handleChange = ({ target: { value, name } }) => {
    setSearch({ ...search, [name]: value });
  };

  return (
    <div className="searchBar">
      <div className="radiosSearchBar">

        <label htmlFor="ingredient">
          <input
            type="radio"
            id="ingredient"
            data-testid="ingredient-search-radio"
            onChange={ handleChange }
          />
          Ingrediente
        </label>

        <label htmlFor="name">
          <input
            type="radio"
            id="name"
            data-testid="name-search-radio"
            onChange={ handleChange }
          />
          Nome
        </label>

        <label htmlFor="firstLetter">
          <input
            type="radio"
            id="firstLetter"
            data-testid="first-letter-search-radio"
            onChange={ handleChange }
          />
          Primeira Letra
        </label>
      </div>
      <div>
        <button
          type="button"
          data-testid="exec-search-btn"
        >
          Procurar
        </button>
      </div>
    </div>
  );
};
export default SearchBar;
