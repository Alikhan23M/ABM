const mongoose = require('mongoose');

const DirectorMessageSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        default:"Message From Executive Director"
    },
    description: {
        type: String,
        required: true,
        default:"No Message Available"
    }
});

const DirectorMessage = mongoose.model('DirectorMessage', DirectorMessageSchema);

module.exports = DirectorMessage;
