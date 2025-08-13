const todoService = require('../../services/todo.service');
const todoRepository = require('../../repositories/todo.repository');
const NotFoundError = require("../../errors/NotFoundError");

jest.mock('../../repositories/todo.repository');

describe('Todo Service', () => {
  describe('getAll', () => {
    it('should return todos without filters with meta data', async () => {
      // Arrange
      const user_id = 1;
      const query = { page: 1, limit: 10 };
      const mockTodos = [{
        id: 1,
        title: 'Test todo',
        completed: false,
        createdAt: '2025-07-12T14:06:33.248Z',
        userId: user_id
      }];

      todoRepository.getAll.mockResolvedValue({ todos: mockTodos, total: 1 });

      // Act
      const result = await todoService.getAll(user_id, query);

      // Assert
      expect(todoRepository.getAll).toHaveBeenCalledWith(
        { userId: user_id }, // where
        0, // skip
        10, // take
        undefined // orderBy
      );
      expect(result).toEqual({
        data: mockTodos,
        meta: {
          total: 1,
          page: 1,
          limit: 10,
          totalPages: 1
        }
      });
    });
    it('should return todos with filters with metadata', async () => {
      // Arrange
      const user_id = 1;
      const query = {
        page: 1,
        limit: 10,
        title: 'sp',
        completed: true,
        createdFrom: '2025-07-11T14:06:33.248Z',
        createdTo: '2025-07-13T14:06:33.248Z',
        orderBy: { field: 'completed', direction: 'desc' }
      };
      const mockTodos = [{
        id: 1,
        title: 'Special todo',
        completed: true,
        createdAt: '2025-07-12T14:06:33.248Z',
        userId: user_id
      }];

      todoRepository.getAll.mockResolvedValue({ todos: mockTodos, total: 1 });

      // Act
      const result = await todoService.getAll(user_id, query);

      // Assert
      expect(todoRepository.getAll).toHaveBeenCalledWith(
        // where
        {
          userId: user_id,
          title: {
            contains: query.title,
            mode: 'insensitive'
          },
          completed: query.completed,
          createdAt: {
            gte: query.createdFrom,
            lte: query.createdTo,
          },
        },
        0, // skip
        10, // take
        query.orderBy
      );
      expect(result).toEqual({
        data: mockTodos,
        meta: {
          total: 1,
          page: query.page,
          limit: query.limit,
          totalPages: 1
        }
      });
    });
  });

  describe('getById', () => {
    it('should return todo by its id', async () => {
      // Arrange
      const user_id = 1;
      const todo_id = 2;
      const mockTodo = {
        id: todo_id,
        title: 'Test todo',
        completed: false,
        createdAt: '2025-07-12T14:06:33.248Z',
        userId: user_id
      };

      todoRepository.getById.mockResolvedValue(mockTodo);

      // Act
      const result = await todoService.getById(user_id, todo_id);

      // Assert
      expect(todoRepository.getById).toHaveBeenCalledWith(todo_id);
      expect(result).toEqual(mockTodo);
    });
    it('should throw NotFoundError if todo does not exist', async () => {
      // Arrange
      const user_id = 1;
      const todo_id = 2;

      todoRepository.getById.mockResolvedValue(null);
      // Act + Assert
      await expect(todoService.getById(user_id, todo_id)).rejects.toThrow(NotFoundError);
      expect(todoRepository.getById).toHaveBeenCalledWith(todo_id);
    });
    it('should throw NotFoundError if todo belongs to another user', async () => {
      // Arrange
      const user_id = 1;
      const todo_id = 2;
      const mockTodo = {
        id: todo_id,
        title: 'Test todo',
        completed: false,
        createdAt: '2025-07-12T14:06:33.248Z',
        userId: 100
      };

      todoRepository.getById.mockResolvedValue(mockTodo);
      // Act + Assert
      await expect(todoService.getById(user_id, todo_id)).rejects.toThrow(NotFoundError);
      expect(todoRepository.getById).toHaveBeenCalledWith(todo_id);
    });
  });

  describe('create', () => {
    it('should return created todo', async () => {
      // Arrange
      const user_id = 1;
      const todo_id = 2;
      const title = 'Test todo';
      const completed = false;
      const mockTodo = {
        id: todo_id,
        title,
        completed,
        createdAt: '2025-07-12T14:06:33.248Z',
        userId: user_id
      };

      todoRepository.create.mockResolvedValue(mockTodo);

      // Act
      const result = await todoService.create(user_id, {title, completed});

      // Assert
      expect(todoRepository.create).toHaveBeenCalledWith(user_id, {title, completed});
      expect(result).toEqual(mockTodo);
    });
  });

  describe('update', () => {
    it('should return updated todo', async () => {
      // Arrange
      const user_id = 1;
      const todo_id = 2;
      const oldTitle = 'Test todo';
      const updatedTitle = 'Updated todo'
      const oldTodo = {
        id: todo_id,
        title: oldTitle,
        completed: false,
        createdAt: '2025-07-12T14:06:33.248Z',
        userId: user_id
      }
      const updatedTodo = {...oldTodo, title: updatedTitle};

      todoRepository.getById.mockResolvedValue(oldTodo)
      todoRepository.update.mockResolvedValue(updatedTodo);
      // Act
      const result = await todoService.update(user_id, todo_id, { title: updatedTitle });

      // Assert
      expect(todoRepository.getById).toHaveBeenCalledWith(todo_id);
      expect(todoRepository.update).toHaveBeenCalledWith(todo_id, { title: updatedTitle });
      expect(result).toEqual(updatedTodo);
    });
    it('should throw NotFoundError if todo does not exist', async () => {
      // Arrange
      const user_id = 1;
      const todo_id = 2;
      const title = 'Updated todo';

      todoRepository.getById.mockResolvedValue(null);
      // Act + Assert
      await expect(todoService.update(user_id, todo_id, { title })).rejects.toThrow(NotFoundError);
      expect(todoRepository.getById).toHaveBeenCalledWith(todo_id);
      expect(todoRepository.update).not.toHaveBeenCalled();
    });
    it('should throw NotFoundError if todo belongs to another user', async () => {
      // Arrange
      const user_id = 1;
      const todo_id = 2;
      const updatedTitle = 'Updated todo';
      const mockTodo = {
        id: todo_id,
        title: 'Test todo',
        completed: false,
        createdAt: '2025-07-12T14:06:33.248Z',
        userId: 100
      };

      todoRepository.getById.mockResolvedValue(mockTodo);
      // Act + Assert
      await expect(todoService.update(user_id, todo_id, { title: updatedTitle })).rejects.toThrow(NotFoundError);
      expect(todoRepository.getById).toHaveBeenCalledWith(todo_id);
      expect(todoRepository.delete).not.toHaveBeenCalled();
    });
  });

  describe('delete', () => {
    it('should return deleted todo', async () => {
      // Arrange
      const user_id = 1;
      const todo_id = 2;
      const mockTodo = {
        id: todo_id,
        title: 'Test todo',
        completed: false,
        createdAt: '2025-07-12T14:06:33.248Z',
        userId: user_id
      };
      todoRepository.getById.mockResolvedValue(mockTodo);
      todoRepository.delete.mockResolvedValue(mockTodo);
      // Act
      const result = await todoService.delete(user_id, todo_id);
      // Assert
      expect(todoRepository.getById).toHaveBeenCalledWith(todo_id);
      expect(todoRepository.delete).toHaveBeenCalledWith(todo_id);
      expect(result).toEqual(mockTodo);
    });
    it('should throw NotFoundError if todo does not exist', async () => {
      // Arrange
      const user_id = 1;
      const todo_id = 2;

      todoRepository.getById.mockResolvedValue(null)
      // Act + Assert
      await expect(todoService.delete(user_id, todo_id)).rejects.toThrow(NotFoundError);
      expect(todoRepository.getById).toHaveBeenCalledWith(todo_id);
      expect(todoRepository.delete).not.toHaveBeenCalled();
    });
    it('should throw NotFoundError if todo belongs to another user', async () => {
      // Arrange
      const user_id = 1;
      const todo_id = 2;
      const mockTodo = {
        id: todo_id,
        title: 'Test todo',
        completed: false,
        createdAt: '2025-07-12T14:06:33.248Z',
        userId: 100
      };

      todoRepository.getById.mockResolvedValue(mockTodo);
      // Act + Assert
      await expect(todoService.delete(user_id, todo_id)).rejects.toThrow(NotFoundError);
      expect(todoRepository.getById).toHaveBeenCalledWith(todo_id);
      expect(todoRepository.delete).not.toHaveBeenCalled();
    });
  });
});