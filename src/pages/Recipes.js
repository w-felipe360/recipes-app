import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import requestRecipesThunk from '../redux/actions/getRecipeListThunk';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipeCard from '../components/RecipeCard';
import styles from './Recipes.module.css';

const Recipes = () => {
  const { location: { pathname } } = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    const rest = -1;
    const query = pathname.slice(1, rest);
    dispatch(requestRecipesThunk(query));
  }, []);

  const storedRecipeData = useSelector((state) => state.recipeDataReducer.recipeData);

  const renderCards = (recipeDataArray) => {
    const renderData = recipeDataArray.meals ?? recipeDataArray.drinks;
    const numberOfRecipes = 12;
    return renderData.slice(0, numberOfRecipes)
      .map(({ strMealThumb, strDrinkThumb, strMeal, strDrink }, index) => {
        const data = {
          thumbnail: strMealThumb ?? strDrinkThumb,
          recipeName: strMeal ?? strDrink,
          index,
        };
        return <RecipeCard recipeData={ data } key={ data.index } />;
      });
  };

  const isFetchDone = !!storedRecipeData?.meals?.length
    || !!storedRecipeData?.drinks?.length;

  return (
    <div>
      <Header />
      <main className={ styles['card-container'] }>
        { isFetchDone && renderCards(storedRecipeData) }
      </main>
      <Footer />
    </div>
  );
};

export default Recipes;
