const Category = require('../models/categoryModel');

// Create category
exports.createCategory = async (req, res) => {
    try {
        const { title, description } = req.body;

        // Check if category with same title exists
        const existing = await Category.findOne({ title });
        if (existing) {
            return res.status(400).json({ message: 'Category already exists' });
        }

        const newCategory = new Category({ title, description });
        await newCategory.save();

        res.status(201).json(newCategory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating category', error });
    }
};

// Get all categories
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find().sort({ createdAt: -1 });
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching categories', error });
    }
};

// Get category by ID
exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching category', error });
    }
};

// Update category
exports.updateCategoryById = async (req, res) => {
    try {
        const { title, description } = req.body;

        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.id,
            { title, description },
            { new: true, runValidators: true }
        );

        if (!updatedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.status(200).json(updatedCategory);
    } catch (error) {
        res.status(500).json({ message: 'Error updating category', error });
    }
};

// Delete category
exports.deleteCategoryById = async (req, res) => {
    try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.id);
        if (!deletedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting category', error });
    }
};
