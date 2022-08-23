import { GET_FETCH_CATEGORIES_SUCCESS } from './actiontypes';

const FOOD_ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const DRINK_ENDPOINT = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

const onFetchCategoriesSuccessAction = (payload) => ({
  type: GET_FETCH_CATEGORIES_SUCCESS,
  payload,
});

const requestCategoriesThunk = (query) => async (dispatch) => {
  const fetchFoodOrDrinkCategories = {
    food: fetch(FOOD_ENDPOINT).then((response) => response.json()),
    drink: fetch(DRINK_ENDPOINT).then((response) => response.json()),
  };
  const fetchData = await fetchFoodOrDrinkCategories[query];
  dispatch(onFetchCategoriesSuccessAction(fetchData));
};

export default requestCategoriesThunk;
