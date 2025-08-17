const express = require("express");
const router = express.Router();
const {registerUser, loginUser} = require("../controllers/auth.controller");
const validate = require("../middlewares/validation.middleware")
const {registerSchema, loginSchema} = require("../schemas/auth.schema");

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

module.exports = router;