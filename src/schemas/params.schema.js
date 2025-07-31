const {z} = require("zod")

function createIdSchema(paramName) {
  return z.object({
    [paramName]: z.coerce.number().int().positive(),
  })
}

module.exports = {
  createIdSchema,
};