const express = require('express');
const careerController = require('../controllers/careerController');
const { authorizeRoles, authenticateUser } = require('../middelware/authMiddelware');

const router = express.Router();


router.get('/', careerController.getAllCareers);
router.get('/:id', careerController.getCareerById);
router.post('/addNew',authenticateUser,authorizeRoles(['admin', 'editor','moderator']), careerController.addNewCareer);
router.put('/:id',authenticateUser,authorizeRoles(['admin', 'editor','moderator']), careerController.updateCareerById);
router.delete('/:id',authenticateUser,authorizeRoles(['admin', 'editor','moderator']), careerController.deleteCareerById);

module.exports = router;
