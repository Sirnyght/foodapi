import { expect } from 'chai';
import RoleDAO from '../src/database/DAOs/roleDAO.js';
import RoleRepository from '../src/database/repository/roleRepository.js';
import Role from '../src/models/role.js';

describe('RoleDAO', function () {
    describe('#findAll()', function () {
      it('should return all roles', async function () {
        // Arrange
        const roleDAO = new RoleDAO();
  
        // Act
        const result = await roleDAO.findAll();
  
        // Assert
        expect(result).to.be.an('array');
        expect(result).to.have.lengthOf(2);
      });
    });
  
    describe('#findById()', function () {
      it('should return the role with the given id', async function () {
        // Arrange
        const roleDAO = new RoleDAO();
  
        // Act
        const result = await roleDAO.findById(1);
  
        // Assert
        expect(result).to.be.an.instanceOf(Role);
        expect(result.getId()).to.equal(1);
        expect(result.getName()).to.equal('admin');
      });
    });

    describe('#insert()', function () {
      it('should insert the given role in the database', async function () {
        // Arrange
        const roleDAO = new RoleDAO();
        const role = new Role(null, 'Test');
  
        // Act
        await roleDAO.insert(role);
        const result = await roleDAO.findAll();
  
        // Assert
        expect(result).to.be.an('array');
        expect(result).to.have.lengthOf(3);
      });
    });

    describe('#update()', function () {
      it('should update the given role in the database', async function () {
        // Arrange
        const roleDAO = new RoleDAO();
        const role = new Role(3, 'Test');
  
        // Act
        await roleDAO.update(role);
        const result = await roleDAO.findById(3);
  
        // Assert
        expect(result).to.be.an.instanceOf(Role);
        expect(result.getId()).to.equal(3);
        expect(result.getName()).to.equal('Test');
      });
    });

    describe('#delete()', function () {
      it('should delete the given role in the database', async function () {
        // Arrange
        const roleDAO = new RoleDAO();
        const role = new Role(3, 'Test');
  
        // Act
        await roleDAO.delete(role);
        const result = await roleDAO.findAll();
  
        // Assert
        expect(result).to.be.an('array');
        expect(result).to.have.lengthOf(2);
      });
    });
});

describe('RoleRepository', function () {
  describe('#findAll()', function () {
    it('should return all roles', async function () {
      // Arrange
      const roleRepository = new RoleRepository();
  
      // Act
      const result = await roleRepository.findAll();
  
      // Assert
      expect(result).to.be.an('array');
      expect(result).to.have.lengthOf(2);
    });
  });

  describe('#findById()', function () {
    it('should return the role with the given id', async function () {
      // Arrange
      const roleRepository = new RoleRepository();
  
      // Act
      const result = await roleRepository.findById(1);
  
      // Assert
      expect(result).to.be.an.instanceOf(Role);
      expect(result.getId()).to.equal(1);
      expect(result.getName()).to.equal('admin');
    });
  });

  describe('#insert()', function () {
    it('should insert the given role in the database', async function () {
      // Arrange
      const roleRepository = new RoleRepository();
      const role = new Role(null, 'Test');
  
      // Act
      await roleRepository.insert(role);
      const result = await roleRepository.findAll();
  
      // Assert
      expect(result).to.be.an('array');
      expect(result).to.have.lengthOf(3);
    });
  });

  describe('#update()', function () {
    it('should update the given role in the database', async function () {
      // Arrange
      const roleRepository = new RoleRepository();
      const role = new Role(4, 'Test');
  
      // Act
      await roleRepository.update(role);
      const result = await roleRepository.findById(4);
  
      // Assert
      expect(result).to.be.an.instanceOf(Role);
      expect(result.getId()).to.equal(4);
      expect(result.getName()).to.equal('Test');
    });
  });

  describe('#delete()', function () {
    it('should delete the given role in the database', async function () {
      // Arrange
      const roleRepository = new RoleRepository();
      const role = new Role(4, 'Test');
  
      // Act
      await roleRepository.delete(role);
      const result = await roleRepository.findAll();
  
      // Assert
      expect(result).to.be.an('array');
      expect(result).to.have.lengthOf(2);
    });
  });
});