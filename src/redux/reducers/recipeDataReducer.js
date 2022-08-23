import { GET_FETCH_RECIPES_SUCCESS,
  GET_FETCH_CATEGORIES_SUCCESS } from '../actions/actiontypes';

const INITIAL_STATE = {
  recipeData: [],
  recipeCategories: [],
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
  default:
    return state;
  }
};

export default recipeDataReducer;
