const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    careerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Career',
        required: true
    },
    appliedAt: {
        type: Date,
        default: Date.now
    },
    resumeUrl: {
        type: String,
        required: true
    }
});

const Application = mongoose.model('Application', ApplicationSchema);

module.exports = Application;
