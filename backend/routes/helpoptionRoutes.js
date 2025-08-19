const express = require('express');
const helpOptionController = require('../controllers/helpoptionController');
const { authorizeRoles, authenticateUser } = require('./../middelware/authMiddelware');

const route = express.Router();

// ************** HELP OPTIONS CRUD **************

// Create Help Option
route.post(
  '/createHelpOption',
  authenticateUser,
  authorizeRoles(['admin', 'editor', 'moderator']),
  helpOptionController.createHelpOption
);

// Get All Help Options (public)
route.get('/getHelpOptions', helpOptionController.getHelpOptions);

// Update Help Option
route.patch(
  '/updateHelpOption/:id',
  authenticateUser,
  authorizeRoles(['admin', 'editor', 'moderator']),
  helpOptionController.updateHelpOption
);

// Delete Help Option
route.delete(
  '/deleteHelpOption/:id',
  authenticateUser,
  authorizeRoles(['admin', 'editor', 'moderator']),
  helpOptionController.deleteHelpOption
);

module.exports = route;
