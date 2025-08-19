const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../configuration/cloudinaryConfig');

// Set up Cloudinary storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'news_thumbnails',
        allowedFormats: ['jpeg', 'png', 'jpg']
    }
});

// Initialize multer with Cloudinary storage
const upload = multer({ storage });

module.exports = upload;
