const express = require("express");
const router = express.Router();
const {getAllTodos, getTodoById, postTodo, updateTodo, deleteTodo} = require("../controllers/todo.controller");
const validate = require("../middlewares/validation.middleware");
const { createTodoSchema, updateTodoSchema} = require("../validators/todo.schema")
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/", authMiddleware, getAllTodos);
router.get("/:todo_id", authMiddleware, getTodoById);
router.post("/", authMiddleware,validate(createTodoSchema) , postTodo);
router.patch("/:todo_id", authMiddleware,validate(updateTodoSchema), updateTodo);
router.delete("/:todo_id", authMiddleware, deleteTodo);

module.exports = router;