// controllers/pagesController.js
const Page = require('../models/pagesModel');

// Create a new page
exports.createPage = async (req, res) => {
    try {
        // Ensure the URL doesn't start with '/'
        if (req.body.url) {
            req.body.url = req.body.url.replace(/^\/+/, ''); // removes all leading slashes
        }

        const newPage = new Page(req.body);
        await newPage.save();
        
        res.status(201).json({ message: 'Page created successfully', page: newPage });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ message: 'A page with this URL already exists.' });
        }
        res.status(500).json({ message: 'Failed to create page.', error });
    }
};



// Get all pages
exports.getAllPages = async (req, res) => {
    try {
        const pages = await Page.find({isArchived:false}).select('url mainTitle status');
        res.status(200).json(pages);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve pages.', error });
    }
};

// Get a single page by URL
exports.getSinglePage = async (req, res) => {
    try {
        const page = await Page.findOne({ url: req.params.url });
        if (!page || page.isArchived) {
            return res.status(404).json({ message: 'Page not found.' });
        }
        res.status(200).json({ page });
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve page.', error });
    }
};

// Update a page
exports.updatePage = async (req, res) => {
    try {
        const updatedPage = await Page.findOneAndUpdate({ url: req.params.url }, req.body, { new: true, runValidators: true });
        if (!updatedPage) {
            return res.status(404).json({ message: 'Page not found.' });
        }
        res.status(200).json({ message: 'Page updated successfully', page: updatedPage });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update page.', error });
    }
};

// Delete a page
exports.deletePage = async (req, res) => {
    try {
        const deletedPage = await Page.findOneAndUpdate({ url: req.params.url }, { isArchived: true });
        if (!deletedPage) {
            return res.status(404).json({ message: 'Page not found.' });
        }
        res.status(200).json({ message: 'Page deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete page.', error });
    }
};


