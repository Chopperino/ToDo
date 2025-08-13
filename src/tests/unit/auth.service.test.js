const userRepository = require('../../repositories/user.repository');
const authService = require('../../services/auth.service');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const ConflictError = require("../../errors/ConflictError");
const NotFoundError = require("../../errors/NotFoundError");
const BadRequestError = require("../../errors/BadRequestError");

jest.mock('../../repositories/user.repository');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('Auth Service', () => {
  beforeAll(() => {
    process.env.JWT_SECRET = "test-secret";
  });
  describe('register', () => {
      it('should create a new user and return a token', async () => {
        // Arrange
        const password = 'password'
        const hashedPassword = 'hashedPassword';
        const userInput = { email: 'user@example.com', password };
        const createdUser = {
          id: 1,
          ...userInput,
          password: hashedPassword,
          createdAt: '2025-07-12T14:06:33.248Z'
        };
        const token = 'jwt.token';

        userRepository.findByEmail.mockResolvedValue(null);
        bcrypt.hash.mockResolvedValue(hashedPassword);
        userRepository.create.mockResolvedValue(createdUser);
        jwt.sign.mockReturnValue(token);

        // Act
        const result = await authService.register(userInput);

        // Assert
        expect(userRepository.findByEmail).toHaveBeenCalledWith(userInput.email);
        expect(bcrypt.hash).toHaveBeenCalledWith(password, 10);
        expect(userRepository.create).toHaveBeenCalledWith({ ...userInput, password: hashedPassword });
        expect(jwt.sign).toHaveBeenCalledWith(
          { user_id: createdUser.id },
          'test-secret',
          { expiresIn: '1h' }
        );
        expect(result).toEqual({ token });
      });
      it('should throw ConflictError if user with such email exists', async () => {
        // Arrange
        const userInput = { email: 'user@test.com', password: 'password' };
        const existingUser = {
          id: 1,
          email: 'user@test.com',
          password: 'hashedPassword',
          createdAt: '2025-07-12T14:06:33.248Z'
        }

        userRepository.findByEmail.mockResolvedValue(existingUser);

        // Act + Assert
        await expect(authService.register(userInput)).rejects.toThrow(ConflictError);
        expect(userRepository.findByEmail).toHaveBeenCalledWith(userInput.email);
        expect(bcrypt.hash).not.toHaveBeenCalled();
        expect(userRepository.create).not.toHaveBeenCalled();
    })
  });
  describe('login', () => {
    it('should log in user and return token', async () => {
      // Arrange
      const email = 'user@test.com';
      const userInput = { email, password: 'password' };
      const existingUser = {
        id: 1,
        email,
        password: 'hashedPassword',
        createdAt: '2025-07-12T14:06:33.248Z'
      };
      const token = 'jwt.token';

      userRepository.findByEmail.mockResolvedValue(existingUser);
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue(token);

      // Act
      const result = await authService.login(userInput);

      // Assert
      expect(userRepository.findByEmail).toHaveBeenCalledWith(userInput.email);
      expect(bcrypt.compare).toHaveBeenCalledWith(userInput.password, existingUser.password);
      expect(jwt.sign).toHaveBeenCalledWith(
        { user_id: existingUser.id },
        'test-secret',
        { expiresIn: '1h'}
      );
      expect(result).toEqual({ token });
    });
    it('should throw NotFoundError if user with such email does not exist', async () => {
      // Arrange
      const userInput = { email: 'user@test.com', password: 'password' };

      userRepository.findByEmail.mockResolvedValue(null);

      // Act + Assert
      await expect(authService.login(userInput)).rejects.toThrow(NotFoundError);
      expect(userRepository.findByEmail).toHaveBeenCalledWith(userInput.email);
      expect(bcrypt.compare).not.toHaveBeenCalled();
      expect(jwt.sign).not.toHaveBeenCalled()
    });
    it('should throw BadRequestError if password is invalid', async () => {
      // Arrange
      const userInput = { email: 'user@test.com', password: 'password' };
      const existingUser = {
        id: 1,
        email: 'user@test.com',
        password: 'otherHashedPassword',
        createdAt: '2025-07-12T14:06:33.248Z'
      };

      userRepository.findByEmail.mockResolvedValue(existingUser);
      bcrypt.compare.mockResolvedValue(false);

      // Act + Assert
      await expect(authService.login(userInput)).rejects.toThrow(BadRequestError);
      expect(bcrypt.compare).toHaveBeenCalledWith(userInput.password, existingUser.password);
      expect(jwt.sign).not.toHaveBeenCalled();
    })
  });
});