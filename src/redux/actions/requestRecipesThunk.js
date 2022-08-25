import { GET_FETCH_RECIPES_SUCCESS } from './actiontypes';

const FOOD_ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const DRINK_ENDPOINT = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

const onFetchSuccessAction = (payload) => ({
  type: GET_FETCH_RECIPES_SUCCESS,
  payload,
});

const requestRecipesThunk = (query) => async (dispatch) => {
  const fetchFoodOrDrink = {
    food: fetch(FOOD_ENDPOINT).then((response) => response.json()),
    drink: fetch(DRINK_ENDPOINT).then((response) => response.json()),
  };
  const fetchData = await fetchFoodOrDrink[query];
  console.log(fetchData);
  dispatch(onFetchSuccessAction(fetchData));
};

export default requestRecipesThunk;
