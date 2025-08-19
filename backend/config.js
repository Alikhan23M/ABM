// config.js
const dotenv = require('dotenv');

// Load environment variables from a .env file into process.env
dotenv.config();

module.exports = {
    port: process.env.PORT,
    mongoURI: process.env.MONGODB_URI,
    jwtSecret: process.env.JWT_SECRET,
    emailUser: process.env.EMAIL_USER,
    emailPass: process.env.EMAIL_PASS
};
