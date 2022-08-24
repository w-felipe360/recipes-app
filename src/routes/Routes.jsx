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

        {/* As rotas a baixo foram as primeiras que desenvolvemos */}

        <Route path="/recipedetails" component={ RecipeDetails } />
        <Route path="/recipeinprogress" component={ RecipeInProgress } />
        <Route exact path="/foods" component={ Recipes } />
        <Route exact path="/drinks" component={ Recipes } />
        <Route path="/recipes" component={ Recipes } />
        <Route path="/done-recipes" component={ DoneRecipes } />
        <Route path="/profile" component={ Profile } />
        <Route path="/favorite-recipes" component={ FavoriteRecipes } />

        {/* As rotas a baixo tem o path exigido pelo projeto */}

        {/* <Route path="/foods" component={ x } />
        <Route path="/drinks" component={ x } /> */}
        <Route exact path="/foods/:id" component={ RecipeDetails } />
        <Route exact path="/drinks/:id" component={ RecipeDetails } />
        <Route path="/foods/:id/in-progress" component={ RecipeInProgress } />
        <Route path="/drinks/:id/in-progress" component={ RecipeInProgress } />
        {/* <Route path="/profile" component={ x } />
        <Route path="/done-recipes" component={ x } />
        <Route path="/favorite-recipes" component={ x } /> */}

      </Switch>
    </div>
  );
}

export default Routes;
