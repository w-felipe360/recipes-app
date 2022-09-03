import { GET_FETCH_FILTERED_RECIPES_SUCCESS } from './actiontypes';

const onFetchFilteredRecipeSuccess = (payload) => ({
  type: GET_FETCH_FILTERED_RECIPES_SUCCESS,
  payload,
});

const requestFilteredCategoriesThunk = (type, category) => async (dispatch) => {
  const foodEndpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
  const drinkEndpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;

  const endpoint = type === 'food' ? foodEndpoint : drinkEndpoint;

  const response = await fetch(endpoint);
  const data = await response.json();
  dispatch(onFetchFilteredRecipeSuccess(data));
};

export default requestFilteredCategoriesThunk;
