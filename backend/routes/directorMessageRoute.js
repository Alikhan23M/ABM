const express = require('express');
const router = express.Router();
const directorMessageController = require('../controllers/directorMessageController');
const { authorizeRoles, authenticateUser } = require('../middelware/authMiddelware');


// GET contact us information
router.get('/', directorMessageController.getMessage);

// POST update contact us information (only accessible to admins)
router.patch('/update',authenticateUser,authorizeRoles(['admin', 'editor']), directorMessageController.updateMessage);

module.exports = router;
