// routes/pagesRoutes.js
const express = require('express');
const router = express.Router();
const pagesController = require('../controllers/pageController');
const authMiddleware = require('../middelware/authMiddelware'); // Your authentication middleware

// Public routes (accessible to everyone)
router.get('/', pagesController.getAllPages); // Fixed typo from 'getPages' to 'getAllPages'
router.get('/:url', pagesController.getSinglePage);

// Private routes (require authentication and specific roles)
router.post(
  '/',
  authMiddleware.authenticateUser,
  authMiddleware.authorizeRoles(['admin', 'editor', 'moderator']),
  pagesController.createPage
);
router.put(
  '/:url',
  authMiddleware.authenticateUser,
  authMiddleware.authorizeRoles(['admin', 'editor', 'moderator']),
  pagesController.updatePage
);
router.delete(
  '/:url',
  authMiddleware.authenticateUser,
  authMiddleware.authorizeRoles(['admin', 'editor', 'moderator']),
  pagesController.deletePage
);

// This is the correct and only module export statement
module.exports = router;