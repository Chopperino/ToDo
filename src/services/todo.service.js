const todoRepository = require("../repositories/todo.repository");
const NotFoundError = require("../errors/NotFoundError");

exports.getAll = async (user_id, query) => {
  const {
    page,
    limit,
    title,
    completed,
    createdFrom,
    createdTo,
    orderBy
  } = query

  const skip = (page - 1) * limit;

  const filters = {
    userId: user_id,
    ...(title && { title: { contains: title, mode: "insensitive" } }),
    ...(completed !== undefined && { completed }),
    ...(createdFrom && createdTo && {
      createdAt: {
        gte: createdFrom,
        lte: createdTo,
      },
    }),
    ...(createdFrom && !createdTo && {
      createdAt: { gte: createdFrom},
    }),
    ...(!createdFrom && createdTo && {
      createdAt: { lte: createdTo },
    }),
  };

  const { todos, total } = await todoRepository.getAll(filters, skip, limit, orderBy);

  const totalPages = Math.ceil(total / limit);

  return {
    data: todos,
    meta: {
      total,
      page,
      limit,
      totalPages,
    }
  };
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