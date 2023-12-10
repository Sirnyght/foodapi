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

    for (const ingredient of recipe.getIngredients()) {
      await this.ingredientDAO.insert(ingredient);
      await this.recipeIngredientDAO.insert(recipe.getId(), ingredient.getId(), ingredient.getQuantity());
    }
  }
  

  async update(recipe) {
    await this.recipeDAO.update(recipe);

    for (const ingredient of recipe.getIngredients()) {
      await this.ingredientDAO.update(ingredient);
      await this.recipeIngredientDAO.update(recipe.getId(), ingredient.getId(), ingredient.getQuantity());
    }
  }

  async delete(recipe) {
    await this.recipeDAO.delete(recipe);

    for (const ingredient of recipe.getIngredients()) {
      await this.ingredientDAO.delete(ingredient);
      await this.recipeIngredientDAO.delete(recipe.getId(), ingredient.getId());
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

