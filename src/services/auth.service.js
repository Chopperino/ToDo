const userRepository = require("../repositories/user.repository");
const bcrypt = require("bcrypt");
const ConflictError = require("../errors/ConflictError");
const NotFoundError = require("../errors/NotFoundError");
const jwt = require("jsonwebtoken");
const BadRequestError = require("../errors/BadRequestError");

exports.register = async (user) => {
  const existingUser = await userRepository.findByEmail(user.email);
  if (existingUser) {
    throw new ConflictError(`User with email=${user.email} already exists`)
  }

  user.password = await bcrypt.hash(user.password, 10);
  const createdUser = await userRepository.create(user);

  const token = jwt.sign({user_id: createdUser.id}, process.env.JWT_SECRET, {expiresIn: "1h"});
  return {token};
}

exports.login = async (user) => {
  const existingUser = await userRepository.findByEmail(user.email);
  if (!existingUser) {
    throw new NotFoundError(`User with email=${user.email} not found`)
  }

  const isMatch = await bcrypt.compare(user.password, existingUser.password);
  if (!isMatch) {
    throw new BadRequestError("Invalid password");
  }

  const token = jwt.sign({user_id: existingUser.id}, process.env.JWT_SECRET, {expiresIn: "1h"});
  return {token};
}

exports.delete = async (user_id) => {
  const existingUser = await userRepository.findById(user_id);
  if (!existingUser) {
    throw new NotFoundError(`User with id=${user_id} not found`)
  }

  return userRepository.delete(user_id)
}
