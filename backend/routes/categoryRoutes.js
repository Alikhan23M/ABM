const express = require('express');
const categoryController = require('../controllers/categoryController');
const { authenticateUser, authorizeRoles } = require('../middelware/authMiddelware');

const router = express.Router();

// CRUD endpoints for categories
router.post(
  '/',
  authenticateUser,
  authorizeRoles(['admin', 'editor', 'moderator']),
  categoryController.createCategory
);

router.get('/', categoryController.getAllCategories);

router.get('/:id', categoryController.getCategoryById);

router.put(
  '/:id',
  authenticateUser,
  authorizeRoles(['admin', 'editor', 'moderator']),
  categoryController.updateCategoryById
);

router.delete(
  '/:id',
  authenticateUser,
  authorizeRoles(['admin', 'editor', 'moderator']),
  categoryController.deleteCategoryById
);

module.exports = router;
