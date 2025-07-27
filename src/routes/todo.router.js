const express = require("express");
const router = express.Router();
const {getAllTodos, getTodoById, postTodo, updateTodo, deleteTodo} = require("../controllers/todo.controller");
const validate = require("../middlewares/validation.middleware");
const {createTodoSchema, updateTodoSchema} = require("../validators/todo.schema")
const authMiddleware = require("../middlewares/auth.middleware");
const {createIdSchema} = require("../validators/params.schema");

const idParamName = "todo_id";

router.get("/",
  authMiddleware, 
  getAllTodos);

router.get("/:todo_id",
  authMiddleware,
  validate({
    params: createIdSchema(idParamName)
  }),
  getTodoById);

router.post("/",
  authMiddleware,
  validate({
    body: createTodoSchema
  }),
  postTodo);

router.patch("/:todo_id",
  authMiddleware,
  validate({
    params: createIdSchema(idParamName),
    body: updateTodoSchema
  }),
  updateTodo);

router.delete("/:todo_id",
  authMiddleware,
  validate({
    params: createIdSchema(idParamName)
  }),
  deleteTodo);

module.exports = router;