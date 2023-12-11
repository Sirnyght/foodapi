export default class Ingredient {
    constructor(id, name, type, quantity) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.quantity = quantity;
    }

    // Getters
    getId() { return this.id; }
    getName() { return this.name; }
    getType() { return this.type; }
    getQuantity() { return this.quantity; }

    // Setters
    setId(id) { this.id = id; }
    setName(name) { this.name = name; }
    setType(type) { this.type = type; }
    setQuantity(quantity) { this.quantity = quantity; }
} 
