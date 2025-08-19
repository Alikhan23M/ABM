const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const config = require('../config');


const authenticateUser = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
    console.log('Token Provided',token);

    try {
        const decoded = jwt.verify(token, config.jwtSecret); // Ensure you have set JWT_SECRET in your environment variables
        req.user = decoded; // Assuming decoded contains user ID as { userId: <id> }
        console.log('Decoded JWT:', req.user); // Log the decoded token
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};


const authorizeRoles = (roles) => {
    return async (req, res, next) => {
        try {
            const userId = req.user.userId; // Extract userId from req.user
            console.log('User ID from token:', userId); // Log user ID from token

            const user = await User.findById(userId);
            console.log('Retrieved User:', user); // Log retrieved user

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            if (!roles.includes(user.role)) {
                return res.status(403).json({ message: 'Access forbidden: insufficient privileges' });
            }
            req.userId = user._id;
            next();
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    };
};




module.exports = { authorizeRoles, authenticateUser };
