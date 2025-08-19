const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../configuration/cloudinaryConfig');

// Set up Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'events',
    allowedFormats: ['jpeg', 'png', 'jpg'],
  },
});

// Initialize multer for multiple files
const uploadMultiple = multer({ storage }).array('images', 10); // max 10 images at a time

module.exports = uploadMultiple;
