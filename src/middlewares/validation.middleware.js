const BadRequestError = require("../errors/BadRequestError");

/**
 * @param {{ body?: ZodSchema, params?: ZodSchema, query?: ZodSchema }} schemas
 */
function validate(schemas) {
  return (req, res, next) => {
    try {
      for (const key of ['body', 'params', 'query']) {
        if (schemas[key]) {
          req[key] = req[key] || {};
          req[key] = schemas[key].parse(req[key]);
        }
      }
      next();
    } catch (err) {
      if (err.errors && Array.isArray(err.errors)) {
        const messages = err.errors.map(e => e.message).join("; ")
        return next(new BadRequestError(messages));
      }

      next(err);
    }
  }
}

module.exports = validate;