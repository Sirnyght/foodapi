import express from 'express';
import { login, logout, authenticateToken, refreshToken } from './utils/auth.js';
import { protectedRoute, usersRoute, authenticatedUserRoute, userIDRoute, addUserRoute, updateUserRoute, deleteUserRoute, recipesRoute, ingredientsRoute, recipeByIdRoute, addRecipeRoute, updateRecipeRoute, deleteRecipeRoute, ingredientByIdRoute, ingredientByRecipeRoute, addIngredientRoute, updateIngredientRoute, deleteIngredientRoute } from './utils/routes.js';

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  // Send index.html file
  res.sendFile('index.html', { root: './src/' });
});

// Authentication routes
{
  // Login route
  app.post('/login', login);
  // Logout route
  app.post('/logout', logout);
  // Register route TODO
  app.post('/register', (req, res) => {
    res.json(req.user);
  });
  // Refresh token route
  app.post('/refresh', refreshToken);
}

// Protected route (test purpose)
app.get('/protected', authenticateToken, protectedRoute); 

// Users route (check all users, add a user, delete a user, update a user, check user by id)
{
  // Users route (protected, needs to be authenticated)
  app.get('/users', authenticateToken, usersRoute);
  // Authenticated user route (protected, needs to be authenticated)
  app.get('/users/me', authenticateToken, authenticatedUserRoute);
  // User by id route (protected, needs to be authenticated)
  app.get('/users/:id', authenticateToken, userIDRoute);
  // Add user route (protected, needs to be authenticated, only admin can add a user)
  app.post('/users/add', authenticateToken, addUserRoute);
  // Modify user route (protected, needs to be authenticated)
  // We use PATCH instead of PUT because we only want to update the fields that are provided
  app.patch('/users/:id', authenticateToken, updateUserRoute);
  // Delete user route (protected, needs to be authenticated)
  app.delete('/users/:id', authenticateToken, deleteUserRoute);
}

// Recipes routes (check all recipes, add a recipe, delete a recipe, update a recipe, check recipe by id)
{
  // Recipes route (unprotected, everyone can access the recipes)
  app.get('/recipes',  recipesRoute);
  // Recipe by id route (unprotected, everyone can access the recipes)
  app.get('/recipes/:id', recipeByIdRoute);
  // Add recipe route (protected, needs to be authenticated)
  app.post('/recipes/add', authenticateToken, addRecipeRoute);
  // Modify recipe route (protected, needs to be authenticated)
  // We use PATCH instead of PUT because we only want to update the fields that are provided
  app.patch('/recipes/:id', authenticateToken, updateRecipeRoute);
  // Delete recipe route (protected, needs to be authenticated)
  app.delete('/recipes/:id', authenticateToken, deleteRecipeRoute);
}

// Ingredients routes
{
  // Ingredients route (unprotected, everyone can access the ingredients)
  app.get('/ingredients', ingredientsRoute);
  // Ingredient by id route (unprotected, everyone can access the ingredients)
  app.get('/ingredients/:id', ingredientByIdRoute);
  // Ingredients by recipe id route (unprotected, everyone can access the ingredients)
  app.get('/recipes/:id/ingredients', ingredientByRecipeRoute);
  // Add ingredient route (protected, needs to be authenticated)
  app.post('/ingredients/add', authenticateToken, addIngredientRoute);
  // Modify ingredient route (protected, needs to be authenticated)
  // We use PATCH instead of PUT because we only want to update the fields that are provided
  app.patch('/ingredients/:id', authenticateToken, updateIngredientRoute);
  // Delete ingredient route (protected, needs to be authenticated)
  app.delete('/ingredients/:id', authenticateToken, deleteIngredientRoute);
}

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
}); 