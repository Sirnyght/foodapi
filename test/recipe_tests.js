import { expect } from 'chai';
import RecipeDAO from '../src/database/DAOs/recipeDAO.js';
import RecipeRepository from '../src/database/repository/recipeRepository.js';
import Recipe from '../src/models/recipe.js';
import Ingredient from '../src/models/ingredient.js';

describe('RecipeDAO', function () {
    describe('#findAll()', function () {
      it('should return all recipes', async function () {
        // Arrange
        const recipeDAO = new RecipeDAO();
  
        // Act
        const result = await recipeDAO.findAll();
  
        // Assert
        expect(result).to.be.an('array');
        expect(result).to.have.lengthOf(3);
      });
    });
  
    describe('#findById()', function () {
      it('should return the recipe with the given id', async function () {
        // Arrange
        const recipeDAO = new RecipeDAO();
  
        // Act
        const result = await recipeDAO.findById(1);
  
        // Assert
        expect(result).to.be.an.instanceOf(Recipe);
        expect(result.getId()).to.equal(1);
        expect(result.getName()).to.equal('Irish Coffee');
        expect(result.getIngredients()).to.be.undefined;
      });
    });

    describe('#insert()', function () {
      it('should insert the given recipe in the database', async function () {
        // Arrange
        const recipeDAO = new RecipeDAO();
        const recipe = new Recipe(null, 'Test', 'Test');
  
        // Act
        await recipeDAO.insert(recipe);
        const result = await recipeDAO.findAll();
  
        // Assert
        expect(result).to.be.an('array');
        expect(result).to.have.lengthOf(4);
      });
    });

    describe('#update()', function () {
      it('should update the given recipe in the database', async function () {
        // Arrange
        const recipeDAO = new RecipeDAO();
        const recipe = new Recipe(4, 'Test', 'TOTO');
  
        // Act
        await recipeDAO.update(recipe);
        const result = await recipeDAO.findById(4);
  
        // Assert
        expect(result).to.be.an.instanceOf(Recipe);
        expect(result.getId()).to.equal(4);
        expect(result.getName()).to.equal('Test');
      });
    });

    describe('#delete()', function () {
      it('should delete the given recipe from the database', async function () {
        // Arrange
        const recipeDAO = new RecipeDAO();
        const recipe = new Recipe(4, 'Test', 'TOTO');
  
        // Act
        await recipeDAO.delete(recipe);
        const result = await recipeDAO.findAll();

        // Assert
        expect(result).to.be.an('array');
        expect(result).to.have.lengthOf(3);
        }
        );
    }
    );
});

describe('RecipeRepository', function () {
    describe('#findAll()', function () {
        it('should return all recipes', async function () {
        // Arrange
        const recipeRepository = new RecipeRepository();
    
        // Act
        const result = await recipeRepository.findAll();
    
        // Assert
        expect(result).to.be.an('array');
        expect(result).to.have.lengthOf(3);
        });
    });
    
    describe('#findById()', function () {
        it('should return the recipe with the given id', async function () {
        // Arrange
        const recipeRepository = new RecipeRepository();
    
        // Act
        const result = await recipeRepository.findById(1);
    
        // Assert
        expect(result).to.be.an.instanceOf(Recipe);
        expect(result.getId()).to.equal(1);
        expect(result.getName()).to.equal('Irish Coffee');
        expect(result.getIngredients()).to.be.an('array');
        expect(result.getIngredients()).to.have.lengthOf(3);
        });
    });
    
    describe('#insert()', function () {
        it('should insert the given recipe in the database', async function () {
        // Arrange
        const recipeRepository = new RecipeRepository();
        const recipe = new Recipe(null, 'Test', 'Test');
        const ingredients = [ new Ingredient(null, 'Test', 'Test', 'Test') ];
        recipe.setIngredients(ingredients);
    
        // Act
        await recipeRepository.insert(recipe);
        const result = await recipeRepository.findAll();
    
        // Assert
        expect(result).to.be.an('array');
        expect(result).to.have.lengthOf(4);
        });
    });
    
    describe('#update()', function () {
        it('should update the given recipe in the database', async function () {
        // Arrange
        const recipeRepository = new RecipeRepository();
        const recipe = new Recipe(5, 'Test', 'TOTO');

        const ingredients = [ new Ingredient(null, 'Test', 'Test', 'Test') ];
        recipe.setIngredients(ingredients);

        // Act
        await recipeRepository.update(recipe);
        const result = await recipeRepository.findById(5);
    
        // Assert
        expect(result).to.be.an.instanceOf(Recipe);
        expect(result.getId()).to.equal(5);
        expect(result.getName()).to.equal('Test');
        });
    });
    
    describe('#delete()', function () {
        it('should delete the given recipe from the database', async function () {
        // Arrange
        const recipeRepository = new RecipeRepository();
        const recipe = new Recipe(5, 'Test', 'TOTO');
    
        // Act
        await recipeRepository.delete(recipe);
        const result = await recipeRepository.findAll();
    
        // Assert
        expect(result).to.be.an('array');
        expect(result).to.have.lengthOf(3);
        }
        );
    }
    );
}
);