import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { login, logout, authenticateToken, refreshToken } from './utils/auth.js';
import { protectedRoute, usersRoute, authenticatedUserRoute, userIDRoute, addUserRoute, updateUserRoute, deleteUserRoute, recipesRoute, ingredientsRoute, recipeByIdRoute, addRecipeRoute, updateRecipeRoute, deleteRecipeRoute, ingredientByIdRoute, ingredientByRecipeRoute, addIngredientRoute, updateIngredientRoute, deleteIngredientRoute } from './utils/routes.js';

const app = express();
const PORT = 3000;

app.use(express.json());


// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Food API',
      version: '1.0.0',
      description: 'Small API for school project',
    },
    components: {
        
    },
    servers: [
      {
        url: `http://localhost:${PORT}/`,
        description: 'Development Server',
      },
    ],
  },
  apis: ['./utils/routes.js', './utils/auth.js', './utils/*.js'],
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => {
  // Send index.html file
  res.sendFile('index.html', { root: './src/' });
});


/**
 * @swagger
 * paths:
 * /login:
 *   post:
 *     summary: Authenticate user and generate access token
 *     tags:
 *       - Authentication
 *     requestBody:
 *       description: User credentials for login
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successful login, returns access token
 *       '401':
 *         description: Invalid credentials
 */
app.post('/login', login);

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Invalidate and revoke user's access token
 *     tags:
 *       - Authentication
 *     responses:
 *       '200':
 *         description: Successful logout
 */
app.post('/logout', logout);

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user (TODO: Implementation pending)
 *     tags:
 *       - Authentication
 *     requestBody:
 *       description: User details for registration
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Add properties for user registration
 *     responses:
 *       '200':
 *         description: User registered successfully
 */
app.post('/register', (req, res) => {
  res.json(req.user);
});

/**
 * @swagger
 * /refresh:
 *   post:
 *     summary: Refresh user's access token
 *     tags:
 *       - Authentication
 *     responses:
 *       '200':
 *         description: New access token generated successfully
 *       '401':
 *         description: Invalid refresh token
 */
app.post('/refresh', refreshToken);

/**
 * @swagger
 * /protected:
 *   get:
 *     summary: Access a protected route (for testing authentication)
 *     tags:
 *       - Test
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Access granted to protected route
 *       '401':
 *         description: Unauthorized access
 */
app.get('/protected', authenticateToken, protectedRoute);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get a list of all users
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful retrieval of user list
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   username:
 *                     type: string
 *                   email:
 *                     type: string
 *       '401':
 *         description: Unauthorized access
 */
app.get('/users', authenticateToken, usersRoute);

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Get details of the authenticated user
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful retrieval of authenticated user details
 *       '401':
 *         description: Unauthorized access
 */
app.get('/users/me', authenticateToken, authenticatedUserRoute);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get details of a user by ID
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successful retrieval of user details by ID
 *       '401':
 *         description: Unauthorized access
 */
app.get('/users/:id', authenticateToken, userIDRoute);

/**
 * @swagger
 * /users/add:
 *   post:
 *     summary: Add a new user (admin privilege required)
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: User details for addition
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Add properties for adding a user
 *     responses:
 *       '200':
 *         description: User added successfully
 *       '401':
 *         description: Unauthorized access
 *       '403':
 *         description: Admin privilege required
 */
app.post('/users/add', authenticateToken, addUserRoute);

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: Update user details by ID
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Updated user details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Add properties for updating a user
 *     responses:
 *       '200':
 *         description: User updated successfully
 *       '401':
 *         description: Unauthorized access
 */
app.patch('/users/:id', authenticateToken, updateUserRoute);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: User deleted successfully
 *       '401':
 *         description: Unauthorized access
 */
app.delete('/users/:id', authenticateToken, deleteUserRoute);

/**
 * @swagger
 * /recipes:
 *   get:
 *     summary: Get a list of all recipes
 *     tags:
 *       - Recipes
 *     responses:
 *       '200':
 *         description: Successful retrieval of recipe list
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   // Add properties for a recipe
 *       '401':
 *         description: Unauthorized access
 */
app.get('/recipes', recipesRoute);

/**
 * @swagger
 * /recipes/{id}:
 *   get:
 *     summary: Get details of a recipe by ID
 *     tags:
 *       - Recipes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Recipe ID
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successful retrieval of recipe details by ID
 *       '401':
 *         description: Unauthorized access
 */
app.get('/recipes/:id', recipeByIdRoute);

/**
 * @swagger
 * /recipes/add:
 *   post:
 *     summary: Add a new recipe (admin privilege required)
 *     tags:
 *       - Recipes
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: Recipe details for addition
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Add properties for adding a recipe
 *     responses:
 *       '200':
 *         description: Recipe added successfully
 *       '401':
 *         description: Unauthorized access
 *       '403':
 *         description: Admin privilege required
 */
app.post('/recipes/add', authenticateToken, addRecipeRoute);

/**
 * @swagger
 * /recipes/{id}:
 *   patch:
 *     summary: Update recipe details by ID
 *     tags:
 *       - Recipes
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Recipe ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Updated recipe details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Add properties for updating a recipe
 *     responses:
 *       '200':
 *         description: Recipe updated successfully
 *       '401':
 *         description: Unauthorized access
 */
app.patch('/recipes/:id', authenticateToken, updateRecipeRoute);

/**
 * @swagger
 * /recipes/{id}:
 *   delete:
 *     summary: Delete a recipe by ID
 *     tags:
 *       - Recipes
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Recipe ID
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Recipe deleted successfully
 *       '401':
 *         description: Unauthorized access
 */
app.delete('/recipes/:id', authenticateToken, deleteRecipeRoute);

/**
 * @swagger
 * /ingredients:
 *   get:
 *     summary: Get a list of all ingredients
 *     tags:
 *       - Ingredients
 *     responses:
 *       '200':
 *         description: Successful retrieval of ingredient list
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   // Add properties for an ingredient
 *       '401':
 *         description: Unauthorized access
 */
app.get('/ingredients', ingredientsRoute);

/**
 * @swagger
 * /ingredients/{id}:
 *   get:
 *     summary: Get details of an ingredient by ID
 *     tags:
 *       - Ingredients
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Ingredient ID
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successful retrieval of ingredient details by ID
 *       '401':
 *         description: Unauthorized access
 */
app.get('/ingredients/:id', ingredientByIdRoute);

/**
 * @swagger
 * /recipes/{id}/ingredients:
 *   get:
 *     summary: Get a list of ingredients for a recipe by ID
 *     tags:
 *       - Ingredients
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Recipe ID
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successful retrieval of ingredients for the recipe
 *       '401':
 *         description: Unauthorized access
 */
app.get('/recipes/:id/ingredients', ingredientByRecipeRoute);

/**
 * @swagger
 * /ingredients/add:
 *   post:
 *     summary: Add a new ingredient (admin privilege required)
 *     tags:
 *       - Ingredients
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: Ingredient details for addition
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Add properties for adding an ingredient
 *     responses:
 *       '200':
 *         description: Ingredient added successfully
 *       '401':
 *         description: Unauthorized access
 *       '403':
 *         description: Admin privilege required
 */
app.post('/ingredients/add', authenticateToken, addIngredientRoute);

/**
 * @swagger
 * /ingredients/{id}:
 *   patch:
 *     summary: Update ingredient details by ID
 *     tags:
 *       - Ingredients
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Ingredient ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Updated ingredient details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Add properties for updating an ingredient
 *     responses:
 *       '200':
 *         description: Ingredient updated successfully
 *       '401':
 *         description: Unauthorized access
 */
app.patch('/ingredients/:id', authenticateToken, updateIngredientRoute);

/**
 * @swagger
 * /ingredients/{id}:
 *   delete:
 *     summary: Delete an ingredient by ID
 *     tags:
 *       - Ingredients
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Ingredient ID
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Ingredient deleted successfully
 *       '401':
 *         description: Unauthorized access
 */
app.delete('/ingredients/:id', authenticateToken, deleteIngredientRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
}); 