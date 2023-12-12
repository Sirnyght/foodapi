import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

export default class RefreshTokenDAO {
	async insert(refreshToken) {
		const db = await open({
				filename: 'database.db',
				driver: sqlite3.Database
		})
		await db.run(`INSERT INTO RefreshToken (id_user, token) VALUES (?, ?)`, [refreshToken.getUserId(), refreshToken.getToken()]);
	}
	
	async update(refreshToken) {
		const db = await open({
			filename: 'database.db',
			driver: sqlite3.Database
		})
		await db.run(`UPDATE RefreshToken SET token = ? WHERE id_user = ?`, [refreshToken.getToken(), refreshToken.getUserId()]);
	}
	
	async delete(refreshToken) {
		const db = await open({
			filename: 'database.db',
			driver: sqlite3.Database
		})
		await db.run(`DELETE FROM RefreshToken WHERE id_user = ?`, [refreshToken.getUserId()]);
	}
	
	async findAll() {
		const db = await open({
			filename: 'database.db',
			driver: sqlite3.Database
		})
		const refreshTokens = await db.all(`SELECT * FROM RefreshToken`);
		return refreshTokens;
	}

	async findById(id) {
		const db = await open({
			filename: 'database.db',
			driver: sqlite3.Database
		})
		const refreshToken = await db.get(`SELECT * FROM RefreshToken WHERE id_refresh_token = ?`, [id]);
		return refreshToken;
	}
	
	async findByIdUser(id_user) {
		const db = await open({
			filename: 'database.db',
			driver: sqlite3.Database
		})
		const refreshToken = await db.get(`SELECT * FROM RefreshToken WHERE id_user = ?`, [id_user]);
		return refreshToken;
	}

	// TEMP
	async findByToken(token) {
		const db = await open({
			filename: 'database.db',
			driver: sqlite3.Database
		})
		const refreshToken = await db.get(`SELECT * FROM RefreshToken WHERE token = ?`, [token]);
		return refreshToken;
	}

	// TEMP
	async deleteByToken(token) {
		const db = await open({
			filename: 'database.db',
			driver: sqlite3.Database
		})
		await db.run(`DELETE FROM RefreshToken WHERE token = ?`, [token]);
	}
}