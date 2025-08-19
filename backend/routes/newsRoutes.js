const express = require('express');
const newsController = require('../controllers/newsController');
const upload = require('../middelware/upload');
const { authenticateUser, authorizeRoles } = require('../middelware/authMiddelware');

const router = express.Router();

router.get('/news', newsController.getAllNews);
router.get('/newsPagination', newsController.newsPagination);
router.get('/news/:id', newsController.getNewsById);
router.post('/news',authenticateUser,authorizeRoles(['admin', 'editor','moderator']), newsController.addNewNews);
router.put('/news/:id',authenticateUser,authorizeRoles(['admin', 'editor','moderator']), newsController.updateNewsById);
router.delete('/news/:id',authenticateUser,authorizeRoles(['admin', 'editor','moderator']), newsController.deleteNewsById);

module.exports = router;
