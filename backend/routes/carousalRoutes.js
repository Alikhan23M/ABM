const express = require('express');
const sliderImageController = require('../controllers/carousalController');
const { authenticateUser, authorizeRoles } = require('../middelware/authMiddelware');

const router = express.Router();


// CRUD endpoints for slider images
router.post('/addImage',authenticateUser,authorizeRoles(['admin', 'editor','moderator']), sliderImageController.createSliderImage);
router.get('/', sliderImageController.getAllSliderImages);
router.get('/:id',authenticateUser,authorizeRoles(['admin', 'editor','moderator']), sliderImageController.getSliderImageById);
router.put('/:id',authenticateUser,authorizeRoles(['admin', 'editor','moderator']), sliderImageController.updateSliderImageById);
router.delete('/:id',authenticateUser,authorizeRoles(['admin', 'editor','moderator']), sliderImageController.deleteSliderImageById);

module.exports = router;
