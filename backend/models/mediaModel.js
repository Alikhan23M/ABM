const mongoose = require('mongoose');

const pictureSchema = new mongoose.Schema({
    title: { type: String, required: true },
    imageUrl: { type: String, required: true }
});

const Picture = mongoose.model('Picture', pictureSchema);

module.exports = Picture;
