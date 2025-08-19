const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/userModel');
const sendEmail = require('../utils/email');
const config = require('../config');
const jwtUtils=require('./../utils/jwToken')
const router = express.Router();

//Register api for testing purpose
exports.register= async (req, res) => {
    const { name, email, password, picUrl, role } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ 
            name, 
            email, 
            password: hashedPassword,
            picUrl,
            role
        });

        await newUser.save();

        const token = jwtUtils.generateToken(newUser._id);

        sendEmail(email, 'Welcome!', `Hello ${name}, welcome to our platform!, 
            Credentials:{
            Email: ${email},
            Password:${password}}`);

        res.status(201).json({
            token,
            msg: 'Verification Token is send to email please verify the email' });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

// Register API
exports.addUser= async (req, res) => {
    const { name, email, password, picUrl, role } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const isAdmin = role === 'admin';
        const newUser = new User({ 
            name, 
            email, 
            password: hashedPassword,
            picUrl,
            role,
            isAdmin
        });


        await newUser.save();

        const token = jwtUtils.generateToken(newUser._id);

        sendEmail(email, 'Welcome!', `Hello ${name}, welcome to our platform!, 
            Credentials:{
            Email: ${email},
            Password:${password}}`);

        res.status(201).json({
            token,
            msg: 'Verification Token is send to email please verify the email' });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

// Login API
exports.login= async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Account Not Found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }
        user.status = 'Online';
        await user.save();

        const token = jwtUtils.generateToken(user._id);

        // Send response with token
        res.json({ token,role:user.role,userId:user._id });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

// Forgot Password API
exports.forgotPassword= async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'User not found' });
        }

        const token = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        await user.save();

        const resetUrl = `https://demo.abmpakistan.org/reset-password/${token}`;  // Adjust the URL to match your frontend setup
        sendEmail(email, 'Password Reset', `Click the link to reset your password: ${resetUrl}`);

        res.json({ msg: 'Password reset link sent to email'});
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

exports.logout = async (req, res) => {
    const { userId } = req.body; // Ensure userId is sent in the request body

    try {
        // Find the user and update their status to 'Offline'
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        user.status = 'Offline';
        await user.save();

        // Optionally, handle any additional logout logic here (e.g., token invalidation)

        res.status(200).json({ msg: 'User status updated to Offline' });
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
};

// Reset Password API
exports.resetPassword = async (req, res) => {
    const { password } = req.body;
    const { token } = req.params;
    try {
        const user = await User.findOne({ 
            resetPasswordToken: token, 
            resetPasswordExpires: { $gt: Date.now() } 
        });

        if (!user) {
            return res.status(400).json({ msg: 'Invalid or expired token' });
        }

        // Update user's password
        user.password = await bcrypt.hash(password, 10);

        // Reset token and expiration
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        // Save updated user
        await user.save();

        // Generate new JWT token
        const newToken = jwtUtils.generateToken(user._id);

        // Respond with success message and new token
        res.json({ msg: 'Password reset successfully', token: newToken });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Exclude password field
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

exports.getUserById = async (req, res) => {
    const userId = req.userId;
    console.log('getUserById', userId);
    try {
        const user = await User.findById(userId).select('-password'); // Exclude password field
        if (!user) return res.status(404).json({ msg: 'User not found' });
        res.status(200).json(user);
        
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    
    }
}

exports.deleteUserById = async (req, res) => {
    const userId = req.userId;
    console.log('getUserById', userId);
    if(userId == req.params.id){
        return res.status(403).json({ msg: 'Cannot delete your own account' });
    }
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ msg: 'User not found' });
        res.status(200).json({ msg: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
}

exports.updatePassword = async (req, res) => {
    const { userId, currentPassword, newPassword } = req.body;

    if (!userId || !currentPassword || !newPassword) {
        return res.status(400).send('All fields are required');
    }

    try {
        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ msg:'User not found'});
        }

        // Check if the current password is correct
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg:'Current password is incorrect'});
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update the password
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ msg:'Password updated successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg:'Server error'});
    }
};


exports.updatePasswordSelf = async (req, res) => {
    const {currentPassword, newPassword } = req.body;
    const userId = req.user.userId; 

    if (!userId || !currentPassword || !newPassword) {
        return res.status(400).send('All fields are required');
    }

    try {
        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ msg:'User not found'});
        }

        // Check if the current password is correct
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg:'Current password is incorrect'});
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update the password
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ msg:'Password updated successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg:'Server error'});
    }
};

exports.getPic = async (req, res) => {
    const userId = req.user.userId; 
    try {
        const user = await User.findById(userId).select('picUrl');
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.status(200).json({ picUrl: user.picUrl });
    } catch (error) {
        res.status(500).send('Server error');
    }
};