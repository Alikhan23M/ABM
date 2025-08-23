const mongoose = require('mongoose');

const SectionInfoSchema = new mongoose.Schema({
title:{
    type:String
},
description:{
    type:String
},
buttonText:{
    type:String
},
buttonLink:{
    type:String
},
position:{
    type:String,
},

}, { timestamps: true });

const SectionInfo = mongoose.model('SectionInfo', SectionInfoSchema);

module.exports = SectionInfo;
