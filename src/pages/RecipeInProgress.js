import React, { useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import { addRecipeInProgressToStorage, addToLocalStorage,
  createLocalStorage, getLocalStorage,
  removeFavoriteRecipe } from '../helpers/localStorage';
import styles from '../components/ProgressList.module.css';
import Input from '../components/Input';

const RecipeInProgress = () => {
  const { url, params: { id } } = useRouteMatch();
  const { push } = useHistory();

  const [recipeData, setRecipeData] = useState([]);
  const [recommendationData, setRecommendationData] = useState([]);

  const [isCopied, setIsCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const ingredients = Object.keys(recipeData)
    .filter((ingredientItem) => ingredientItem.includes('strIngredient')
  && recipeData[ingredientItem]);
  const measures = Object.keys(recipeData)
    .filter((measureItem) => measureItem.includes('strMeasure'));

  const [isIngredientChecked, setIsIngredientChecked] = useState({});

  const { strMeal, strDrink, strMealThumb, strDrinkThumb, strCategory: category,
    strInstructions: instructions, strYoutube: youtubeUrl, strAlcoholic,
    strArea } = recipeData;

  const isMeal = url.includes('food');
  const name = strMeal || strDrink;
  const image = strMealThumb || strDrinkThumb;
  const type = url.includes('food') ? 'food' : 'drink';
  const subcategory = isMeal ? category : strAlcoholic;
  const alcoholicOrNot = strAlcoholic || '';
  const nationality = strArea || '';

  useEffect(() => {
    createLocalStorage('inProgressRecipes', { meals: {}, cocktails: {} });
    const data = getLocalStorage('inProgressRecipes');
    console.log(data);
    const { [id]: item, ...rest } = isMeal ? data.meals : data.cocktails;
    console.log(rest);
    // log pro linter não reclamar do rest não sendo usado

    if (!item) {
      const ingredientsInitialState = ingredients
        .reduce((acc, cv) => ({ ...acc, [cv]: !cv }), {});
      return setIsIngredientChecked(ingredientsInitialState);
    }
    setIsIngredientChecked(item);
  }, [recipeData]);

  useEffect(() => {
    const fetchRecipeData = async () => {
      const foodEndpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const drinkEndpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      const endpoint = isMeal ? foodEndpoint : drinkEndpoint;
      const fetchData = await fetch(endpoint);
      const response = await fetchData.json();
      const object = response?.meals || response?.drinks;

      setRecipeData(object[0]);
    };
    fetchRecipeData();
  }, []);

  useEffect(() => {
    const fetchRecommendationData = async () => {
      const foodEndpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const drinkEndpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const endpoint = isMeal ? foodEndpoint : drinkEndpoint;
      const fetchData = await fetch(endpoint);
      const response = await fetchData.json();
      const flattenedResponse = response?.meals || response?.drinks;
      const maxRecipes = 6;
      const filteredResponse = flattenedResponse.slice(0, maxRecipes);
      setRecommendationData(filteredResponse);
    };
    fetchRecommendationData();
  }, []);

  useEffect(() => {
    const isFavoriteOnLoad = () => {
      createLocalStorage('favoriteRecipes');
      const localStorageData = getLocalStorage('favoriteRecipes');
      const isAlreadyFavorite = localStorageData.some((item) => item.id === id);
      if (isAlreadyFavorite) { setIsFavorite(true); }
    };
    isFavoriteOnLoad();
  }, []);

  const onIngredientClick = (controlledState) => {
    setIsIngredientChecked(controlledState);
    const payload = { [id]: controlledState };
    addRecipeInProgressToStorage('inProgressRecipes', payload, isMeal);
  };

  const renderIngredients = () => {
    const ingredientsArray = ingredients
      .map((ingredient, index) => {
        const ingredientStr = recipeData[ingredient];
        const measureStr = recipeData[measures[index]];
        const isChecked = isIngredientChecked[ingredient];
        const controlledState = {
          ...isIngredientChecked,
          [ingredient]: !isChecked,
        };
        return (
          <li
            key={ ingredient }
            data-testid={ `${index}-ingredient-step` }
          >
            <Input
              // className={ styles.checkbox }
              key={ ingredientStr }
              name={ ingredientStr }
              checked={ isChecked }
              type="checkbox"
              onChange={ () => onIngredientClick(controlledState) }
            >
              <span
                className={ isChecked ? styles.strikethrough : null }
              >
                {`${ingredientStr} - ${measureStr}`}
              </span>
            </Input>
          </li>
        );
      });
    return <ul>{ingredientsArray}</ul>;
  };

  const onShareClick = () => {
    const copyContent = `${window.origin}${url}`.replace('/in-progress', '');
    clipboardCopy(copyContent);
    setIsCopied(true);
  };

  const onFavoriteClick = () => {
    const payload = { alcoholicOrNot, category, id, image, name, nationality, type };
    if (!isFavorite) {
      addToLocalStorage('favoriteRecipes', payload);
      setIsFavorite(true);
    }
    if (isFavorite) {
      removeFavoriteRecipe(id);
      setIsFavorite(false);
    }
  };

  const isButtonDisabled = () => !Object
    .values(isIngredientChecked)
    .every((ingredientCheckedState) => ingredientCheckedState);

  const onFinishRecipe = () => {
    push('/done-recipes');
  };

  const isFetching = !recipeData || !recommendationData.length;

  if (isFetching) {
    return <span>Loading...</span>;
  }
  return (
    <main>
      <img
        src={ image }
        alt={ `${name} recipe` }
        data-testid="recipe-photo"
      />
      <button
        type="button"
        data-testid="share-btn"
        src={ shareIcon }
        onClick={ () => onShareClick() }
      >
        <img src={ shareIcon } alt="share-icon" />
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
        src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
        onClick={ () => onFavoriteClick() }
      >
        <img src={ isFavorite ? blackHeartIcon : whiteHeartIcon } alt="share-icon" />
      </button>
      { isCopied && <span>Link copied!</span> }
      <p data-testid="recipe-title">{name}</p>
      <p data-testid="recipe-category">{`${subcategory}`}</p>
      <h3>Ingredients</h3>
      { renderIngredients() }
      <h3>Instructions</h3>
      <p data-testid="instructions">{instructions}</p>
      { isMeal && (
        <>
          <h3>Video</h3>
          <iframe
            data-testid="video"
            width="560"
            height="315"
            src={ `https://www.youtube.com/embed/${youtubeUrl}` }
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;
            picture-in-picture"
            allowFullScreen
          />
        </>
      ) }
      <h3> Recomendations </h3>
      <button
        className={ styles['start-button'] }
        type="button"
        data-testid="finish-recipe-btn"
        onClick={ () => onFinishRecipe() }
        disabled={ isButtonDisabled() }
      >
        Finish Recipe
      </button>
    </main>
  );
};

export default RecipeInProgress;
