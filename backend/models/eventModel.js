const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    images: [
        {
            type: String,
            required: true // at least one image should be present
        }
    ],
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category', // reference to the Category model
        required: true
    }
}, { timestamps: true });

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;
