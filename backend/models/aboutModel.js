const mongoose = require('mongoose');

const aboutUsSchema = new mongoose.Schema({
    title: {type:String, required:true},
    category: {type:String, required:true},
    description: { type: String, required: true },
    imgUrl:{type: String, require:false},
}, {
    timestamps: true
});

module.exports = mongoose.model('AboutUs', aboutUsSchema);





