const { z } = require("zod");

exports.createTodoSchema = z.object({
    title: z
        .string({ required_error: "\"title\" is required"})
        .min(1, "\"title\" can not be empty"),
    completed: z
        .boolean()
        .optional(),
});

exports.updateTodoSchema = z.object({
    title: z
        .string()
        .min(1, "\"title\" can not be empty")
        .optional(),
    completed: z
        .boolean()
        .optional(),
});