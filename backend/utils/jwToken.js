const jwt = require('jsonwebtoken');
const config = require('../config');

// Function to generate JWT token
exports.generateToken = (userId) => {
    return jwt.sign({ userId }, config.jwtSecret, { expiresIn: '1h' });
};

// Function to verify JWT token
exports.verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, config.jwtSecret);
        return decoded.userId;
    } catch (error) {
        return null;
    }
};
