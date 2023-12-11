export default class RefreshToken {
  constructor(id, userId, token) {
    this.id = id;
    this.userId = userId;
    this.token = token;
  }

  // Getters
  getId() { return this.id; }
  getUserId() { return this.userId; }
  getToken() { return this.token; }

  // Setters
  setId(id) { this.id = id; }
  setUserId(userId) { this.userId = userId; }
  setToken(token) { this.token = token; }
}