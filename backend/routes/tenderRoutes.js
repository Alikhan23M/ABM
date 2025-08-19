const express = require('express');
const tenderController = require('../controllers/tenderController');
const { authenticateUser, authorizeRoles } = require('../middelware/authMiddelware');

const router = express.Router();



// CRUD endpoints for tenders
router.post('/createTender',authenticateUser,authorizeRoles(['admin', 'editor','moderator']), tenderController.createTender);
router.get('/', tenderController.getAllTenders);
router.get('/:id',authenticateUser,authorizeRoles(['admin', 'editor','moderator']), tenderController.getTenderById);
router.put('/:id',authenticateUser,authorizeRoles(['admin', 'editor','moderator']), tenderController.updateTenderById);
router.delete('/:id',authenticateUser,authorizeRoles(['admin', 'editor','moderator']), tenderController.deleteTenderById);

module.exports = router;
