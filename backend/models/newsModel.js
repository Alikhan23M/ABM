const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    publishedAt: {
        type: Date,
        default: Date.now
    },
    imageUrl: {
        type: String, // Field to store the image URL
        required: false
    }
});

const News = mongoose.model('News', NewsSchema);

module.exports = News;
