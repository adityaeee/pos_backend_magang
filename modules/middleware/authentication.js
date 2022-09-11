const jwt = require("jsonwebtoken");

const authentication = async(req, res, next) => {
    try {
        const token = req.headers["authorization"];

        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
        next();
    } catch (error) {
        res.status(403).json({ message: error.message });
    }
};

module.exports = authentication;