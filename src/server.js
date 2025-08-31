const app = require("./app");
const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("./docs/swagger");
const PORT = process.env.PORT || 3000;

app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}/api/v1/`);
  console.log(`swagger documentation is available at http://localhost:${PORT}/api/v1/docs/`)
})