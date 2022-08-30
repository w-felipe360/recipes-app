import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import { getLists, heartFunction, youVideo } from '../helpers/recipesFunctions';
import RecommendationCard from '../components/RecommendationCard';
import styles from '../components/Recommendations.module.css';

// http://localhost:3000/drinks/11007
// http://localhost:3000/foods/52772

const RecipeDetails = (props) => {
  const { url } = useRouteMatch();
  const { match } = props;
  const recipeId = match.params.id;
  const [food, setFood] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasure] = useState([]);
  const history = useHistory();
  const [share, setShare] = useState(false);
  const [heart, setHeart] = useState(false);
  const [check, setCheck] = useState([]);
  const [finalizada, setFinalizada] = useState([]);
  const [recommendation, setRecommendation] = useState([]);

  const onShareClick = () => {
    clipboardCopy(`${window.origin}${url}`);
    setShare(true);
  };

  const getFood = async (endpoint, getlists, setfood, type) => {
    if (type === 'meals') {
      const response = await fetch(endpoint);
      const data = await response.json();
      getlists(data[type][0], 'strIngredient', setIngredients);
      getlists(data[type][0], 'strMeasure', setMeasure);
      setfood(data[type][0]);
      const responseRE = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const dataRE = await responseRE.json();
      const newDataRE = dataRE.drinks;
      const six = 6;
      setRecommendation(newDataRE.slice(0, six));
    } else {
      const response = await fetch(endpoint);
      const data = await response.json();
      getlists(data[type][0], 'strIngredient', setIngredients);
      getlists(data[type][0], 'strMeasure', setMeasure);
      setfood(data[type][0]);
      const responseRE = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const dataRE = await responseRE.json();
      const newDataRE = dataRE.meals;
      const six = 6;
      setRecommendation(newDataRE.slice(0, six));
    }
  };

  const mealsEnd = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`;
  const drinkEnd = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${recipeId}`;

  const getRecipeDet = () => (match.path.includes('food') ? (
    getFood(mealsEnd, getLists, setFood, 'meals')) : (
    getFood(drinkEnd, getLists, setFood, 'drinks')));

  const funcFinishRecipee = () => {
    history.push(`/${food.strMeal ? 'foods' : 'drinks'}/${recipeId}/in-progress`);
  };

  const generateList = ingredients.map((e) => (
    <p
      data-testid={ `${ingredients.indexOf(e)}-ingredient-name-and-measure` }
      id={ `${ingredients.indexOf(e)}-ingredient-step` }
      key={ e }
    >
      {measure[ingredients.indexOf(e)] ? `${e} - ${measure[ingredients.indexOf(e)]}`
        : e}
    </p>
  ));

  useEffect(() => {
    getRecipeDet();
    if (JSON.parse(localStorage.getItem('inProgressRecipes')) !== null) {
      setCheck(JSON.parse(localStorage.getItem('inProgressRecipes')));
    }
    if (JSON.parse(localStorage.getItem('doneRecipes')) !== null) {
      const vv = [];
      JSON.parse(localStorage.getItem('doneRecipes')).forEach((e) => vv.push(e.id));
      setFinalizada(vv);
    }
    if (JSON.parse(localStorage.getItem('favoriteRecipes')) !== null) {
      const aa = [];
      JSON.parse(localStorage.getItem('favoriteRecipes')).map((e) => aa.push(e.id));
      if (aa.includes(recipeId)) {
        setHeart(true);
      }
    }
  }, []);

  const btnStart = (
    <button
      type="submit"
      data-testid="start-recipe-btn"
      onClick={ funcFinishRecipee }
      className={ styles.container }
    >
      {check !== [] && !!check
        .find((e) => e.includes(recipeId)) ? 'Continue Recipe' : 'Start Recipe'}
    </button>
  );

  const btnShare = (
    <button
      type="button"
      data-testid="share-btn"
      src={ shareIcon }
      onClick={ () => onShareClick() }
    >
      <img src={ shareIcon } alt="share-icon" />
    </button>
  );

  const thumb = (param1, param2) => (
    <img
      src={ food[param1] }
      alt={ food[param2] }
      data-testid="recipe-photo"
      width="500px"
      height="300px"
    />
  );

  const btnFavorite = (param) => (
    <button
      type="button"
      data-testid="favorite-btn"
      src={ heart ? blackHeartIcon : whiteHeartIcon }
      onClick={ () => heartFunction(param, recipeId, food, setHeart) }
    >
      <img
        src={ heart ? blackHeartIcon : whiteHeartIcon }
        alt="heart-icon"
      />
    </button>
  );

  const generateRecommendations = (param) => {
    if (param === 'drink') {
      return recommendation.map((e) => (
        <RecommendationCard
          key={ e.strMeal }
          data={ e }
          recipe="food"
          testidCard={ `${recommendation.indexOf(e)}-recomendation-card` }
          testidTitle={ `${recommendation.indexOf(e)}-recomendation-title` }
        />
      ));
    }
    return recommendation.map((e) => (
      <RecommendationCard
        key={ e.strDrink }
        data={ e }
        recipe="drink"
        testidCard={ `${recommendation.indexOf(e)}-recomendation-card` }
        testidTitle={ `${recommendation.indexOf(e)}-recomendation-title` }
      />
    ));
  };

  return (
    <div>
      {
        match.path.includes('food') && food ? (
          <div>
            {thumb('strMealThumb', 'strMeal')}
            <br />
            {btnShare}
            {btnFavorite('food')}
            {share ? (<p>Link copied!</p>) : ('')}
            <p data-testid="recipe-title">{food.strMeal}</p>
            <p data-testid="recipe-category">{food.strCategory}</p>
            <h3>Ingredients</h3>
            {generateList}
            <h3>Instructions</h3>
            <p data-testid="instructions">{food.strInstructions}</p>
            <h3>Video</h3>
            {youVideo(food)}
            <h3>Recommended</h3>
            <div className={ styles.recommendation }>
              {generateRecommendations('food')}
            </div>
            {!finalizada.includes(recipeId) && btnStart}
          </div>
        ) : (match.path.includes('drink') && food && (
          <div>
            {thumb('strDrinkThumb', 'strDrink')}
            <br />
            {btnShare}
            {btnFavorite('drink')}
            {share ? (<p>Link copied!</p>) : ('')}
            <p data-testid="recipe-title">{food.strDrink}</p>
            <p data-testid="recipe-category">{food.strAlcoholic}</p>
            <h3>Ingredients</h3>
            {generateList}
            <h3>Instructions</h3>
            <p data-testid="instructions">{food.strInstructions}</p>
            <h3>Recommended</h3>
            <div className={ styles.recommendation }>
              {generateRecommendations('drink')}
            </div>
            {!finalizada.includes(recipeId) && btnStart}
          </div>
        )
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
