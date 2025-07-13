const BadRequestError = require("../errors/BadRequestError");

function validate(schema) {
    return (req, res, next) => {
        try {
            req.body = req.body || {};
            req.body = schema.parse(req.body);
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