const Blog = require('../models/blogModel');

// Create a new blog
exports.createBlog = async (req, res) => {
    try {
        const { title, description, thumbnailUrl } = req.body;

        const newBlog = new Blog({
            title,
            description,
            thumbnailUrl
        });

        await newBlog.save();
        res.status(201).json(newBlog);
    } catch (error) {
        res.status(400).json({ message: 'Error creating blog', error });
    }
};

// Get all blogs
exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({isArchived:false});
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching blogs', error });
    }
};

// Get a blog by ID
exports.getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog || blog.isArchived) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching blog', error });
    }
};

// Update a blog by ID
exports.updateBlogById = async (req, res) => {
    try {
        const { title, description, thumbnailUrl } = req.body;

        const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.id,
            { title, description, thumbnailUrl },
            { new: true }
        );

        if (!updatedBlog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        res.status(200).json(updatedBlog);
    } catch (error) {
        res.status(500).json({ message: 'Error updating blog', error });
    }
};

// Delete a blog by ID
exports.deleteBlogById = async (req, res) => {
    try {
        const deletedBlog = await Blog.findOneAndUpdate({_id:req.params.id},{isArchived:true});
        if (!deletedBlog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting blog', error });
    }
};
