const mongoose = require('mongoose');

const contactUsSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
  subAddress:{
    type:String,
    required:false
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  // Add more fields as needed (e.g., social media links, opening hours, etc.)
});

const ContactUs = mongoose.model('ContactUs', contactUsSchema);

module.exports = ContactUs;
