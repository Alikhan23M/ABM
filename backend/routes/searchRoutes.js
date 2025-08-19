const express = require('express');
const searchController = require('../controllers/searchController');
const { authorizeRoles, authenticateUser } = require('../middelware/authMiddelware');

const router = express.Router();


router.get('/',searchController.search);
module.exports = router;
