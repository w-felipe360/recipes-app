import { GET_FETCH_RECIPES_SUCCESS,
  GET_FETCH_CATEGORIES_SUCCESS,
  GET_FETCH_FILTERED_RECIPES_SUCCESS,
  SHOW_ALL_CATEGORIES } from '../actions/actiontypes';

const INITIAL_STATE = {
  recipeData: [],
  recipeCategories: [],
  recipeCategoryData: [],
};

const recipeDataReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_FETCH_RECIPES_SUCCESS:
    return {
      ...state,
      recipeData: action.payload,
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
    };
  case SHOW_ALL_CATEGORIES:
    return {
      ...state,
      recipeCategoryData: [],
    };
  default:
    return state;
  }
};

export default recipeDataReducer;
