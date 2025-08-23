const SliderImage = require('../models/carousalModel');

// Create a new slider image
exports.createSliderImage = async (req, res) => {
    try {
        const { title, description, imageUrl } = req.body;

        const newSliderImage = new SliderImage({
            title,
            description,
            imageUrl
        });

        await newSliderImage.save();
        res.status(201).json(newSliderImage);
    } catch (error) {
        res.status(400).json({ message: 'Error creating slider image', error });
    }
};

// Get all slider images
exports.getAllSliderImages = async (req, res) => {
    try {
        const sliderImages = await SliderImage.find({isArchived:false});
        res.status(200).json(sliderImages);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching slider images', error });
    }
};

// Get a slider image by ID
exports.getSliderImageById = async (req, res) => {
    try {
        const sliderImage = await SliderImage.findById(req.params.id);
        if (!sliderImage || sliderImage.isArchived) {
            return res.status(404).json({ message: 'Slider image not found' });
        }
        res.status(200).json(sliderImage);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching slider image', error });
    }
};

// Update a slider image by ID
exports.updateSliderImageById = async (req, res) => {
    try {
        const { title, description, imageUrl } = req.body;

        const updatedSliderImage = await SliderImage.findByIdAndUpdate(
            req.params.id,
            { title, description, imageUrl },
            { new: true }
        );

        if (!updatedSliderImage) {
            return res.status(404).json({ message: 'Slider image not found' });
        }

        res.status(200).json(updatedSliderImage);
    } catch (error) {
        res.status(500).json({ message: 'Error updating slider image', error });
    }
};

// Delete a slider image by ID
exports.deleteSliderImageById = async (req, res) => {
    try {
        const deletedSliderImage = await SliderImage.findOneAndUpdate({_id:req.params.id},{isArchived:true});
        if (!deletedSliderImage) {
            return res.status(404).json({ message: 'Slider image not found' });
        }
        res.status(200).json({ message: 'Slider image deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting slider image', error });
    }
};
