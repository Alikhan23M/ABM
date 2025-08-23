const express = require('express');
const blogController = require('../controllers/blogController');
const { authenticateUser, authorizeRoles } = require('../middelware/authMiddelware');

const router = express.Router();


// CRUD endpoints for blogs
router.post('/createBlog',authenticateUser,authorizeRoles(['admin', 'editor','moderator']), blogController.createBlog);
router.get('/', blogController.getAllBlogs);
router.get('/:id', blogController.getBlogById);
router.put('/:id',authenticateUser,authorizeRoles(['admin', 'editor','moderator']), blogController.updateBlogById);
router.delete('/:id',authenticateUser,authorizeRoles(['admin', 'editor','moderator']), blogController.deleteBlogById);

module.exports = router;
