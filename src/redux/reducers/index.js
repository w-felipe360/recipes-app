import { combineReducers } from 'redux';
import recipeDataReducer from './recipeDataReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({ userReducer, recipeDataReducer });

export default rootReducer;
