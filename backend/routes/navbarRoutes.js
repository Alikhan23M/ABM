const express = require('express');
const navbarController = require('../controllers/navbarController');
const { authorizeRoles, authenticateUser } = require('../middelware/authMiddelware');

const router = express.Router();

// GET navbar (public)
router.get('/', navbarController.getNavbar);

// UPDATE navbar (admin/editor/moderator)
router.put('/', authenticateUser, authorizeRoles(['admin','editor','moderator']), navbarController.updateNavbar);

module.exports = router;
