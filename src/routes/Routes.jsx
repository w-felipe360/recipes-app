import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DoneRecipes from '../pages/DoneRecipes';
import FavoriteRecipes from '../pages/FavoriteRecipes';
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
        {/* <Route exact path="/foods" component={ Foods } />
        <Route exact path="/drinks" component={ Drinks } /> */}
        <Route path="/recipedetails" component={ RecipeDetails } />
        <Route path="/recipeinprogress" component={ RecipeInProgress } />
        <Route path="/recipes" component={ Recipes } />
        <Route path="/done-recipes" component={ DoneRecipes } />
        <Route path="/profile" component={ Profile } />
        <Route path="/favorite-recipes" component={ FavoriteRecipes } />
      </Switch>
    </div>
  );
}

export default Routes;
