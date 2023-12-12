import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import { generateHash } from '../utils/security.js'

// Create database.db and associated tables if they don't exist
// Also, insert some data in the tables

const db = await open({
	filename: 'database.db',
	driver: sqlite3.Database
})

// Drop all tables
{
	db.exec(`DROP TABLE IF EXISTS Recipe;`)
	db.exec(`DROP TABLE IF EXISTS Ingredient;`)
	db.exec(`DROP TABLE IF EXISTS RecipeIngredient;`)
	db.exec(`DROP TABLE IF EXISTS User;`)
	db.exec(`DROP TABLE IF EXISTS UserRole;`)
	db.exec(`DROP TABLE IF EXISTS Role;`)
	db.exec(`DROP TABLE IF EXISTS RefreshToken;`)
}

// Create tables Recipe, Ingredient and RecipeIngredient
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

// Create tables User, Role and UserRole
// User password is a hash 
{
	db.exec(`CREATE TABLE IF NOT EXISTS User (
				id_user INTEGER PRIMARY KEY AUTOINCREMENT,
				username TEXT NOT NULL,
				password TEXT NOT NULL
			); 
	`)

	db.exec(`CREATE TABLE IF NOT EXISTS Role (
				id_role INTEGER PRIMARY KEY AUTOINCREMENT,
				name TEXT NOT NULL
			); 
	`)

	db.exec(`CREATE TABLE IF NOT EXISTS UserRole (
				id_user INTEGER NOT NULL,
				id_role INTEGER NOT NULL,
				FOREIGN KEY (id_user) REFERENCES User(id_user),
				FOREIGN KEY (id_role) REFERENCES Role(id_role)
			);
	`)

	db.exec(`CREATE TABLE IF NOT EXISTS RefreshToken (
				id_refresh_token INTEGER PRIMARY KEY AUTOINCREMENT,
				id_user INTEGER NOT NULL,
				token TEXT NOT NULL,
				FOREIGN KEY (id_user) REFERENCES User(id_user)
			);
	`)
	
	db.exec(`INSERT OR IGNORE INTO User (username, password) VALUES ('admin', '${await generateHash('admin')}'); `)
	db.exec(`INSERT OR IGNORE INTO Role (name) VALUES ('admin'); `)
	db.exec(`INSERT OR IGNORE INTO UserRole (id_user, id_role) VALUES (1, 1); `)

	db.exec(`INSERT OR IGNORE INTO User (username, password) VALUES ('user', '${await generateHash('user')}'); `)
	db.exec(`INSERT OR IGNORE INTO Role (name) VALUES ('user'); `)
	db.exec(`INSERT OR IGNORE INTO UserRole (id_user, id_role) VALUES (2, 2); `)
}
