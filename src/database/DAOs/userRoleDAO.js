import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

export default class UserRoleDAO {
  async insert(id_user, id_role) {
    const db = await open({
      filename: 'database.db',
      driver: sqlite3.Database
    })
    await db.run(`INSERT INTO UserRole (id_user, id_role) VALUES (?, ?)`, [id_user, id_role]);
  }
  
  async update(id_user, id_role) {
    const db = await open({
      filename: 'database.db',
      driver: sqlite3.Database
    })
    await db.run(`UPDATE UserRole SET id_role = ? WHERE id_user = ?`, [id_role, id_user]);
  }
  
  async delete(id_user, id_role) {
    const db = await open({
      filename: 'database.db',
      driver: sqlite3.Database
    })
    await db.run(`DELETE FROM UserRole WHERE id_user = ? AND id_role = ?`, [id_user, id_role]);
  }
  
  async findAll() {
    const db = await open({
      filename: 'database.db',
      driver: sqlite3.Database
    })
    const userRoles = await db.all(`SELECT * FROM UserRole`);
    return userRoles;
  }

  async findById(id_user, id_role) {
    const db = await open({
      filename: 'database.db',
      driver: sqlite3.Database
    })
    const userRole = await db.get(`SELECT * FROM UserRole WHERE id_user = ? AND id_role = ?`, [id_user, id_role]);
    return userRole;
  }
  
  async findByIdUser(id_user) {
    const db = await open({
      filename: 'database.db',
      driver: sqlite3.Database
    })
    const userRoles = await db.all(`SELECT * FROM UserRole WHERE id_user = ?`, [id_user]);
    return userRoles;
  }
  
  async findByIdRole(id_role) {
    const db = await open({
      filename: 'database.db',
      driver: sqlite3.Database
    })
    const userRoles = await db.all(`SELECT * FROM UserRole WHERE id_role = ?`, [id_role]);
    return userRoles;
  }
}