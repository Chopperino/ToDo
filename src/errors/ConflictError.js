const HttpError = require("./HttpError");

class ConflictError extends HttpError {
    constructor(message = "Conflict with existing entity") {
        super(409, message);
    }
}

module.exports = ConflictError;