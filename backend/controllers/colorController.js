const Colors = require('../models/colorsModel'); // your color schema model

// ************************ CREATE ************************
// Add new color configuration for a section
exports.createColorConfig = async (req, res) => {
    const { position, content, background, text, buttons, cards, inputFields, extras } = req.body;

    try {
        // Check if section already exists using the new 'position' field
        const existingSection = await Colors.findOne({ position });
        if (existingSection) {
            return res.status(400).json({ msg: `Color configuration for position '${position}' already exists, please update instead` });
        }

        const newConfig = new Colors({
            position,
            content,
            background,
            text,
            buttons,
            cards,
            inputFields,
            extras
        });

        await newConfig.save();
        res.status(201).json({ msg: 'Color configuration created successfully', config: newConfig });

    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
};


// ************************ READ ************************
// Get all color configurations
exports.getAllColorConfigs = async (req, res) => {
    try {
        const configs = await Colors.find();
        res.json({ configs });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

// Get color configuration by position
exports.getColorConfigByPosition = async (req, res) => {
    const { position } = req.params;
    try {
        const config = await Colors.findOne({ position });

        if (!config) {
            return res.status(404).json({ msg: `No color configuration found for position: ${position}` });
        }

        res.json({ config });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};


// ************************ UPDATE ************************
// Update (or create if not exists) color configuration by position
exports.updateColorConfig = async (req, res) => {
    const { position } = req.params;
    const { content, background, text, buttons, cards, inputFields, extras } = req.body;
   
    try {
        const updatedConfig = await Colors.findOneAndUpdate(
            { position },
            { content, background, text, buttons, cards, inputFields, extras },
            { upsert: true, new: true }
        );
        

        res.json({ msg: `Configuration for position '${position}' updated successfully`, config: updatedConfig });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};


// ************************ DELETE ************************
// Delete color configuration by position
exports.deleteColorConfig = async (req, res) => {
    const { position } = req.params;
    try {
        const deletedConfig = await Colors.findOneAndDelete({ position });

        if (!deletedConfig) {
            return res.status(404).json({ msg: `No configuration found for position: ${position}` });
        }

        res.json({ msg: `Configuration for position '${position}' deleted successfully` });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};
