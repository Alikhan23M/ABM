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
    }
});

const SliderImage = mongoose.model('SliderImage', SliderImageSchema);

module.exports = SliderImage;
