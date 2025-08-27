const News = require('../models/newsModel');
const upload = require('../middelware/upload');

// Get all news articles
exports.getAllNews = async (req, res) => {
    try {
        const news = await News.find({isArchived:false});
        res.status(200).json(news);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching news articles', error });
    }
};

// Get a single news article by ID
exports.getNewsById = async (req, res) => {
    try {
        const news = await News.findById(req.params.id);
        if (!news || news.isArchived) {
            return res.status(404).json({ message: 'News article not found' });
        }
        res.status(200).json(news);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching news article', error });
    }
};

// Create a news article with optional image upload
exports.addNewNews = async (req, res) => {
    try {
        const newsData = {
            title: req.body.title,
            content: req.body.content,
            author: req.body.author,
        };
        if (req.body.imageUrl) {
            newsData.imageUrl = req.body.imageUrl; // Cloudinary URL
        }
        const news = new News(newsData);
        await news.save();
        res.status(201).json(news);
    } catch (error) {
        res.status(400).json({ message: 'Error creating news article', error });
    }
};

// Update a news article by ID with optional image upload
exports.updateNewsById = async (req, res) => {
    try {
        const newsData = {
            title: req.body.title,
            content: req.body.content,
            author: req.body.author,
        };
        if (req.body.imageUrl) {
            newsData.imageUrl = req.body.imageUrl; // Cloudinary URL
        }
        const news = await News.findByIdAndUpdate(req.params.id, newsData, { new: true, runValidators: true });
        if (!news) {
            return res.status(404).json({ message: 'News article not found' });
        }
        res.status(200).json(news);
    } catch (error) {
        res.status(400).json({ message: 'Error updating news article', error });
    }
};

// Delete a news article by ID
exports.deleteNewsById = async (req, res) => {
    try {
        const news = await News.findOneAndUpdate({_id:req.params.id},{isArchived:true});
        if (!news) {
            return res.status(404).json({ message: 'News article not found' });
        }
        res.status(200).json({ message: 'News article deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting news article', error });
    }
};


exports.newsPagination = async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const perPage = parseInt(req.query.perPage) || 2; // Default to 2 items per page if not provided
  
    try {
      const totalCount = await News.countDocuments({ isArchived: false });
      const news = await News.find({ isArchived: false })
        .sort({ publishedAt: -1 }) // Sort by publishedAt descending
        .skip((page - 1) * perPage) // Skip records based on current page
        .limit(perPage); // Limit results per page
  
      res.status(200).json({
        news,
        currentPage: page,
        totalPages: Math.ceil(totalCount / perPage),
      });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching news articles', error });
    }
  };

  
