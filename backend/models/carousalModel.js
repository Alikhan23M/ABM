const mongoose = require('mongoose');

const SliderImageSchema = new mongoose.Schema({
    title: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    imageUrl: {
        type: String,
        required: true
    },
    isArchived:{
        type: Boolean,
        default: false
    }
});

const SliderImage = mongoose.model('SliderImage', SliderImageSchema);

module.exports = SliderImage;
