// applicationRoutes.js
const express = require('express');
const applicationController = require('../controllers/applicationController');
const { authenticateUser, authorizeRoles } = require('../middelware/authMiddelware'); // Corrected import

const router = express.Router();



router.post('/applications',authenticateUser,authorizeRoles(['user','admin']), applicationController.applyToRole);
router.get('/applications',authenticateUser,authorizeRoles(['admin', 'editor','moderator']), applicationController.getAllApplications);
router.get('/applications/career/:careerId',authenticateUser,authorizeRoles(['admin', 'editor','moderator']), applicationController.getApplicationsByCareerId);
router.get('/applications/user',authenticateUser,authorizeRoles(['admin', 'editor','moderator']), applicationController.getApplicationsByUserId);

module.exports = router;
