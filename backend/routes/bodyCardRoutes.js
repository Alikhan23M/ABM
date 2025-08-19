const express = require('express');
const bodyCardController = require('../controllers/bodyCardController');
const { authenticateUser, authorizeRoles } = require('../middelware/authMiddelware');

const router = express.Router();

// CRUD endpoints for blogs
router.get('/', bodyCardController.getBodyCard);
router.post('/', authenticateUser, authorizeRoles(['admin', 'editor']), bodyCardController.createBodyCard);
router.put('/:id', authenticateUser, authorizeRoles(['admin', 'editor']), bodyCardController.updateBodyCard);
router.delete('/:id', authenticateUser, authorizeRoles(['admin', 'editor']), bodyCardController.deleteBodyCard);


module.exports = router;
