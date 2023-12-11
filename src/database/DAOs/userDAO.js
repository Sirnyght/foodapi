import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import User from '../../models/user.js'

export default class UserDAO {
	async insert(user) {
		const db = await open({
			filename: 'database.db',
			driver: sqlite3.Database
		})
		await db.run(`INSERT INTO User (id_role, username, password) VALUES (?, ?, ?)`, [user.getIdRole(), user.getUsername(), user.getPassword()]);
	}
	
	async update(user) {
		const db = await open({
			filename: 'database.db',
			driver: sqlite3.Database
		})
		await db.run(`UPDATE User SET id_role = ?, username = ?, password = ? WHERE id_user = ?`, [user.getIdRole(), user.getUsername(), user.getPassword(), user.getId()]);
	}
	
	async delete(user) {
		const db = await open({
			filename: 'database.db',
			driver: sqlite3.Database
		})
		await db.run(`DELETE FROM User WHERE id_user = ?`, [user.getId()]);
	}
	
	async findAll() {
		const db = await open({
			filename: 'database.db',
			driver: sqlite3.Database
		})
		const users = await db.all(`SELECT * FROM User`);
		return users.map(
			(user) => new User(user.id_user, user.username, user.password)
		);
	}

	async findById(id) {
		const db = await open({
			filename: 'database.db',
			driver: sqlite3.Database
		})
		const user = await db.get(`SELECT * FROM User WHERE id_user = ?`, [id]);
		return new User(user.id_user, user.id_role, user.username, user.password);
	}
}