const {PrismaClient} = require("../../generated/prisma");
const prisma = new PrismaClient();

exports.create = (user) => {
  return prisma.user.create({
    data: user,
  })
}

exports.findById = (user_id) => {
  return prisma.user.findUnique({
    where: {
      id: user_id,
    },
  })
}

exports.findByEmail = (email) => {
  return prisma.user.findUnique({
    where: {
      email,
    },
  })
}

exports.update = (user_id, user) => {
  return prisma.user.update({
    where: {
      id: user_id,
    },
    data: user,
  })
}

exports.delete = (user_id) => {
  return prisma.user.delete({
    where: {
      id: user_id,
    },
  })
}