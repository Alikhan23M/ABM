const express = require('express');
const eventController = require('../controllers/eventController');
const { authenticateUser, authorizeRoles } = require('../middelware/authMiddelware');

const router = express.Router();



// CRUD endpoints for events
router.post('/events',authenticateUser,authorizeRoles(['admin', 'editor','moderator']), eventController.createEvent);
router.get('/events', eventController.getAllEvents);
router.get('/events/:id', eventController.getEventById);
router.put('/events/:id',authenticateUser,authorizeRoles(['admin', 'editor','moderator']), eventController.updateEventById);
router.delete('/events/:id',authenticateUser,authorizeRoles(['admin', 'editor','moderator']), eventController.deleteEventById);

module.exports = router;
