import IngredientDAO from '../DAOs/ingredientDAO.js';
import RecipeDAO from '../DAOs/recipeDAO.js';
import RecipeIngredientDAO from '../DAOs/recipeIngredientDAO.js';

export default class RecipeRepository {
  constructor() {
    this.ingredientDAO = new IngredientDAO();
    this.recipeDAO = new RecipeDAO();
    this.recipeIngredientDAO = new RecipeIngredientDAO();
  }

  async insert(recipe) {
    await this.recipeDAO.insert(recipe);
    // get id of newly inserted recipe
    const recipes = await this.recipeDAO.findAll();
    const id = recipes[recipes.length - 1].getId();
    recipe.setId(id);

    // For each ingredient, check if it already exists in the database.
    // If it does, get its id and insert the association and quantity in the database.
    // If it doesn't, insert the ingredient in the database, get its id and insert the association and quantity in the database.
    for (const ingredient of recipe.getIngredients()) {
      const ingredients = await this.ingredientDAO.findAll();
      let ingredientId = null;
      for (const existingIngredient of ingredients) {
        if (existingIngredient.getName() === ingredient.getName()) {
          ingredientId = existingIngredient.getId();
        }
      }
      if (ingredientId === null) {
        await this.ingredientDAO.insert(ingredient);
        const ingredients = await this.ingredientDAO.findAll();
        ingredientId = ingredients[ingredients.length - 1].getId();
      }
      await this.recipeIngredientDAO.insert(recipe.getId(), ingredientId, ingredient.getQuantity());
    }

  }
  
  async update(recipe) {
    await this.recipeDAO.update(recipe);

    // Check if we are adding or removing an ingredient from the recipe.
    // If the new recipe has an ingredient that the old recipe didn't have, add it to the database.
    // If the old recipe had an ingredient that the new recipe doesn't have, remove it from the database.
    // If the recipe has the same ingredients as before, do nothing.
    const oldRecipeIngredients = await this.recipeIngredientDAO.findByRecipe(recipe.getId());
    console.log(oldRecipeIngredients);

    for (const oldRecipeIngredient of oldRecipeIngredients) {
      if (!recipe.getIngredients().includes(oldRecipeIngredient.id_ingredient)) {
        await this.recipeIngredientDAO.delete(recipe.getId(), oldRecipeIngredient.id_ingredient);
      }
    }

    for (const ingredient of recipe.getIngredients()) {
      // Check if the ingredient already exists in the database.
      // If it does, get its id and insert the association and quantity in the database.
      // If it doesn't, insert the ingredient in the database, get its id and insert the association and quantity in the database.
      const ingredients = await this.ingredientDAO.findAll();
      let ingredientId = null;
      for (const existingIngredient of ingredients) {
        if (existingIngredient.getName() === ingredient.getName()) {
          ingredientId = existingIngredient.getId();
        }
      }
      if (ingredientId === null) {
        await this.ingredientDAO.insert(ingredient);
        const ingredients = await this.ingredientDAO.findAll();
        ingredientId = ingredients[ingredients.length - 1].getId();
      }
      await this.recipeIngredientDAO.insert(recipe.getId(), ingredientId, ingredient.getQuantity());

    }

  }

  async delete(recipe) {
    await this.recipeDAO.delete(recipe);

    // get all ingredients of recipe
    const recipeIngredients = await this.recipeIngredientDAO.findByRecipe(recipe.getId());
    for (const recipeIngredient of recipeIngredients) {
      // delete recipeIngredient from database
      await this.recipeIngredientDAO.delete(recipeIngredient.id_recipe, recipeIngredient.id_ingredient);
    }
  }

  async findAll() {
    const recipes = await this.recipeDAO.findAll();

    for (const recipe of recipes) {
      const recipeIngredients = await this.recipeIngredientDAO.findByRecipe(recipe.getId());
      const ingredients = [];
      for (const recipeIngredient of recipeIngredients) {
        const ingredient = await this.ingredientDAO.findById(recipeIngredient.id_ingredient);
        ingredients.push(ingredient);
      }
      recipe.setIngredients(ingredients);
    }
    return recipes;
  }

  async findById(id) {
    const recipe = await this.recipeDAO.findById(id);

    const recipeIngredients = await this.recipeIngredientDAO.findByRecipe(recipe.getId());
    const ingredients = [];
    for (const recipeIngredient of recipeIngredients) {
      const ingredient = await this.ingredientDAO.findById(recipeIngredient.id_ingredient);
      ingredients.push(ingredient);
    }
    recipe.setIngredients(ingredients);
    return recipe;
  }
}

