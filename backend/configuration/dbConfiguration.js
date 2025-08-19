// db.js
const mongoose = require('mongoose');
const config = require('./../config');

const connectDB = async () => {
    try {
        await mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('MongoDB connected successfully');

        // Add event listeners for the mongoose connection
        mongoose.connection.on('connected', () => {
            console.log('Mongoose connected to ' + config.mongoURI);
        });

        mongoose.connection.on('error', (err) => {
            console.log('Mongoose connection error: ' + err);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('Mongoose disconnected');
        });

        // If the Node process ends, close the Mongoose connection
        process.on('SIGINT', async () => {
            await mongoose.connection.close();
            console.log('Mongoose disconnected on app termination');
            process.exit(0);
        });
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit the process with failure
    }
};

module.exports = connectDB;
