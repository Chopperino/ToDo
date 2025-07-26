const { z } = require("zod")

function createIdSchema(paramName) {
    return z.object({
        [paramName]: z.string().regex(/^\d+$/,  `${paramName} must be a numeric string`),
    })
}

module.exports = {
    createIdSchema,
};