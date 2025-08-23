// This modelis to manage the body cards on the home page after the our impact sections and before the event section

const mongoose = require('mongoose');

const bodyCardSchema = new mongoose.Schema({
   title:{type:String,require:true},
   description:{type:String},
   image:{type:String},
   url:{type:String,required:true},
   isArchived:{
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('BodyCard', bodyCardSchema);





