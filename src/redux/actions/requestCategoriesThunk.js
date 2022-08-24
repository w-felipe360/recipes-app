import { GET_FETCH_CATEGORIES_SUCCESS } from './actiontypes';

const FOOD_ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const DRINK_ENDPOINT = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

const onFetchCategoriesSuccessAction = (payload) => ({
  type: GET_FETCH_CATEGORIES_SUCCESS,
  payload,
});

const requestCategoriesThunk = (query) => async (dispatch) => {
  const endpoint = query === 'food' ? FOOD_ENDPOINT : DRINK_ENDPOINT;

  const response = await fetch(endpoint);
  const fetchData = await response.json();
  dispatch(onFetchCategoriesSuccessAction(fetchData));
};

export default requestCategoriesThunk;
