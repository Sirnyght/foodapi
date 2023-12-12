import { expect } from 'chai';
import UserDAO from '../src/database/DAOs/userDAO.js';
import UserRepository from '../src/database/repository/userRepository.js';
import User from '../src/models/user.js';
import Role from '../src/models/role.js';

describe('UserDAO', function () {
    describe('#findAll()', function () {
      it('should return all users', async function () {
        // Arrange
        const userDAO = new UserDAO();
  
        // Act
        const result = await userDAO.findAll();
  
        // Assert
        expect(result).to.be.an('array');
        expect(result).to.have.lengthOf(2);
      });
    });
  
    describe('#findById()', function () {
      it('should return the user with the given id', async function () {
        // Arrange
        const userDAO = new UserDAO();
  
        // Act
        const result = await userDAO.findById(1);
  
        // Assert
        expect(result).to.be.an.instanceOf(User);
        expect(result.getId()).to.equal(1);
        expect(result.getUsername()).to.equal('admin');
        expect(result.getPassword()).to.equal('admin');
        expect(result.getRoles()).to.be.undefined;
      });
    });

    describe('#insert()', function () {
      it('should insert the given user in the database', async function () {
        // Arrange
        const userDAO = new UserDAO();
        const user = new User(null, 'Test', 'Test', [new Role(1, 'admin')]);
  
        // Act
        await userDAO.insert(user);
        const result = await userDAO.findAll();
  
        // Assert
        expect(result).to.be.an('array');
        expect(result).to.have.lengthOf(3);
      });
    });

    describe('#update()', function () {
      it('should update the given user in the database', async function () {
        // Arrange
        const userDAO = new UserDAO();
        const user = new User(3, 'Test', 'TOTO', [new Role(1, 'admin')]);
  
        // Act
        await userDAO.update(user);
        const result = await userDAO.findById(3);
  
        // Assert
        expect(result).to.be.an.instanceOf(User);
        expect(result.getId()).to.equal(3);
        expect(result.getUsername()).to.equal('Test');
        expect(result.getPassword()).to.equal('TOTO');
        expect(result.getRoles()).to.be.undefined;
      });
    });

    describe('#delete()', function () {
      it('should delete the given user from the database', async function () {
        // Arrange
        const userDAO = new UserDAO();
        const user = new User(3, 'Test', 'TOTO', [new Role(1, 'admin')]);

        // Act
        await userDAO.delete(user);
        const result = await userDAO.findAll();

        // Assert
        expect(result).to.be.an('array');
        expect(result).to.have.lengthOf(2);
      });
    });
});

describe('UserRepository', function () {
  describe('#findAll()', function () {
    it('should return all users', async function () {
      // Arrange
      const userRepository = new UserRepository();

      // Act
      const result = await userRepository.findAll();

      // Assert
      expect(result).to.be.an('array');
      expect(result).to.have.lengthOf(2);
    });
  });

  describe('#findById()', function () {
    it('should return the user with the given id', async function () {
      // Arrange
      const userRepository = new UserRepository();

      // Act
      const result = await userRepository.findById(1);

      // Assert
      expect(result).to.be.an.instanceOf(User);
      expect(result.getId()).to.equal(1);
      expect(result.getUsername()).to.equal('admin');
      expect(result.getPassword()).to.equal('admin');
      expect(result.getRoles()).to.be.an('array');
      expect(result.getRoles()).to.have.lengthOf(1);
      expect(result.getRoles()[0]).to.be.an.instanceOf(Role);
      expect(result.getRoles()[0].getId()).to.equal(1);
      expect(result.getRoles()[0].getName()).to.equal('admin');
    });
  });

  describe('#findByUsername()', function () {
    it('should return the user with the given username', async function () {
      // Arrange
      const userRepository = new UserRepository();

      // Act
      const result = await userRepository.findByUsername('admin');

      // Assert
      expect(result).to.be.an.instanceOf(User);
      expect(result.getId()).to.equal(1);
      expect(result.getUsername()).to.equal('admin');
      expect(result.getPassword()).to.equal('admin');
      expect(result.getRoles()).to.be.an('array');
      expect(result.getRoles()).to.have.lengthOf(1);
      expect(result.getRoles()[0]).to.be.an.instanceOf(Role);
      expect(result.getRoles()[0].getId()).to.equal(1);
      expect(result.getRoles()[0].getName()).to.equal('admin');
    });
  });

  describe('#findByUsernameAndPassword()', function () {
    it('should return the user with the given username and password', async function () {
      // Arrange
      const userRepository = new UserRepository();

      // Act
      const result = await userRepository.findByUsernameAndPassword('admin', 'admin');

      // Assert
      expect(result).to.be.an.instanceOf(User);
      expect(result.getId()).to.equal(1);
      expect(result.getUsername()).to.equal('admin');
      expect(result.getPassword()).to.equal('admin');
      expect(result.getRoles()).to.be.an('array');
      expect(result.getRoles()).to.have.lengthOf(1);
      expect(result.getRoles()[0]).to.be.an.instanceOf(Role);
      expect(result.getRoles()[0].getId()).to.equal(1);
      expect(result.getRoles()[0].getName()).to.equal('admin');
    });
  });

  describe('#insert()', function () {
    it('should insert the given user in the database', async function () {
      // Arrange
      const userRepository = new UserRepository();
      const user = new User(null, 'Test', 'Test', [new Role(1, 'admin')]);

      // Act
      await userRepository.insert(user);
      const result = await userRepository.findAll();

      // Assert
      expect(result).to.be.an('array');
      expect(result).to.have.lengthOf(3);
    }
  );

    it('should insert the given user with roles in the database', async function () {
      // Arrange
      const userRepository = new UserRepository();
      const user = new User(null, 'Test', 'Test', [new Role(1, 'admin'), new Role(2, 'user')]);

      // Act
      await userRepository.insert(user);
      const result = await userRepository.findAll();

      // Assert
      expect(result).to.be.an('array');
      expect(result).to.have.lengthOf(4);
    });
  });

  describe('#update()', function () {
    it('should update the given user in the database', async function () {
      // Arrange
      const userRepository = new UserRepository();
      const user = new User(5, 'Test', 'TOTO', [new Role(1, 'admin')]);

      // Act
      await userRepository.update(user);
      const result = await userRepository.findById(5);

      // Assert
      expect(result).to.be.an.instanceOf(User);
      expect(result.getId()).to.equal(5);
      expect(result.getUsername()).to.equal('Test');
      expect(result.getPassword()).to.equal('TOTO');
      expect(result.getRoles()).to.be.an('array');
      expect(result.getRoles()).to.have.lengthOf(1);
      expect(result.getRoles()[0]).to.be.an.instanceOf(Role);
      expect(result.getRoles()[0].getId()).to.equal(1);
      expect(result.getRoles()[0].getName()).to.equal('admin');
    });
  });

  describe('#delete()', function () {
    it('should delete the given user from the database', async function () {
      // Arrange
      const userRepository = new UserRepository();
      const user = new User(5, 'Test', 'TOTO', [new Role(1, 'admin')]);

      // Act
      await userRepository.delete(user);
      const result = await userRepository.findAll();

      // Assert
      expect(result).to.be.an('array');
      // There should be one leftover user from the tests
      expect(result).to.have.lengthOf(3);
    });
  });
});

