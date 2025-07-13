const { PrismaClient } = require("../../generated/prisma")

const prisma = new PrismaClient();

exports.getAll = (user_id) => {
    return prisma.todo.findMany({
        where: {
            userId: user_id,
        },
    });
}

exports.getById = (todo_id) => {
    return prisma.todo.findFirst({
        where: {
            id: parseInt(todo_id),
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
            id: parseInt(todo_id),
        },
        data: todo,
    })
}

exports.delete = (todo_id) => {
    return prisma.todo.delete({
        where: {
            id: parseInt(todo_id),
        },
    })
}