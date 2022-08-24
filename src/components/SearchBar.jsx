import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import requestFilteredCategoriesThunk from '../redux/actions/requestFilteredRecipesThunk';

const SearchBar = () => {
  const [search, setSearch] = useState('');
  const handleChange = ({ target: { value } }) => {
    setSearch(value);
  };

  const [radioSelected, setRadioSelected] = useState('name');
  const handleRadio = ({ target: { value } }) => {
    setRadioSelected(value);
  };
  const getFood = async () => {
    let response = '';
    let data = '';
    let newData = '';
    if (radioSelected === 'ingredient') {
      response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${search}`);
      data = await response.json();
      newData = data.meals;
      console.log(newData);
    }
    if (radioSelected === 'name') {
      response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
      data = await response.json();
      newData = data.meals;
      console.log(newData);
    }
    if (radioSelected === 'first-letter') {
      response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${search}`);
      data = await response.json();
      newData = data.meals;
      console.log(newData);
    }
    // if(radioSelected === '')
  };

  const handleClick = () => {
    if (radioSelected === 'first-letter' && search.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
    return getFood();
    // console.log('input:', search, 'radio:', radioSelected);
  };

  return (
    <div className="searchBar">
      <input
        data-testid="search-input"
        value={ search }
        name="inputName"
        onChange={ handleChange }
        type="text"
      />
      <div className="radiosSearchBar">

        <label htmlFor="ingredient">
          <input
            name="test"
            value="ingredient"
            type="radio"
            id="ingredient"
            data-testid="ingredient-search-radio"
            onChange={ handleRadio }
          />
          ingredient
        </label>

        <label htmlFor="name">
          <input
            value="name"
            name="test"
            type="radio"
            id="name"
            data-testid="name-search-radio"
            onChange={ handleRadio }
          />
          Name
        </label>

        <label htmlFor="firstLetter">
          <input
            value="first-letter"
            name="test"
            type="radio"
            id="firstLetter"
            data-testid="first-letter-search-radio"
            onChange={ handleRadio }
          />
          First letter
        </label>
      </div>
      <div>
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ handleClick }
        >
          Procurar
        </button>
      </div>
    </div>
  );
};
export default SearchBar;
