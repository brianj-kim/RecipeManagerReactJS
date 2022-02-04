import React from 'react';
import { Switch, Route } from "react-router-dom";
import './App.css';

import NavBar from "./components/NavBar";
import AddRecipe from "./components/AddRecipe";
import RecipesList from "./components/RecipesList";
import Recipe from "./components/Recipe";
import RecipeIngredients from "./components/RecipeIngredients";
import AddIngredient from "./components/AddIngredient";

function App() {
  return (
    <>
      <div>
        <NavBar />

        <Switch>
          <Route exact path={["/", "/recipes"]} component={RecipesList} />
          <Route exact path="/add" component={AddRecipe} />
          <Route path="/recipes/:id" component={Recipe} />
          <Route path="/recipe-ingredients/:id" component={RecipeIngredients} />
          <Route path="/ingredient/:id" component={AddIngredient} />
        </Switch>       
      </div>
    </>
  );
}

export default App;
