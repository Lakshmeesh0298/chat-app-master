const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const TOKEN = authHeader.split(' ')[1];
        jwt.verify(TOKEN, JWT_SECRET, (err, auth) => {
            if (err) res.status(403).json({ message: 'Token is not Valid!' })
            req.user = auth;
            next()
        })
    } else {
        return res.status(401).json({ message: "you are not authenticated1" })
    }
}

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.role === 'admin') {
            next();
        } else {
            res.status(403).json("You are not alowed to do that!");
        }
    });
};

module.exports = {
    verifyToken, verifyTokenAndAdmin
}