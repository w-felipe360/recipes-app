import { GET_FETCH_SEARCH_FILTER_SUCCESS } from './actiontypes';

const onSearchFilterSuccess = (payload) => ({
  type: GET_FETCH_SEARCH_FILTER_SUCCESS,
  payload,
});

const requestSearchFilterThunk = (
  radioValue, searchValue, pathname,
) => async (dispatch) => {
  const endpointUrlBody = pathname === '/foods'
    ? 'https://www.themealdb.com/api/json/v1/1/'
    : 'https://www.thecocktaildb.com/api/json/v1/1/';

  const urlQuery = radioValue === 'ingredient' ? 'filter' : 'search';

  const ingredientEndpoint = `${endpointUrlBody}${urlQuery}.php?i=${searchValue}`;
  const nameEndpoint = `${endpointUrlBody}${urlQuery}.php?s=${searchValue}`;
  const firstLetterEndpoint = `${endpointUrlBody}${urlQuery}.php?f=${searchValue}`;

  const endpoints = {
    ingredient: ingredientEndpoint,
    name: nameEndpoint,
    'first-letter': firstLetterEndpoint,
  };

  const endpoint = endpoints[radioValue];

  const response = await fetch(endpoint);
  const data = await response.json();
  const isDataNull = data.meals || data.drinks;
  console.log(isDataNull);

  if (!isDataNull) {
    return global.alert('Sorry, we haven\'t found any recipes for these filters.');
  }

  dispatch(onSearchFilterSuccess(data));
};

export default requestSearchFilterThunk;
