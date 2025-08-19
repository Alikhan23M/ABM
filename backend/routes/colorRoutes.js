const express = require('express');
const colorController = require('../controllers/colorController');
const { authenticateUser, authorizeRoles } = require('../middelware/authMiddelware');

const router = express.Router();

// Create a new color configuration (protected)
router.post(
    '/',
    authenticateUser,
    authorizeRoles(['admin', 'editor']),
    colorController.createColorConfig
);

// Public - Get all color configurations
router.get('/', colorController.getAllColorConfigs);

// Public - Get color configuration by position
router.get('/:position', colorController.getColorConfigByPosition);

// Update color configuration by position (protected, upsert)
router.put(
    '/:position',
    authenticateUser,
    authorizeRoles(['admin', 'editor']),
    colorController.updateColorConfig
);

// Delete color configuration by position (protected)
router.delete(
    '/:position',
    authenticateUser,
    authorizeRoles(['admin']),
    colorController.deleteColorConfig
);

module.exports = router;
