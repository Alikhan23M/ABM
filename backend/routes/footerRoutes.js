const express = require('express');
const router = express.Router();
const {
    getFooter,
    getAllFooters,
    createFooter,
    updateFooter,
    deleteFooter,
    setActiveFooter
} = require('../controllers/footerController');

// Public route - Get active footer
router.get('/', getFooter);

// Admin routes
router.get('/all', getAllFooters);
router.post('/create', createFooter);
router.put('/update/:id', updateFooter);
router.delete('/delete/:id', deleteFooter);
router.put('/set-active/:id', setActiveFooter);

module.exports = router;





