import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import Role from '../../models/role.js';

export default class RoleDAO {
  async insert(role) {
    const db = await open({
      filename: 'database.db',
      driver: sqlite3.Database
    })
    await db.run(`INSERT INTO Role (name) VALUES (?)`, [role.getName()]);
  }

  async update(role) {
    const db = await open({
      filename: 'database.db',
      driver: sqlite3.Database
    })
    await db.run(`UPDATE Role SET name = ? WHERE id_role = ?`, [role.getName(), role.getId()]);
  }

  async delete(role) {
    const db = await open({
      filename: 'database.db',
      driver: sqlite3.Database
    })
    await db.run(`DELETE FROM Role WHERE id_role = ?`, [role.getId()]);
  }

  async findAll() {
    const db = await open({
      filename: 'database.db',
      driver: sqlite3.Database
    })
    const roles = await db.all(`SELECT * FROM Role`);
    return roles.map((role) => new Role(role.id_role, role.name));
  }

  async findById(id) {
    const db = await open({
      filename: 'database.db',
      driver: sqlite3.Database
    })
    const role = await db.get(`SELECT * FROM Role WHERE id_role = ?`, [id]);
    return new Role(role.id_role, role.name);
  }
}