const Picture = require('../models/mediaModel');

// Get all pictures
exports.getAllPictures = async (req, res) => {
    try {
        const pictures = await Picture.find();
        res.json(pictures);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Get a single picture by ID
exports.getPictureById = async (req, res) => {
    try {
        const picture = await Picture.findById(req.params.id);
        if (!picture) return res.status(404).send('Picture not found');
        res.json(picture);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Add a new picture
exports.addNewPicture = async (req, res) => {
    try {
        const { title, imageUrl } = req.body;
        const newPicture = new Picture({ title, imageUrl });
        await newPicture.save();
        res.status(201).json(newPicture);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Update a picture by ID
exports.updatePictureById = async (req, res) => {
    try {
        const { title, imageUrl } = req.body;
        const picture = await Picture.findByIdAndUpdate(
            req.params.id,
            { title, imageUrl },
            { new: true, runValidators: true }
        );
        if (!picture) return res.status(404).send('Picture not found');
        res.json(picture);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Delete a picture by ID
exports.deletePictureById = async (req, res) => {
    try {
        const picture = await Picture.findByIdAndDelete(req.params.id);
        if (!picture) return res.status(404).send('Picture not found');
        res.json(picture);
    } catch (err) {
        res.status(500).send(err.message);
    }
};
