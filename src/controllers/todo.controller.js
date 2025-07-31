const todoService = require("../services/todo.service");
const {paginationQuerySchema} = require("../schemas/query.schema");

exports.getAllTodos = async (req, res) => {
  const {user_id} = req.user;
  const {page, limit} = req.validated.query;

  const result = await todoService.getAll(user_id, page, limit);

  res.status(200).json(result);
}

exports.getTodoById = async (req, res) => {
  const {user_id} = req.user;
  const {todo_id} = req.validated.params;
  const result = await todoService.getById(user_id, todo_id);

  res.status(201).json(result);
}

exports.postTodo = async (req, res) => {
  const {user_id} = req.user;
  const todo = req.validated.body;
  const result = await todoService.create(user_id, todo);

  res.status(200).json(result);
}

exports.updateTodo = async (req, res) => {
  const {user_id} = req.user;
  const {todo_id} = req.validated.params;
  const todo = req.validated.body;
  const result = await todoService.update(user_id, todo_id, todo);

  res.status(200).json(result)
}

exports.deleteTodo = async (req, res) => {
  const {user_id} = req.user;
  const {todo_id} = req.validated.params;
  const result = await todoService.delete(user_id, todo_id);

  res.status(200).json(result);
}