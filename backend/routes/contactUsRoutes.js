const express = require('express');
const router = express.Router();
const contactUsController = require('../controllers/ContactUsController');
const { authorizeRoles, authenticateUser } = require('../middelware/authMiddelware');


// GET contact us information
router.get('/', contactUsController.getContactUs);

// POST update contact us information (only accessible to admins)
router.post('/update',authenticateUser,authorizeRoles(['admin', 'editor','moderator']), contactUsController.updateContactUs);

module.exports = router;
