// Import SQLite
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

// Import express
import express from 'express'

// Import object models
import Recipe from './models/recipe.js'
import Ingredient from './models/ingredient.js'

// Import repositories
import RecipeRepository from './database/repository/recipeRepository.js'
import IngredientRepository from './database/repository/ingredientRepository.js'

// Use the database
const RR = new RecipeRepository();
const recipes = await RR.findAll();
console.log(recipes); 

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

app.get('/recipes', async (req, res) => {
    const recipes = await RR.findAll();
    res.send(recipes);
});

app.get('/recipes/:id', async (req, res) => {
    const recipes = await RR.findById(req.params.id);
    res.send(recipes);
});

app.get('/ingredients', async (req, res) => {
    const IR = new IngredientRepository();
    const ingredients = await IR.findAll();
    res.send(ingredients);
});

app.get('/ingredients/:id', async (req, res) => {
    const IR = new IngredientRepository();
    const ingredients = await IR.findById(req.params.id);
    res.send(ingredients);
});

app.get('/recipes/:id/ingredients', async (req, res) => {
    const IR = new IngredientRepository();
    const ingredients = await IR.findByRecipe(req.params.id);
    res.send(ingredients);
});

app.get('/ingredients/:id/recipes', async (req, res) => {
    const IR = new IngredientRepository();
    const recipes = await IR.findRecipesByIngredient(req.params.id);
    res.send(recipes);
});





