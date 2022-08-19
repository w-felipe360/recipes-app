import React from 'react';
import { Route, Switch } from 'react-router-dom';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import DoneRecipes from '../pages/DoneRecipes';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import RecipeDetails from '../pages/RecipeDetails';
import RecipeInProgress from '../pages/RecipeInProgress';
import Recipes from '../pages/Recipes';

function Routes() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/recipedetails" component={ RecipeDetails } />
        <Route path="/recipeinprogress" component={ RecipeInProgress } />
        <Route path="/recipes" component={ Recipes } />
        <Route path="/donerecipes" component={ DoneRecipes } />
        <Route path="/profile" component={ Profile } />
        <Route path="/favoriterecipes" component={ FavoriteRecipes } />
      </Switch>
    </div>
  );
}

export default Routes;
