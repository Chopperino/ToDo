const jwt = require("jsonwebtoken");
const UnauthorizedError = require("../errors/UnauthorizedError");

function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return next(new UnauthorizedError("Token missing"));
    }

    const token = authHeader.split(" ")[1];

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (err) {
        return next(new UnauthorizedError("Invalid token"));
    }
}

module.exports = authMiddleware;