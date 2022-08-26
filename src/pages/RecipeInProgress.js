import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
// import { fchmod } from 'fs-extra';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import styles from '../components/ProgressList.module.css';

const copy = require('clipboard-copy');

// http://localhost:3000/drinks/11007/in-progress
// http://localhost:3000/foods/52772/in-progress

const RecipeInProgress = (props) => {
  const { match } = props;
  const recipeId = match.params.id;

  const [food, setFood] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasure] = useState([]);
  const history = useHistory();
  // const copy = require('clipboard-copy');
  const [share, setShare] = useState(false);
  const [heart, setHeart] = useState(false);
  // const [storage, setStorage] = useState([]);
  // const [check, setCheck] = useState([]);
  const [disable, setDisable] = useState(true);
  const [check, setCheck] = useState([]);
  const [finalizada, setFinalizada] = useState([]);
  const [favoritadas, setFavoritadas] = useState([]);

  // const generateCheck = () => {
  //   const hh = [];
  //   for (let i = 0; i < ingredients.length; i += 1) {
  //     hh.push(false);
  //   }
  //   setCheck(hh);
  // };

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
  };

  const getDrink = async () => {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${recipeId}`);
    const data = await response.json();
    const newData = data.drinks[0];
    getList(newData);
    getMeasure(newData);
    setFood(newData);
  };

  const getRecipeDetails = async () => {
    if (match.path.includes('food')) {
      getFood();
    } else {
      getDrink();
    }
  };

  // const teste = (par1, par2) => {
  //   // const ff = check;
  //   const ff = Object.assign({}, check)
  //   if (par1) {
  //     ff[par2] = par1;
  //   }
  //   return setCheck(ff);
  // };

  const funcFinishRecipe = () => {
    const fazendo = JSON.parse(localStorage.getItem('doneRecipes'));
    if (fazendo !== null && !fazendo.includes(recipeId)) {
      fazendo.push(recipeId);
      localStorage.setItem('doneRecipes', JSON.stringify(fazendo));
    } else if (fazendo === null) {
      const dd = [recipeId];
      localStorage.setItem('doneRecipes', JSON.stringify(dd));
    }
    history.push('/done-recipes');
  };

  const disableButton = () => {
    const conf = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const ll = conf.filter((e) => e.includes(recipeId));
    console.log(ll);
    setDisable(ll.length !== ingredients.length);
  };

  const lineText = async (param, param2) => {
    if (check.includes(`${recipeId}-${param2}`)) {
      console.log('Já tava');
      const yy = check.filter((e) => e !== `${recipeId}-${param2}`);
      setCheck(yy);
      localStorage.setItem('inProgressRecipes', JSON.stringify(yy));
    } else {
      // const tt = document.getElementById(param);
    // const none = 'ProgressList_none__u9CME';
    // const line = 'ProgressList_line__xgibF';
    // const hh = tt.className === none ? tt.className = line : tt.className = none;
      // const jj = [...check, param2];
      const pp = [...check, `${recipeId}-${param2}`];
      setCheck(pp);
      localStorage.setItem('inProgressRecipes', JSON.stringify(pp));
    // return hh;
    }
    disableButton();
  };

  const generateList = ingredients.map((e) => (
    <div key={ ingredients.indexOf(e) }>
      <label
        htmlFor={ `${ingredients.indexOf(e)}-checkbox` }
        className={ styles.container }
      >
        <p
          data-testid={ `${ingredients.indexOf(e)}-ingredient-step` }
          id={ `${ingredients.indexOf(e)}-ingredient-step` }
          // className="ProgressList_none__u9CME"
          className={ check.includes(`${recipeId}-${ingredients.indexOf(e)}-checkbox`) ? 'ProgressList_line__xgibF' : 'ProgressList_none__u9CME' }
        >
          <input
            type="checkbox"
            onClick={ () => lineText(`${ingredients.indexOf(e)}-ingredient-step`, `${ingredients.indexOf(e)}-checkbox`) }
            id={ `${ingredients.indexOf(e)}-checkbox` }
            checked={ check.includes(`${recipeId}-${ingredients.indexOf(e)}-checkbox`) }
            className={ styles.input }
          />
          {measure[ingredients.indexOf(e)] ? `${e} - ${measure[ingredients.indexOf(e)]}`
            : e}
        </p>
      </label>
    </div>
  ));

  const heartFunction = (param = 'food') => {
    const fv = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const zz = [{ id: recipeId, type: param, nationality: food.strArea, category: food.strCategory, alcoholicOrNot: food.strAlcoholic, name: food.strMeal, image: food.strMealThumb }];
    if (fv === null) {
      localStorage.setItem('favoriteRecipes', JSON.stringify(zz));
      setHeart(true);
    } else if (fv !== null) {
      const aa = [];
      fv.map((e) => aa.push(e.id));
      if (aa.includes(recipeId)) {
        const lm = fv.filter((e) => e.id !== recipeId);
        localStorage.setItem('favoriteRecipes', JSON.stringify(lm));
        setHeart(false);
      } else if (!aa.includes(recipeId)) {
        fv.push(zz[0]);
        localStorage.setItem('favoriteRecipes', JSON.stringify(fv));
        setHeart(true);
      }
    }
  };

  // useEffect(() => {
  //   console.log('mudou');
  // }, [heart]);

  useEffect(() => {
    getRecipeDetails();
    const local = JSON.parse(localStorage.getItem('inProgressRecipes'));
    // console.log(local);
    if (local !== null) {
      setCheck(local);
    }
    const bb = JSON.parse(localStorage.getItem('doneRecipes'));
    if (bb !== null) {
      setFinalizada(bb);
    }
    const fv = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (fv !== null) {
      setFavoritadas(fv);
      const aa = [];
      fv.map((e) => aa.push(e.id));
      if (aa.includes(recipeId)) {
        setHeart(true);
      }
    }
  }, []);

  const { match: { url } } = props;

  const btn = (
    <button
      type="submit"
      data-testid="finish-recipe-btn"
      onClick={ funcFinishRecipe }
      // disabled={ check.length !== ingredients.length }
      disabled={ disable }
    >
      Finish Recipe
    </button>
  );

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
              src={ shareIcon }
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
              src={ heart ? blackHeartIcon : whiteHeartIcon }
              onClick={ () => heartFunction('food') }
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
            {!finalizada.includes(recipeId) && btn}
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
              src={ shareIcon }
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
              src={ heart ? blackHeartIcon : whiteHeartIcon }
              onClick={ () => heartFunction('drink') }
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
            {!finalizada.includes(recipeId) && btn}
          </div>
        )
      }
    </div>
  );
};

RecipeInProgress.propTypes = {
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

export default RecipeInProgress;
