const express = require("express");
const router = express.Router();
const {registerUser, loginUser, deleteUser} = require("../controllers/auth.controller");
const validate = require("../middlewares/validation.middleware")
const {registerSchema, loginSchema} = require("../schemas/auth.schema");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/register",
  validate({
    body: registerSchema
  }),
  registerUser);

router.post("/login",
  validate({
    body: loginSchema
  }),
  loginUser);
router.delete("/",
  authMiddleware,
  deleteUser);

module.exports = router;