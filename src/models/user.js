export default class User {
    constructor(id, username, password, roles) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.roles = roles;
    }

    // Getters
    getId() { return this.id; }
    getUsername() { return this.username; }
    getPassword() { return this.password; }
    getRoles() { return this.roles; }

    // Setters
    setId(id) { this.id = id; }
    setUsername(username) { this.username = username; }
    setPassword(password) { this.password = password; }
    setRoles(roles) { this.roles = roles; }
}