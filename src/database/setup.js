import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

// Create database.db and associated tables if they don't exist
// Also, insert some data in the tables

open({
	filename: 'database.db',
	driver: sqlite3.Database
}).then((db) => {
	// Drop all tables
	{
		db.exec(`DROP TABLE IF EXISTS Recipe;`)
		db.exec(`DROP TABLE IF EXISTS Ingredient;`)
		db.exec(`DROP TABLE IF EXISTS RecipeIngredient;`)
	}

	// Create tables Recipe and Ingredient
	{
		db.exec(`CREATE TABLE IF NOT EXISTS Recipe (
					id_recipe INTEGER PRIMARY KEY AUTOINCREMENT,
					name TEXT NOT NULL,
					type TEXT NOT NULL
				); 
		`)

		db.exec(`CREATE TABLE IF NOT EXISTS Ingredient (
					id_ingredient INTEGER PRIMARY KEY AUTOINCREMENT,
					name TEXT NOT NULL,
					type TEXT NOT NULL
				); 
		`)

		db.exec(`CREATE TABLE IF NOT EXISTS RecipeIngredient (
					id_recipe INTEGER NOT NULL,
					id_ingredient INTEGER NOT NULL,
					quantity TEXT NOT NULL,
					FOREIGN KEY (id_recipe) REFERENCES Recipe(id_recipe),
					FOREIGN KEY (id_ingredient) REFERENCES Ingredient(id_ingredient)
				);
		`)
	}

	// Irish Coffee
	{
		db.exec(` INSERT OR IGNORE INTO Recipe (name, type) VALUES ('Irish Coffee', 'Drink'); `)
		db.exec(` INSERT OR IGNORE INTO Ingredient (name, type) VALUES ('Whiskey', 'Alcohol'); `)
		db.exec(` INSERT OR IGNORE INTO Ingredient (name, type) VALUES ('Coffee', 'Hot'); `)
		db.exec(` INSERT OR IGNORE INTO Ingredient (name, type) VALUES ('Sugar', 'Sweet'); `)
		db.exec(` INSERT OR IGNORE INTO RecipeIngredient (id_recipe, id_ingredient, quantity) VALUES (1, 1, '5cl'); `)
		db.exec(` INSERT OR IGNORE INTO RecipeIngredient (id_recipe, id_ingredient, quantity) VALUES (1, 2, '10cl'); `)
		db.exec(` INSERT OR IGNORE INTO RecipeIngredient (id_recipe, id_ingredient, quantity) VALUES (1, 3, '1 spoon'); `)
	}

	
	// Mojito
	{
		db.exec(` INSERT OR IGNORE INTO Recipe (name, type) VALUES ('Mojito', 'Drink'); `)
		db.exec(` INSERT OR IGNORE INTO Ingredient (name, type) VALUES ('Rhum', 'Alcohol'); `)
		db.exec(` INSERT OR IGNORE INTO Ingredient (name, type) VALUES ('Lime', 'Fruit'); `)
		db.exec(` INSERT OR IGNORE INTO Ingredient (name, type) VALUES ('Mint', 'Herb'); `)
		db.exec(` INSERT OR IGNORE INTO Ingredient (name, type) VALUES ('Sugar Cane Syrup', 'Sweet'); `)
		db.exec(` INSERT OR IGNORE INTO Ingredient (name, type) VALUES ('Sparkling Water', 'Soft'); `)
		db.exec(` INSERT OR IGNORE INTO RecipeIngredient (id_recipe, id_ingredient, quantity) VALUES (2, 4, '5cl'); `)
		db.exec(` INSERT OR IGNORE INTO RecipeIngredient (id_recipe, id_ingredient, quantity) VALUES (2, 5, '1/2'); `)
		db.exec(` INSERT OR IGNORE INTO RecipeIngredient (id_recipe, id_ingredient, quantity) VALUES (2, 6, '6 leaves'); `)
		db.exec(` INSERT OR IGNORE INTO RecipeIngredient (id_recipe, id_ingredient, quantity) VALUES (2, 7, '2cl'); `)
		db.exec(` INSERT OR IGNORE INTO RecipeIngredient (id_recipe, id_ingredient, quantity) VALUES (2, 8, '10cl'); `)
		
	}

	// White Russian
	{
		db.exec(` INSERT OR IGNORE INTO Recipe (name, type) VALUES ('White Russian', 'Drink'); `)
		db.exec(` INSERT OR IGNORE INTO Ingredient (name, type) VALUES ('Vodka', 'Alcohol'); `)
		db.exec(` INSERT OR IGNORE INTO Ingredient (name, type) VALUES ('Coffee Liqueur', 'Alcohol'); `)
		db.exec(` INSERT OR IGNORE INTO Ingredient (name, type) VALUES ('Cream', 'Soft'); `)
		db.exec(` INSERT OR IGNORE INTO RecipeIngredient (id_recipe, id_ingredient, quantity) VALUES (3, 9, '5cl'); `)
		db.exec(` INSERT OR IGNORE INTO RecipeIngredient (id_recipe, id_ingredient, quantity) VALUES (3, 10, '2cl'); `)
		db.exec(` INSERT OR IGNORE INTO RecipeIngredient (id_recipe, id_ingredient, quantity) VALUES (3, 11, '3cl'); `)
	}
});