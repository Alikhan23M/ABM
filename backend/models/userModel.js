const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }, // Add creation time
    picUrl: { type: String }, // Add user picture URL
    phoneNumber: { type: String, required: false }, // Add phone number
    address: { type: String, required: false }, // Add address
    isAdmin: { type: Boolean, default: false }, // Add isAdmin flag
    status: {
        type: String,
        enum: ['Online', 'Offline'],
        default: 'Offline'
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    role:{type:String, required:true,enum: ['admin', 'editor', 'moderator', 'user']},
    isArchived:{
        type: Boolean,
        default: false
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
