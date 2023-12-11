import express from 'express';
import { login, logout, authenticateToken, refreshToken } from './utils/auth.js';
import { protectedRoute, usersRoute, authenticatedUserRoute } from './utils/routes.js';

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
  app.get('/users/:id', authenticateToken, (req, res) => {
    res.json(req.user);
  });
  // Modify user route (protected, needs to be authenticated)
  // We use PATCH instead of PUT because we only want to update the fields that are provided
  app.patch('/users/:id', authenticateToken, (req, res) => {
    res.json(req.user);
  });
  // Delete user route (protected, needs to be authenticated)
  app.delete('/users/:id', authenticateToken, (req, res) => {
    res.json(req.user);
  });
}

// Recipes routes (check all recipes, add a recipe, delete a recipe, update a recipe, check recipe by id)
{
  // Recipes route (unprotected, everyone can access the recipes)
  app.get('/recipes', (req, res) => {
    res.json(req.user);
  });
  // Recipe by id route (unprotected, everyone can access the recipes)
  app.get('/recipes/:id', (req, res) => {
    res.json(req.user);
  });
  // Add recipe route (protected, needs to be authenticated)
  app.post('/recipes', authenticateToken, (req, res) => {
    res.json(req.user);
  });
  // Modify recipe route (protected, needs to be authenticated)
  // We use PATCH instead of PUT because we only want to update the fields that are provided
  app.patch('/recipes/:id', authenticateToken, (req, res) => {
    res.json(req.user);
  });
  // Delete recipe route (protected, needs to be authenticated)
  app.delete('/recipes/:id', authenticateToken, (req, res) => {
    res.json(req.user);
  });
}

// Ingredients routes
{
  // Ingredients route (unprotected, everyone can access the ingredients)
  app.get('/ingredients', (req, res) => {
    res.json(req.user);
  });
  // Ingredient by id route (unprotected, everyone can access the ingredients)
  app.get('/ingredients/:id', (req, res) => {
    res.json(req.user);
  });
  // Ingredients by recipe id route (unprotected, everyone can access the ingredients)
  app.get('/recipes/:id/ingredients', (req, res) => {
    res.json(req.user);
  });
  // Add ingredient route (protected, needs to be authenticated)
  app.post('/ingredients', authenticateToken, (req, res) => {
    res.json(req.user);
  });
  // Modify ingredient route (protected, needs to be authenticated)
  // We use PATCH instead of PUT because we only want to update the fields that are provided
  app.patch('/ingredients/:id', authenticateToken, (req, res) => {
    res.json(req.user);
  });
  // Delete ingredient route (protected, needs to be authenticated)
  app.delete('/ingredients/:id', authenticateToken, (req, res) => {
    res.json(req.user);
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
}); 