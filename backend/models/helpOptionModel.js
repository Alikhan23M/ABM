const mongoose = require('mongoose');

const helpOptionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  buttonText: { type: String, required: true },
  buttonLink: { type: String, required: true },
  icon: { type: String, required: true },
  isArchived:{
        type: Boolean,
        default: false
    } // store icon name or SVG path
}, { timestamps: true });

module.exports = mongoose.model('HelpOption', helpOptionSchema);
