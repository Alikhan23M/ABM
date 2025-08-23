const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    thumbnailUrl: {
        type: String,
        required: true
    },
    isArchived:{
        type: Boolean,
        default: false
    }
});

const Blog = mongoose.model('Blog', BlogSchema);

module.exports = Blog;
