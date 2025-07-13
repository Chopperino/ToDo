const todoService = require("../services/todo.service");

exports.getAllTodos = async (req, res) => {
    const { user_id } = req.user;
    const result = await todoService.getAll(user_id);

    res.status(200).json(result);
}

exports.getTodoById = async (req, res) => {
    const { user_id } = req.user;
    const { todo_id } = req.params;
    const result = await todoService.getById(user_id, todo_id);

    res.status(201).json(result);
}

exports.postTodo = async (req, res) => {
    const { user_id } = req.user;
    const todo = req.body;
    const result = await todoService.create(user_id, todo);

    res.status(200).json(result);
}

exports.updateTodo = async (req, res) => {
    const { user_id } = req.user;
    const { todo_id } = req.params;
    const todo = req.body;
    const result = await todoService.update(user_id, todo_id, todo);

    res.status(200).json(result)
}

exports.deleteTodo = async (req, res) => {
    const { user_id } = req.user;
    const { todo_id } = req.params;
    const result = await todoService.delete(user_id, todo_id);

    res.status(200).json(result);
}