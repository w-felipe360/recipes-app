import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import requestCategoriesThunk from '../redux/actions/requestCategoriesThunk';
import requestRecipesThunk from '../redux/actions/requestRecipesThunk';
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
    dispatch(requestCategoriesThunk(query));
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

  const storedRecipeCategories = useSelector((state) => state
    .recipeDataReducer.recipeCategories);

  const renderCategoryButtons = () => {
    const categories = storedRecipeCategories.meals || storedRecipeCategories.drinks;
    const maxCategories = 5;
    const firstFiveCategories = categories.slice(0, maxCategories);
    return firstFiveCategories.map(({ strCategory: category }) => (
      <button
        data-testid={ `${category}-category-filter` }
        key={ category }
        type="button"
      >
        {category}
      </button>
    ));
  };

  const isRecipeFetchDone = !!storedRecipeData?.meals?.length
    || !!storedRecipeData?.drinks?.length;
  const isCategoryFetchDone = !!storedRecipeCategories?.meals?.length
    || !!storedRecipeCategories?.drinks?.length;
  const areAllFetchesDone = isRecipeFetchDone && isCategoryFetchDone;

  return (
    <div>
      <Header />
      {
        areAllFetchesDone && (
          <div>
            <section>
              { renderCategoryButtons() }
            </section>
            <main className={ styles['card-container'] }>
              { renderCards(storedRecipeData) }
            </main>
          </div>
        )
      }
      <Footer />
    </div>
  );
};

export default Recipes;
