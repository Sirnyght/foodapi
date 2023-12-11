import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import Recipe from '../../models/recipe.js';

export default class RecipeDAO {
  async insert(recipe) {
    const db = await open({
      filename: 'database.db',
      driver: sqlite3.Database
    })
    await db.run(`INSERT INTO Recipe (name, type) VALUES (?, ?)`, [recipe.getName(), recipe.getType()]);
  }

  async update(recipe) {
    const db = await open({
      filename: 'database.db',
      driver: sqlite3.Database
    })
    await db.run(`UPDATE Recipe SET name = ?, type = ? WHERE id_recipe = ?`, [recipe.getName(), recipe.getType(), recipe.getId()]);
  }

  async delete(recipe) {
    const db = await open({
      filename: 'database.db',
      driver: sqlite3.Database
    })
    await db.run(`DELETE FROM Recipe WHERE id_recipe = ?`, [recipe.getId()]);
  }

  async findAll() {
    const db = await open({
      filename: 'database.db',
      driver: sqlite3.Database
    })
    const recipes = await db.all(`SELECT * FROM Recipe`);
    return recipes.map((recipe) => new Recipe(recipe.id_recipe, recipe.name, recipe.type));
  }

  async findById(id) {
    const db = await open({
      filename: 'database.db',
      driver: sqlite3.Database
    })
    const recipe = await db.get(`SELECT * FROM Recipe WHERE id_recipe = ?`, [id]);
    return new Recipe(recipe.id_recipe, recipe.name, recipe.type);
  }
}