import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

export default class RecipeIngredientDAO {
  async insert(id_recipe, id_ingredient, quantity) {
    const db = await open({
      filename: 'database.db',
      driver: sqlite3.Database
    })
    await db.run(`INSERT INTO RecipeIngredient (id_recipe, id_ingredient, quantity) VALUES (?, ?, ?)`, [id_recipe, id_ingredient, quantity]);
  }

  async update(id_recipe, id_ingredient, quantity) {
    const db = await open({
      filename: 'database.db',
      driver: sqlite3.Database
    })
    await db.run(`UPDATE RecipeIngredient SET quantity = ? WHERE id_recipe = ? AND id_ingredient = ?`, [quantity, id_recipe, id_ingredient]);
  }

  async delete(id_recipe, id_ingredient) {
    const db = await open({
      filename: 'database.db',
      driver: sqlite3.Database
    })
    await db.run(`DELETE FROM RecipeIngredient WHERE id_recipe = ? AND id_ingredient = ?`, [id_recipe, id_ingredient]);
  }

  async findAll() {
    const db = await open({
      filename: 'database.db',
      driver: sqlite3.Database
    })
    const recipeIngredients = await db.all(`SELECT * FROM RecipeIngredient`);
    return recipeIngredients;
  }

  async findById(id_recipe, id_ingredient) {
    const db = await open({
      filename: 'database.db',
      driver: sqlite3.Database
    })
    const recipeIngredient = await db.get(`SELECT * FROM RecipeIngredient WHERE id_recipe = ? AND id_ingredient = ?`, [id_recipe, id_ingredient]);
    return recipeIngredient;
  }

  async findByRecipe(id_recipe) {
    const db = await open({
      filename: 'database.db',
      driver: sqlite3.Database
    })
    const recipeIngredients = await db.all(`SELECT * FROM RecipeIngredient WHERE id_recipe = ?`, [id_recipe]);
    return recipeIngredients;
  }

  async findByIngredient(id_ingredient) {
    const db = await open({
      filename: 'database.db',
      driver: sqlite3.Database
    })
    const recipeIngredients = await db.all(`SELECT * FROM RecipeIngredient WHERE id_ingredient = ?`, [id_ingredient]);
    return recipeIngredients;
  }
}