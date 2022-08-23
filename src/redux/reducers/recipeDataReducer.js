import { GET_FETCH_RECIPES_SUCCESS } from '../actions/actiontypes';

const INITIAL_STATE = {
  recipeData: [],
};

const recipeDataReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_FETCH_RECIPES_SUCCESS:
    return {
      recipeData: action.payload,
    };
  default:
    return state;
  }
};

export default recipeDataReducer;
