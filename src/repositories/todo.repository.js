const {PrismaClient} = require("../../generated/prisma")

const prisma = new PrismaClient();

exports.getAll = async (where, skip, take, orderBy) => {
  const [todos, total] = await Promise.all([
    prisma.todo.findMany({
      where,
      skip,
      take,
      orderBy: {
        [orderBy.field]: orderBy.direction,
      },
    }),
    prisma.todo.count({
      where,
    }),
  ]);

  return { todos, total };
}

exports.getById = (todo_id) => {
  return prisma.todo.findFirst({
    where: {
      id: todo_id,
    },
  })
}

exports.create = (user_id, {title, completed = false}) => {
  return prisma.todo.create({
    data: {
      title,
      completed,
      user: {
        connect: {
          id: user_id
        }
      }
    },
  })
}

exports.update = (todo_id, todo) => {
  return prisma.todo.update({
    where: {
      id: todo_id,
    },
    data: todo,
  })
}

exports.delete = (todo_id) => {
  return prisma.todo.delete({
    where: {
      id: todo_id,
    },
  })
}