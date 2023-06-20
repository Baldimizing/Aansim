const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const config = require('./config');
const User = require('../models/user');

function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(StatusCodes.UNAUTHORIZED).json( { message: '인증되지 않은 요청입니다.' });
    }

    jwt.verify(token, config.jwtSecret, (err, User) => {
        if (err) {
            return res.status(StatusCodes.FORBIDDEN).json({ message: '유효하지 않은 토큰입니다. '});
        }

        req.User = User;
        next();
    });
}

module.exports = authenticateToken;