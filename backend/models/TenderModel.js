const mongoose = require('mongoose');

const TenderSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    }
});

const Tender = mongoose.model('Tender', TenderSchema);

module.exports = Tender;
