const authService = require("../services/auth.service");

exports.registerUser = async (req, res) => {
  const user = req.validated.body;
  const result = await authService.register(user);
  res.status(201).json(result);
}

exports.loginUser = async (req, res) => {
  const user = req.validated.body;
  const result = await authService.login(user);
  res.status(200).json(result);
}

exports.deleteUser = async (req, res) => {
  const {user_id} = req.user;
  const result = await authService.delete(user_id);
  res.status(200).json(result);
}