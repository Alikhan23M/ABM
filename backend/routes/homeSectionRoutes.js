const express = require('express');
const homeSectionController = require('../controllers/homeSectionController');
const { authorizeRoles, authenticateUser } = require('../middelware/authMiddelware');

const route = express.Router();

// Get the ordered home page sections (public)
route.get('/', homeSectionController.getHomeSections);

// Update the order and active status of home page sections (admin only)
route.patch(
    '/updateHomeSections',
    authenticateUser,
    authorizeRoles(['admin']),
    homeSectionController.updateHomeSections
);

module.exports = route;