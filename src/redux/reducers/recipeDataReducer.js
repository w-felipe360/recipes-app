import { GET_FETCH_RECIPES_SUCCESS,
  GET_FETCH_CATEGORIES_SUCCESS,
  GET_FETCH_FILTERED_RECIPES_SUCCESS,
  SHOW_ALL_CATEGORIES,
  GET_FETCH_SEARCH_FILTER_SUCCESS } from '../actions/actiontypes';

const INITIAL_STATE = {
  recipeData: [],
  recipeCategories: [],
  recipeCategoryData: [],
  recipeSearchData: [],
  toRender: 'recipeData',
};

const recipeDataReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_FETCH_RECIPES_SUCCESS:
    return {
      ...state,
      recipeData: action.payload,
      toRender: 'recipeData',
    };
  case GET_FETCH_CATEGORIES_SUCCESS:
    return {
      ...state,
      recipeCategories: action.payload,
    };
  case GET_FETCH_FILTERED_RECIPES_SUCCESS:
    return {
      ...state,
      recipeCategoryData: action.payload,
      toRender: 'recipeCategoryData',
    };
  case SHOW_ALL_CATEGORIES:
    return {
      ...state,
      recipeCategoryData: [],
      toRender: 'recipeData',
    };
  case GET_FETCH_SEARCH_FILTER_SUCCESS:
    return {
      ...state,
      recipeSearchData: action.payload,
      toRender: 'recipeSearchData',
    };
  default:
    return state;
  }
};

export default recipeDataReducer;
