const express = require("express");
const app = express();
const todoRouter = require("./routes/todo.router");
const authRouter = require("./routes/auth.router");
const errorHandler = require("./middlewares/error.middleware");
const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("./docs/swagger");

require("dotenv").config();
app.use(express.json());

app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use("/api/v1/todos", todoRouter);
app.use("/api/v1/auth", authRouter);
app.use(errorHandler);

module.exports = app;