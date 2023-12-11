import IngredientDAO from '../DAOs/ingredientDAO.js';
import RecipeIngredientDAO from '../DAOs/recipeIngredientDAO.js';

export default class IngredientRepository {
  constructor() {
    this.ingredientDAO = new IngredientDAO();
    this.recipeIngredientDAO = new RecipeIngredientDAO();
  }

  async insert(ingredient) {
    await this.ingredientDAO.insert(ingredient);
  }

  async update(ingredient) {
    await this.ingredientDAO.update(ingredient);
  }

  async delete(ingredient) {
    await this.ingredientDAO.delete(ingredient);
  }

  async findAll() {
    const ingredients = await this.ingredientDAO.findAll();
    return ingredients;
  }

  async findById(id) {
    const ingredient = await this.ingredientDAO.findById(id);
    return ingredient;
  }

  async findByRecipe(id_recipe) {
    const recipeIngredients = await this.recipeIngredientDAO.findByRecipe(id_recipe);
    const ingredients = [];
    for (const recipeIngredient of recipeIngredients) {
      const ingredient = await this.ingredientDAO.findById(recipeIngredient.id_ingredient);
      ingredients.push(ingredient);
    }
    return ingredients; 
  }
}