import UserDAO from "../DAOs/userDAO.js";
import RoleDAO from "../DAOs/roleDAO.js";
import UserRoleDAO from "../DAOs/userRoleDAO.js";
// import RefreshTokenDAO from "../DAOs/refreshTokenDAO.js";

export default class UserRepository {
  constructor() {
    this.userDAO = new UserDAO();
    this.roleDAO = new RoleDAO();
    this.userRoleDAO = new UserRoleDAO();
  }

  async insert(user) {
    await this.userDAO.insert(user);

    for (const role of user.getRoles()) {
      await this.roleDAO.insert(role);
      await this.userRoleDAO.insert(user.getId(), role.getId());
    }
  }

  async update(user) {
    await this.userDAO.update(user);

    for (const role of user.getRoles()) {
      await this.roleDAO.update(role);
      await this.userRoleDAO.update(user.getId(), role.getId());
    }
  }

  async delete(user) {
    await this.userDAO.delete(user);

    for (const role of user.getRoles()) {
      await this.roleDAO.delete(role);
      await this.userRoleDAO.delete(user.getId(), role.getId());
    }
  }

  async findAll() {
    const users = await this.userDAO.findAll();

    for (const user of users) {
      const userRoles = await this.userRoleDAO.findByIdUser(user.getId());
      const roles = [];
      for (const userRole of userRoles) {
        const role = await this.roleDAO.findById(userRole.id_role);
        roles.push(role);
      }
      user.setRoles(roles);
    }
    return users;
  }

  async findById(id) {
    const user = await this.userDAO.findById(id);
    const userRoles = await this.userRoleDAO.findByIdUser(user.getId());
    const roles = [];
    for (const userRole of userRoles) {
      const role = await this.roleDAO.findById(userRole.id_role);
      roles.push(role);
    }
    user.setRoles(roles);
    return user;
  }

  async findByUsername(username) {
    const user = await this.userDAO.findByUsername(username);

    const userRoles = await this.userRoleDAO.findByIdUser(user.getId());
    const roles = [];
    for (const userRole of userRoles) {
      const role = await this.roleDAO.findById(userRole.id_role);
      roles.push(role);
    }
    user.setRoles(roles);
    return user;
  }

  async findByUsernameAndPassword(username, password) {
    const users = await this.userDAO.findAll();
    for (const user of users) {
      if (user.getUsername() === username && user.getPassword() === password) {
        const userRoles = await this.userRoleDAO.findByIdUser(user.getId());
        const roles = [];
        for (const userRole of userRoles) {
          const role = await this.roleDAO.findById(userRole.id_role);
          roles.push(role);
        }
        user.setRoles(roles);
        return user;
      }
    }
  }

  async findByRole(id_role) {
    const userRoles = await this.userRoleDAO.findByIdRole(id_role);
    const users = [];
    for (const userRole of userRoles) {
      const user = await this.userDAO.findById(userRole.id_user);
      users.push(user);
    }
    return users;
  }

  async findByRoleName(name) {
    const role = await this.roleDAO.findByName(name);
    const userRoles = await this.userRoleDAO.findByIdRole(role.getId());
    const users = [];
    for (const userRole of userRoles) {
      const user = await this.userDAO.findById(userRole.id_user);
      users.push(user);
    }
    return users;
  }
}
