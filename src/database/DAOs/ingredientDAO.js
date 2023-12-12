import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import Ingredient from '../../models/ingredient.js'

export default class IngredientDAO {
  async insert(ingredient) {
    const db = await open({
      filename: 'database.db',
      driver: sqlite3.Database
    })
    await db.run(`INSERT INTO Ingredient (name, type) VALUES (?, ?)`, [ingredient.getName(), ingredient.getType()]);
  }

  async update(ingredient) {
    const db = await open({
      filename: 'database.db',
      driver: sqlite3.Database
    })
    await db.run(`UPDATE Ingredient SET name = ?, type = ? WHERE id_ingredient = ?`, [ingredient.getName(), ingredient.getType(), ingredient.getId()]);
  }

  async delete(ingredient) {
    const db = await open({
      filename: 'database.db',
      driver: sqlite3.Database
    })
    await db.run(`DELETE FROM Ingredient WHERE id_ingredient = ?`, [ingredient.getId()]);
  }

  async findAll() {
    const db = await open({
      filename: 'database.db',
      driver: sqlite3.Database
    })
    const ingredients = await db.all(`SELECT * FROM Ingredient`);
    return ingredients.map(
      (ingredient) => new Ingredient(ingredient.id_ingredient, ingredient.name, ingredient.type)
    );
  }

  async findById(id) {
    const db = await open({
      filename: 'database.db',
      driver: sqlite3.Database
    })
    const ingredient = await db.get(`SELECT * FROM Ingredient WHERE id_ingredient = ?`, [id]);
    return new Ingredient(ingredient.id_ingredient, ingredient.name, ingredient.type);
  }
}