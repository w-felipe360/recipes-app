import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import RecommendationCard from '../components/RecommendationCard';
import styles from '../components/Recommendations.module.css';

const copy = require('clipboard-copy');

// http://localhost:3000/drinks/11007
// http://localhost:3000/foods/52772

const RecipeDetails = (props) => {
  const { match } = props;
  const recipeId = match.params.id;

  const [food, setFood] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasure] = useState([]);
  const history = useHistory();
  const [share, setShare] = useState(false);
  const [heart, setHeart] = useState(false);
  const [recommendation, setRecommendation] = useState([]);

  const getList = (param) => {
    const max = 20;
    const ingredientsFF = [];
    const ingredientsList = [];
    for (let i = 1; i < max; i += 1) {
      const ingr = param[`strIngredient${i}`];
      if (ingr) {
        ingredientsFF.push(ingr);
      }
    }
    ingredientsFF.map((e) => (e !== '' ? (ingredientsList.push(e)) : ('')));
    setIngredients(ingredientsList);
  };

  const getMeasure = (param) => {
    const max = 20;
    const ingredientsFF = [];
    const ingredientsList = [];
    for (let i = 1; i < max; i += 1) {
      const ingr = param[`strMeasure${i}`];
      if (ingr) {
        ingredientsFF.push(ingr);
      }
    }
    ingredientsFF.map((e) => (e !== '' ? (ingredientsList.push(e)) : ('')));
    setMeasure(ingredientsList);
  };

  const getFood = async () => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`);
    const data = await response.json();
    const newData = data.meals[0];
    getList(newData);
    getMeasure(newData);
    setFood(newData);
    const responseRE = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const dataRE = await responseRE.json();
    const newDataRE = dataRE.drinks;
    const six = 6;
    setRecommendation(newDataRE.splice(0, six));
  };

  const getDrink = async () => {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${recipeId}`);
    const data = await response.json();
    const newData = data.drinks[0];
    getList(newData);
    getMeasure(newData);
    setFood(newData);
    const responseRE = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const dataRE = await responseRE.json();
    const newDataRE = dataRE.meals;
    const six = 6;
    setRecommendation(newDataRE.splice(0, six));
  };

  const getRecipeDetails = async () => {
    if (match.path.includes('food')) {
      getFood();
    } else {
      getDrink();
    }
  };

  const generateList = ingredients.map((e) => (
    <p
      key={ ingredients.indexOf(e) }
      data-testid={ `${ingredients.indexOf(e)}-ingredient-name-and-measure` }
    >
      {measure[ingredients.indexOf(e)] ? `${e} - ${measure[ingredients.indexOf(e)]}` : e}
    </p>
  ));
  const generateRecommendationsDrink = recommendation.map((e) => (
    <RecommendationCard
      key={ e.strDrink }
      data={ e }
      recipe="drink"
      testidCard={ `${recommendation.indexOf(e)}-recomendation-card` }
      testidTitle={ `${recommendation.indexOf(e)}-recomendation-title` }

    />
  ));
  const generateRecommendationsMeal = recommendation.map((e) => (
    <RecommendationCard
      key={ e.strMeal }
      data={ e }
      recipe="food"
      testidCard={ `${recommendation.indexOf(e)}-recomendation-card` }
      testidTitle={ `${recommendation.indexOf(e)}-recomendation-title` }
    />
  ));
  const heartFunction = () => (heart ? setHeart(false) : setHeart(true));

  useEffect(() => {
    getRecipeDetails();
  }, []);

  const { match: { url } } = props;

  return (
    <div>
      {
        match.path.includes('food') && food ? (
          <div>
            <img
              src={ food.strMealThumb }
              alt={ food.strMeal }
              data-testid="recipe-photo"
              width="500px"
              height="300px"
            />
            <br />
            <button
              type="button"
              data-testid="share-btn"
              src="shareIcon "
              onClick={ () => {
                copy(url);
                setShare(true);
              } }
            >
              <img src={ shareIcon } alt="share-icon" />
            </button>
            <button
              type="button"
              data-testid="favorite-btn"
              src={ heart ? `${blackHeartIcon}` : `${whiteHeartIcon}` }
              onClick={ heartFunction }
            >
              <img
                src={ heart ? blackHeartIcon : whiteHeartIcon }
                alt="heart-icon"
              />
            </button>
            {share ? (<p>Link copied!</p>) : ('')}
            <p data-testid="recipe-title">{food.strMeal}</p>
            <p data-testid="recipe-category">{food.strCategory}</p>
            <h3>Ingredients</h3>
            {generateList}
            <h3>Instructions</h3>
            <p data-testid="instructions">{food.strInstructions}</p>
            <h3>Video</h3>
            <iframe data-testid="video" width="560" height="315" src={ `https://www.youtube.com/embed/${food.strYoutube.replace('https://www.youtube.com/watch?v=', '')}` } title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
            <h3>Recommended</h3>
            <div className={ styles.recommendation }>{generateRecommendationsDrink}</div>
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
              src={ food.strDrinkThumb }
              alt={ food.strDrink }
              data-testid="recipe-photo"
              width="500px"
              height="300px"
            />
            <br />
            <button
              type="button"
              data-testid="share-btn"
              src="shareIcon"
              onClick={ () => {
                copy(url);
                setShare(true);
              } }
            >
              <img src={ shareIcon } alt="share-icon" />
            </button>
            <button
              type="button"
              data-testid="favorite-btn"
              src={ heart ? `${blackHeartIcon}` : `${whiteHeartIcon}` }
              onClick={ heartFunction }
            >
              <img
                src={ heart ? blackHeartIcon : whiteHeartIcon }
                alt="heart-icon"
              />
            </button>
            {share ? (<p>Link copied!</p>) : ('')}
            <p data-testid="recipe-title">{food.strDrink}</p>
            <p data-testid="recipe-category">{food.strAlcoholic}</p>
            <h3>Ingredients</h3>
            {generateList}
            <h3>Instructions</h3>
            <p data-testid="instructions">{food.strInstructions}</p>
            <h3>Recommended</h3>
            <div className={ styles.recommendation }>{generateRecommendationsMeal}</div>
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
    url: PropTypes.string,
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
    path: PropTypes.shape({
      includes: PropTypes.func,
    }),
  }).isRequired,
};

export default RecipeDetails;
