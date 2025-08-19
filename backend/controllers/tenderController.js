const Tender = require('../models/TenderModel');

// Create a new tender
exports.createTender = async (req, res) => {
    try {
        const { title, description, imageUrl } = req.body;

        const newTender = new Tender({
            title,
            description,
            imageUrl
        });

        await newTender.save();
        res.status(201).json(newTender);
    } catch (error) {
        res.status(400).json({ message: 'Error creating tender', error });
    }
};

// Get all tenders
exports.getAllTenders = async (req, res) => {
    try {
        const tenders = await Tender.find();
        res.status(200).json(tenders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tenders', error });
    }
};

// Get a tender by ID
exports.getTenderById = async (req, res) => {
    try {
        const tender = await Tender.findById(req.params.id);
        if (!tender) {
            return res.status(404).json({ message: 'Tender not found' });
        }
        res.status(200).json(tender);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tender', error });
    }
};

// Update a tender by ID
exports.updateTenderById = async (req, res) => {
    try {
        const { title, description, imageUrl } = req.body;

        const updatedTender = await Tender.findByIdAndUpdate(
            req.params.id,
            { title, description, imageUrl },
            { new: true }
        );

        if (!updatedTender) {
            return res.status(404).json({ message: 'Tender not found' });
        }

        res.status(200).json(updatedTender);
    } catch (error) {
        res.status(500).json({ message: 'Error updating tender', error });
    }
};

// Delete a tender by ID
exports.deleteTenderById = async (req, res) => {
    try {
        const deletedTender = await Tender.findByIdAndDelete(req.params.id);
        if (!deletedTender) {
            return res.status(404).json({ message: 'Tender not found' });
        }
        res.status(200).json({ message: 'Tender deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting tender', error });
    }
};
