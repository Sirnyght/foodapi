import { expect } from 'chai';
import IngredientDAO from '../src/database/DAOs/ingredientDAO.js';
import Ingredient from '../src/models/ingredient.js';

describe('Array', function () {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      // Arrange
      const array = [1, 2, 3];
      const value = 4;

      // Act
      const result = array.indexOf(value);

      // Assert
      expect(result).to.equal(-1);
    });
  });
});

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
      expect(result.getQuantity()).to.equal('5cl');
    });
  });
});