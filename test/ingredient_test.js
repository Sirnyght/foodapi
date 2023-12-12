import { expect } from 'chai';
import IngredientDAO from '../src/database/DAOs/ingredientDAO.js';
import IngredientRepository from '../src/database/repository/ingredientRepository.js';
import Ingredient from '../src/models/ingredient.js';

describe('IngredientDAO', function () {
    describe('#findAll()', function () {
      it('should return all ingredients', async function () {
        // Arrange
        const ingredientDAO = new IngredientDAO();
  
        // Act
        const result = await ingredientDAO.findAll();
  
        // Assert
        expect(result).to.be.an('array');
        expect(result).to.have.lengthOf(11);
      });
    });
  
    describe('#findById()', function () {
      it('should return the ingredient with the given id', async function () {
        // Arrange
        const ingredientDAO = new IngredientDAO();
  
        // Act
        const result = await ingredientDAO.findById(1);
  
        // Assert
        expect(result).to.be.an.instanceOf(Ingredient);
        expect(result.getId()).to.equal(1);
        expect(result.getName()).to.equal('Whiskey');
        expect(result.getType()).to.equal('Alcohol');
        expect(result.getQuantity()).to.be.undefined;
      });
    });

    describe('#insert()', function () {
      it('should insert the given ingredient in the database', async function () {
        // Arrange
        const ingredientDAO = new IngredientDAO();
        const ingredient = new Ingredient(null, 'Test', 'Test');
  
        // Act
        await ingredientDAO.insert(ingredient);
        const result = await ingredientDAO.findAll();
  
        // Assert
        expect(result).to.be.an('array');
        expect(result).to.have.lengthOf(12);
      });
    });

    describe('#update()', function () {
      it('should update the given ingredient in the database', async function () {
        // Arrange
        const ingredientDAO = new IngredientDAO();
        const ingredient = new Ingredient(12, 'Test', 'TOTO');
  
        // Act
        await ingredientDAO.update(ingredient);
        const result = await ingredientDAO.findById(12);
  
        // Assert
        expect(result).to.be.an.instanceOf(Ingredient);
        expect(result.getId()).to.equal(12);
        expect(result.getName()).to.equal('Test');
        expect(result.getType()).to.equal('TOTO');
        expect(result.getQuantity()).to.be.undefined;
      });
    });

    describe('#delete()', function () {
      it('should delete the given ingredient in the database', async function () {
        // Arrange
        const ingredientDAO = new IngredientDAO();
        const ingredient = new Ingredient(12, 'Test', 'TOTO');
  
        // Act
        await ingredientDAO.delete(ingredient);
        const result = await ingredientDAO.findAll();
  
        // Assert
        expect(result).to.be.an('array');
        expect(result).to.have.lengthOf(11);
      });
    });
  });

  
describe('IngredientRepository', function () {
    describe('#findAll()', function () {
        it('should return all ingredients', async function () {
        // Arrange
        const ingredientRepository = new IngredientRepository();
    
        // Act
        const result = await ingredientRepository.findAll();
    
        // Assert
        expect(result).to.be.an('array');
        expect(result).to.have.lengthOf(11);
        });
    });
    
    describe('#findById()', function () {
        it('should return the ingredient with the given id', async function () {
        // Arrange
        const ingredientRepository = new IngredientRepository();
    
        // Act
        const result = await ingredientRepository.findById(1);
    
        // Assert
        expect(result).to.be.an.instanceOf(Ingredient);
        expect(result.getId()).to.equal(1);
        expect(result.getName()).to.equal('Whiskey');
        expect(result.getType()).to.equal('Alcohol');
        expect(result.getQuantity()).to.be.undefined;
        });
    });
    
    describe('#insert()', function () {
        it('should insert the given ingredient in the database', async function () {
        // Arrange
        const ingredientRepository = new IngredientRepository();
        const ingredient = new Ingredient(null, 'Test', 'Test');
    
        // Act
        await ingredientRepository.insert(ingredient);
        const result = await ingredientRepository.findAll();
    
        // Assert
        expect(result).to.be.an('array');
        expect(result).to.have.lengthOf(12);
        });
    });
    
    describe('#update()', function () {
        it('should update the given ingredient in the database', async function () {
        // Arrange
        const ingredientRepository = new IngredientRepository();
        const ingredient = new Ingredient(13, 'Test', 'TOTO');
    
        // Act
        await ingredientRepository.update(ingredient);
        const result = await ingredientRepository.findById(13);
    
        // Assert
        expect(result).to.be.an.instanceOf(Ingredient);
        expect(result.getId()).to.equal(13);
        expect(result.getName()).to.equal('Test');
        expect(result.getType()).to.equal('TOTO');
        expect(result.getQuantity()).to.be.undefined;
        });
    });
    
    describe('#delete()', function () {
        it('should delete the given ingredient in the database', async function () {
        // Arrange
        const ingredientRepository = new IngredientRepository();
        const ingredient = new Ingredient(13, 'Test', 'TOTO');
    
        // Act
        await ingredientRepository.delete(ingredient);
        const result = await ingredientRepository.findAll();

        // Assert
        expect(result).to.be.an('array');
        expect(result).to.have.lengthOf(11);
        }
        );
    }
    );
    });