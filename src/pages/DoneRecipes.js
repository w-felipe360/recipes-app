import React, { useEffect, useState } from 'react';
import DoneRecipeCard from '../components/DoneRecipeCard';
import { createLocalStorage, getLocalStorage,
  setLocalStorage } from '../helpers/localStorage';

const mockedData = [
  {
    id: '52771',
    type: 'food',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '23/06/2020',
    tags: ['Pasta', 'Curry'],
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: [],
  },
];

const DoneRecipes = () => {
  const [noFilter, setNoFilter] = useState([]);
  const [foodFilter, setFoodFilter] = useState([]);
  const [drinkFilter, setDrinkFilter] = useState([]);
  const [whichFilterToApply, setWhichFilterToApply] = useState('noFilter');
  console.log(global);
  useEffect(() => {
    const getDataOnMount = () => {
      createLocalStorage('doneRecipes');
      setLocalStorage('doneRecipes', mockedData);
      return getLocalStorage('doneRecipes');
    };
    const data = getDataOnMount();
    setNoFilter(data);
  }, []);

  const handleNoFilter = () => {
    setFoodFilter(noFilter);
    setWhichFilterToApply('noFilter');
  };

  const handleFoodFilter = () => {
    const filteredByFood = mockedData.filter(({ type }) => type === 'food');
    setFoodFilter(filteredByFood);
    setWhichFilterToApply('food');
  };

  const handleDrinkFilter = () => {
    const filteredByDrink = mockedData.filter(({ type }) => type === 'drink');
    setDrinkFilter(filteredByDrink);
    setWhichFilterToApply('drink');
  };

  const dataToRender = {
    noFilter,
    food: foodFilter,
    drink: drinkFilter,
  };

  const renderDoneRecipeCards = () => (
    dataToRender[whichFilterToApply].map((recipeData, index) => (
      <DoneRecipeCard
        data={ recipeData }
        key={ recipeData.id }
        index={ index }
      />
    )));

  return (
    <div>
      <fieldset>
        <legend>Filtros</legend>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => handleNoFilter() }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => handleFoodFilter() }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => handleDrinkFilter() }
        >
          Drink
        </button>
      </fieldset>
      <main>
        { renderDoneRecipeCards() }
      </main>
    </div>
  );
};

export default DoneRecipes;
