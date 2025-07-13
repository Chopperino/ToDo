const express = require("express");
const app = express();
const todoRouter = require("./routes/todo.router");
const authRouter = require("./routes/auth.router");
const errorHandler = require("./middlewares/error.middleware");

require("dotenv").config();
app.use(express.json());

app.use("/api/todos", todoRouter);
app.use("/api/auth", authRouter);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}/`);
})