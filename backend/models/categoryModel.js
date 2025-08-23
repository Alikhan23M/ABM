const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    description: {
        type: String,
        default: ''
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

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;
