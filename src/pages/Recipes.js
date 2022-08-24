import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import requestCategoriesThunk from '../redux/actions/requestCategoriesThunk';
import requestRecipesThunk from '../redux/actions/requestRecipesThunk';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipeCard from '../components/RecipeCard';
import styles from './Recipes.module.css';
import requestFilteredCategoriesThunk from '../redux/actions/requestFilteredRecipesThunk';
import { showAllCategoriesAction } from '../redux/actions/recipeDataActions';

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

  const storedRecipeCategoryData = useSelector((state) => state
    .recipeDataReducer.recipeCategoryData);

  const handleCategoryClick = (category, type) => {
    const isCategoryTrue = !!storedRecipeCategoryData?.meals?.length
    || !!storedRecipeCategoryData?.drinks?.length;
    console.log(isCategoryTrue);
    if (isCategoryTrue) { dispatch(showAllCategoriesAction()); }
    if (!isCategoryTrue) { dispatch(requestFilteredCategoriesThunk(category, type)); }
  };

  const storedRecipeCategories = useSelector((state) => state
    .recipeDataReducer.recipeCategories);

  const renderCategoryButtons = () => {
    const categories = storedRecipeCategories.meals || storedRecipeCategories.drinks;
    const maxCategories = 5;
    const firstFiveCategories = categories.slice(0, maxCategories);
    const response = firstFiveCategories.map((categoryObj) => {
      const type = storedRecipeCategories.meals ? 'food' : 'drink';
      const { strCategory: category } = categoryObj;
      return (
        <button
          data-testid={ `${category}-category-filter` }
          key={ category }
          type="button"
          onClick={ () => handleCategoryClick(type, category) }
        >
          {category}
        </button>
      );
    });
    return response;
  };

  const handleShowAllCategories = () => {
    dispatch(showAllCategoriesAction());
  };

  const isRecipeFetchDone = !!storedRecipeData?.meals?.length
    || !!storedRecipeData?.drinks?.length;
  const isCategoryFetchDone = !!storedRecipeCategories?.meals?.length
    || !!storedRecipeCategories?.drinks?.length;
  const areAllFetchesDone = isRecipeFetchDone && isCategoryFetchDone;

  const isCategoryTrue = !!storedRecipeCategoryData?.meals?.length
  || storedRecipeCategoryData?.drinks?.length;

  return (
    <div>
      <Header />
      {
        areAllFetchesDone && (
          <div>
            <section>
              <button
                type="button"
                data-testid="All-category-filter"
                onClick={ () => handleShowAllCategories() }
              >
                All
              </button>
              { renderCategoryButtons() }
            </section>
            <main className={ styles['card-container'] }>
              {
                isCategoryTrue
                  ? renderCards(storedRecipeCategoryData)
                  : renderCards(storedRecipeData)
              }
            </main>
          </div>
        )
      }
      <Footer />
    </div>
  );
};

export default Recipes;
