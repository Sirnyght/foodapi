import IngredientDAO from '../DAOs/ingredientDAO.js';
import RecipeIngredientDAO from '../DAOs/recipeIngredientDAO.js';

export default class IngredientRepository {
  async insert(ingredient) {
    const ingredientDAO = new IngredientDAO();
    await ingredientDAO.insert(ingredient);
  }

  async update(ingredient) {
    const ingredientDAO = new IngredientDAO();
    await ingredientDAO.update(ingredient);
  }

  async delete(ingredient) {
    const ingredientDAO = new IngredientDAO();
    await ingredientDAO.delete(ingredient);
  }

  async findAll() {
    const ingredientDAO = new IngredientDAO();
    const ingredients = await ingredientDAO.findAll();
    return ingredients;
  }

  async findById(id) {
    const ingredientDAO = new IngredientDAO();
    const ingredient = await ingredientDAO.findById(id);
    return ingredient;
  }

  async findByRecipe(id_recipe) {
    const ingredientDAO = new IngredientDAO();
    const recipeIngredientDAO = new RecipeIngredientDAO();
    const recipeIngredients = await recipeIngredientDAO.findByRecipe(id_recipe);
    const ingredients = [];
    for (const recipeIngredient of recipeIngredients) {
      const ingredient = await ingredientDAO.findById(recipeIngredient.id_ingredient);
      ingredients.push(ingredient);
    }
    return ingredients;
  }
}