export default class Recipe {
    constructor(id, name, type, ingredients) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.ingredients = ingredients;
    }

    // Getters
    getId() { return this.id; }
    getName() { return this.name; }
    getType() { return this.type; }
    getIngredients() { return this.ingredients; }

    // Setters
    setId(id) { this.id = id; }
    setName(name) { this.name = name; }
    setType(type) { this.type = type; }
    setIngredients(ingredients) { this.ingredients = ingredients; }
}
