import RoleDAO from "../DAOs/roleDAO.js";
import UserRoleDAO from "../DAOs/userRoleDAO.js";

export default class RoleRepository {
  constructor() {
    this.roleDAO = new RoleDAO();
    this.userRoleDAO = new UserRoleDAO();
  }

  async insert(role) {
    await this.roleDAO.insert(role);
  }

  async update(role) {
    await this.roleDAO.update(role);
  }

  async delete(role) {
    await this.roleDAO.delete(role);
  }

  async findAll() {
    const roles = await this.roleDAO.findAll();
    return roles;
  }

  async findById(id) {
    const role = await this.roleDAO.findById(id);
    return role;
  }

  // Method added to follow business logic
  async findByNames(names) {
    const roles = await this.roleDAO.findAll();
    const rolesToReturn = [];
    for (const role of roles) {
      if (names.includes(role.name)) {
        rolesToReturn.push(role);
      }
    }
    return rolesToReturn;
  }

  async findByUser(id_user) {
    const userRoles = await this.userRoleDAO.findByIdUser(id_user);
    const roles = [];
    for (const userRole of userRoles) {
      const role = await this.roleDAO.findById(userRole.id_role);
      roles.push(role);
    }
    return roles;
  }

}