import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

// http://localhost:3000/drinks/11007
// http://localhost:3000/foods/52772

const RecipeDetails = (props) => {
  const { match } = props;
  // console.log('RecipeDetails');
  // console.log(props);
  const recipeId = match.params.id;
  // console.log(recipeId);

  const [food, setFood] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const history = useHistory();

  const getList = (param) => {
    const max = 20;
    const ingredientsFF = [];
    const ingredientsList = [];
    for (let i = 1; i < max; i += 1) {
      const ingr = param[`strIngredient${i}`];
      // ingr ? (ingredientsFF.push(ingr)) : (null);
      if (ingr) {
        ingredientsFF.push(ingr);
      }
    }
    ingredientsFF.map((e) => (e !== '' ? (ingredientsList.push(e)) : ('')));
    setIngredients(ingredientsList);
  };

  const getFood = async () => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`);
    const data = await response.json();
    const newData = data.meals[0];
    getList(newData);
    setFood(newData);
  };

  const getDrink = async () => {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${recipeId}`);
    const data = await response.json();
    const newData = data.drinks[0];
    getList(newData);
    setFood(newData);
  };

  const getRecipeDetails = async () => {
    if (match.path.includes('food')) {
      getFood();
    } else {
      getDrink();
    }
  };

  let index = 0;

  const generateList = ingredients.map((e) => {
    index += 1;
    return (
      <p
        key={ index }
        data-testid={ `${index}-ingredient-name-and-measure` }
      >
        {e}
      </p>
    );
  });

  useEffect(() => {
    // console.log('useEffect');
    getRecipeDetails();
  }, []);

  return (
    <div>
      <p>recipeId</p>
      {
        match.path.includes('food') ? (
          <div>
            <img src={ food.MealThumb } alt={ food.strMeal } data-testid="recipe-photo" />
            <button type="button" data-testid="share-btn">Share Recipe</button>
            <button type="button" data-testid="favorite-btn">Favorite Recipe</button>
            <p data-testid="recipe-title">{food.strMeal}</p>
            <p data-testid="recipe-category">{food.strCategory}</p>
            <h3>Ingredients</h3>
            {
              generateList
            }
            <h3>Instructions</h3>
            {/* data-testid="${index}-ingredient-name-and-measure" */}
            <p data-testid="instructions">{food.strInstructions}</p>
            <h3>Video</h3>
            <video data-testid="video" src={ food.strYoutube }>
              <track kind="captions" />
              {/* O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          . */}
            </video>
            <h3>Recommended</h3>
            {/* data-testid="${index}-recomendation-card" */}
            <button
              type="button"
              data-testid="start-recipe-btn"
              onClick={
                () => history.push(`/foods/${recipeId}/in-progress`)
              }
            >
              Start Recipe

            </button>
          </div>
        ) : (
          <div>
            <img
              src={ food.DrinkThumb }
              alt={ food.strDrink }
              data-testid="recipe-photo"
            />
            <button type="button" data-testid="share-btn">Share Recipe</button>
            <button type="button" data-testid="favorite-btn">Favorite Recipe</button>
            <p data-testid="recipe-title">{food.strDrink}</p>
            <p data-testid="recipe-category">{food.strAlcoholic}</p>
            <h3>Ingredients</h3>
            {
              generateList
            }
            <h3>Instructions</h3>
            {/* data-testid="${index}-ingredient-name-and-measure" */}
            <p data-testid="instructions">{food.strInstructions}</p>
            <h3>Recommended</h3>
            {/* data-testid="${index}-recomendation-card" */}
            <button
              type="button"
              data-testid="start-recipe-btn"
              onClick={
                () => history.push(`/drinks/${recipeId}/in-progress`)
              }
            >
              Start Recipe

            </button>
          </div>
        )
      }
    </div>
  );
};

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
    path: PropTypes.shape({
      includes: PropTypes.func,
    }),
  }).isRequired,
};

export default RecipeDetails;
