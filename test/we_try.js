import { expect } from 'chai';

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
