const express = require("express");
const router = express.Router();
const { registerUser, loginUser, deleteUser} = require("../controllers/auth.controller");
const validate = require("../middlewares/validation.middleware")
const { registerSchema, loginSchema } = require("../validators/auth.schema");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/register", validate(registerSchema), registerUser);
router.post("/login", validate(loginSchema), loginUser);
router.delete("/",authMiddleware , deleteUser);

module.exports = router;