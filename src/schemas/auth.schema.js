const {z} = require("zod");

exports.registerSchema = z.object({
  email: z.string({required_error: "Email is required"}).email({message: "Invalid email format"}),
  password: z.string({required_error: "Password is required"}).min(6, {message: "Password must contain at least 6 characters"})
});

exports.loginSchema = z.object({
  email: z.string({required_error: "Email is required"}).email({message: "Invalid email format"}),
  password: z.string({required_error: "Password is required"})
});