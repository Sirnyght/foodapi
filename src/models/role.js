export default class Role {
	constructor(id, name) {
		this.id = id;
		this.name = name;
	}

	// Getters
	getId() { return this.id; }
	getName() { return this.name; }

	// Setters
	setId(id) { this.id = id; }
	setName(name) { this.name = name; }
}
