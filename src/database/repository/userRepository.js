import UserDAO from "../DAOs/userDAO.js";
import RoleDAO from "../DAOs/roleDAO.js";
import UserRoleDAO from "../DAOs/userRoleDAO.js";
import { comparePasswordWithHash } from "../../utils/security.js";
// import RefreshTokenDAO from "../DAOs/refreshTokenDAO.js";

export default class UserRepository {
  constructor() {
    this.userDAO = new UserDAO();
    this.roleDAO = new RoleDAO();
    this.userRoleDAO = new UserRoleDAO();
  }

  async insert(user) {
    await this.userDAO.insert(user);
    // get id of newly inserted user
    const users = await this.userDAO.findAll();
    const id = users[users.length - 1].getId();
    user.setId(id);

    for (const role of user.getRoles()) {
      await this.userRoleDAO.insert(user.getId(), role.getId());
    }
  }

  async update(user) {
    await this.userDAO.update(user);

      // Check if we are adding or removing a role from the user. 
      // If the new user has a role that the old user didn't have, add it to the database.
      // If the old user had a role that the new user doesn't have, remove it from the database.
      // If the user has the same roles as before, do nothing.
      const oldUserRoles = await this.userRoleDAO.findByIdUser(user.getId());

      for (const oldUserRole of oldUserRoles) {
        if (!user.getRoles().includes(oldUserRole.id_role)) {
          await this.userRoleDAO.delete(user.getId(), oldUserRole.id_role);
        }
      }

      for (const role of user.getRoles()) {
        if (!oldUserRoles.includes(role.getId())) {
          await this.userRoleDAO.insert(user.getId(), role.getId());
        }
      }
  }

  async delete(user) {
    await this.userDAO.delete(user);

    // get all roles of user
    const userRoles = await this.userRoleDAO.findByIdUser(user.getId());
    for (const userRole of userRoles) {
      // delete userRole from database
      await this.userRoleDAO.delete(userRole.id_user, userRole.id_role);
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
    const users = await this.userDAO.findAll();

    for (const user of users) {
      if (user.getUsername() === username) {
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

  async findByUsernameAndPassword(username, password) {
    const users = await this.userDAO.findAll();

    for (const user of users) {
      if (user.getUsername() === username && comparePasswordWithHash(password, user.getPassword())) {
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
}
