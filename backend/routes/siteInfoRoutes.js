const express = require('express');
const siteInfoController = require('../controllers/siteInfoController');
const { authorizeRoles, authenticateUser } = require('../middelware/authMiddelware');

const router = express.Router();


router.get('/', siteInfoController.getSiteInfo);

router.put('/',authenticateUser,authorizeRoles(['admin', 'editor','moderator']), siteInfoController.updateSiteInfo);

module.exports = router;
