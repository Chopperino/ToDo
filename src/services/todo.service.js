const todoRepository = require("../repositories/todo.repository");
const NotFoundError = require("../errors/NotFoundError");

exports.getAll = (user_id) => {
    return todoRepository.getAll(user_id);
}

exports.getById = async (user_id, todo_id) => {
    const existingTodo = await returnTodoOrNotFound(user_id, todo_id)
    return existingTodo;
}

exports.create = (user_id, todo) => {
    return todoRepository.create(user_id, todo);
}

exports.update = async (user_id, todo_id, todo) => {
    await returnTodoOrNotFound(user_id, todo_id);
    return todoRepository.update(todo_id, todo);
}

exports.delete = async (user_id, todo_id) => {
    await returnTodoOrNotFound(user_id, todo_id);
    return todoRepository.delete(todo_id);
}

async function returnTodoOrNotFound(user_id, todo_id) {
    const existingTodo = await todoRepository.getById(todo_id);
    if (!existingTodo || (existingTodo.userId !== user_id)) {
        throw new NotFoundError(`Todo with id=${todo_id} not found`);
    }
    return existingTodo;
}