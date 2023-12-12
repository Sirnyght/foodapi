import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import Recipe from '../models/recipe.js';
import Ingredient from '../models/ingredient.js';
import UserRepository from '../database/repository/userRepository.js';
import RoleRepository from '../database/repository/roleRepository.js';
import RecipeRepository from '../database/repository/recipeRepository.js';
import IngredientRepository from '../database/repository/ingredientRepository.js';
import RefreshTokenDAO from '../database/DAOs/refreshTokenDAO.js';
import RefreshToken from '../models/refreshToken.js';

import { JWT_SECRET, JWT_EXPIRATION, REFRESH_TOKEN_SECRET, REFRESH_TOKEN_EXPIRATION } from '../config/config.js';

export const protectedRoute = (req, res) => {
  res.json({ message: 'Protected route accessed successfully' });
};

export async function usersRoute(req, res) {
  try {
    const userRepository = new UserRepository();
    const users = await userRepository.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export async function userByIdRoute(req, res) {
  try {
    const userRepository = new UserRepository();
    const user = await userRepository.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function authenticatedUserRoute(req, res) {
  try {
    // Get user from access token
    const accessToken = req.headers.authorization.split(' ')[1];
    const decodedAccessToken = jwt.verify(accessToken, JWT_SECRET);

    const userRepository = new UserRepository();
    const user = await userRepository.findById(decodedAccessToken.id);
    console.log(user);

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function userIDRoute(req, res) {
  try {
    const userRepository = new UserRepository();
    const user = await userRepository.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function addUserRoute(req, res) {
  try {
    // console.log(req.body.roles);
    const userRepository = new UserRepository();
    const roleRepository = new RoleRepository();
    // Fetch roles ids from database
    const roles = await roleRepository.findByNames(req.body.roles);
    console.log(roles);
    // Create user object
    const user = new User();
    user.setUsername(req.body.username);
    user.setPassword(req.body.password);
    user.setRoles(roles);
    await userRepository.insert(user);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function updateUserRoute(req, res) {
  try {
    const userRepository = new UserRepository();
    const roleRepository = new RoleRepository();
    // Fetch roles ids from database
    const roles = await roleRepository.findByNames(req.body.roles);
    // Create user object
    const user = new User();
    user.setId(req.params.id);
    user.setUsername(req.body.username);
    user.setPassword(req.body.password);
    user.setRoles(roles);
    await userRepository.update(user);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function deleteUserRoute(req, res) {
  try {
    console.log(req.params.id);
    const userRepository = new UserRepository();
    const user = new User();
    user.setId(req.params.id);
    await userRepository.delete(user);
    // send message to client
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function recipesRoute(req, res) {
  try {
    const recipeRepository = new RecipeRepository();
    const recipes = await recipeRepository.findAll();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function recipeByIdRoute(req, res) {
  try {
    const recipeRepository = new RecipeRepository();
    const recipe = await recipeRepository.findById(req.params.id);
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function addRecipeRoute(req, res) {
  try {
    const recipeRepository = new RecipeRepository();
    const recipe = new Recipe();
    recipe.setName(req.body.name);
    recipe.setType(req.body.type);
    // Transform the array of ingredients into an array of Ingredient objects
    const ingredients = [];
    for (const ingredient of req.body.ingredients) {
      const ingredientObject = new Ingredient();
      ingredientObject.setName(ingredient.name);
      ingredientObject.setType(ingredient.type);
      ingredientObject.setQuantity(ingredient.quantity);
      ingredients.push(ingredientObject);
    }
    recipe.setIngredients(ingredients);
    console.log(recipe);
    await recipeRepository.insert(recipe);
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function updateRecipeRoute(req, res) {
  try {
    const recipeRepository = new RecipeRepository();
    const recipe = new Recipe();
    recipe.setId(req.params.id);
    recipe.setName(req.body.name);
    recipe.setType(req.body.type);
    // Transform the array of ingredients into an array of Ingredient objects
    const ingredients = [];
    for (const ingredient of req.body.ingredients) {
      const ingredientObject = new Ingredient();
      ingredientObject.setName(ingredient.name);
      ingredientObject.setType(ingredient.type);
      ingredientObject.setQuantity(ingredient.quantity);
      ingredients.push(ingredientObject);
    }
    recipe.setIngredients(ingredients);
    await recipeRepository.update(recipe);
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function deleteRecipeRoute(req, res) {
  try {
    const recipeRepository = new RecipeRepository();
    const recipe = new Recipe();
    recipe.setId(req.params.id);
    await recipeRepository.delete(recipe);
    // send message to client
    res.json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function ingredientsRoute(req, res) {
  try {
    const ingredientRepository = new IngredientRepository();
    const ingredients = await ingredientRepository.findAll();
    res.json(ingredients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function ingredientByIdRoute(req, res) {
  try {
    const ingredientRepository = new IngredientRepository();
    const ingredient = await ingredientRepository.findById(req.params.id);
    res.json(ingredient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function ingredientByRecipeRoute(req, res) {
  try {
    const ingredientRepository = new IngredientRepository();
    const ingredients = await ingredientRepository.findByRecipe(req.params.id);
    res.json(ingredients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function addIngredientRoute(req, res) {
  try {
    const ingredientRepository = new IngredientRepository();
    const ingredient = new Ingredient();
    ingredient.setName(req.body.name);
    ingredient.setType(req.body.type);
    await ingredientRepository.insert(ingredient);
    res.json(ingredient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function updateIngredientRoute(req, res) {
  try {
    const ingredientRepository = new IngredientRepository();
    const ingredient = new Ingredient();
    ingredient.setId(req.params.id);
    ingredient.setName(req.body.name);
    ingredient.setType(req.body.type);
    await ingredientRepository.update(ingredient);
    res.json(ingredient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function deleteIngredientRoute(req, res) {
  try {
    const ingredientRepository = new IngredientRepository();
    const ingredient = new Ingredient();
    ingredient.setId(req.params.id);
    await ingredientRepository.delete(ingredient);
    // send message to client
    res.json({ message: 'Ingredient deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}



