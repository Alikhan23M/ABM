const mongoose = require('mongoose');

const CareerSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        require: true
    },
    applyLink: {
        type: String,
        required: true
    },
    isInternship: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    isArchived:{
        type: Boolean,
        default: false
    }
});

const Career = mongoose.model('Career', CareerSchema);

module.exports = Career;
