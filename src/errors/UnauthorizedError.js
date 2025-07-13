const HttpError = require("./HttpError");

class UnauthorizedError extends HttpError {
    constructor(message = "Unauthorized") {
        super(401, message);
    }
}

module.exports = UnauthorizedError;