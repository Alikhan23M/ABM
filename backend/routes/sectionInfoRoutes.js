const express = require('express');
const sectionInfoController = require('../controllers/sectionInfoController');
const { authorizeRoles, authenticateUser } = require('../middelware/authMiddelware');

const router = express.Router();


router.get('/', sectionInfoController.getSectionInfo);
router.get('/:position', sectionInfoController.getSectionInfoByPosition);
router.put('/:position',authenticateUser,authorizeRoles(['admin', 'editor','moderator']), sectionInfoController.updateSectionInfo);

module.exports = router;
