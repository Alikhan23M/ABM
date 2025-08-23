const mongoose = require('mongoose'); // Import Mongoose to use ObjectId
const HomeSection = require('../models/homeSectionModel');

// Update the order and active status of home page sections
exports.updateHomeSections = async (req, res) => {
    const { updates } = req.body;

    // Check if updates array exists and is not empty
    if (!updates || updates.length === 0) {
        return res.status(400).json({ msg: 'No updates provided.' });
    }

    try {
        const bulkOps = updates.map(update => {
            // Convert the string ID to a Mongoose ObjectId
            const objectId = new mongoose.Types.ObjectId(update.id);
            
            return {
                updateOne: {
                    filter: { _id: objectId }, // Use the converted ObjectId
                    update: {
                        $set: {
                            order: update.order,
                            isActive: update.isActive
                        }
                    }
                }
            };
        });

        await HomeSection.bulkWrite(bulkOps);

        const updatedSections = await HomeSection.find().sort('order');
        res.json({ msg: 'Home sections updated successfully', sections: updatedSections });
    } catch (err) {
        console.error("Error in updateHomeSections:", err); // Log the specific error
        res.status(500).json({ msg: 'Server error' });
    }
};

// You might also need to add this for the GET request, as a safe measure.
exports.getHomeSections = async (req, res) => {
    try {
        const sections = await HomeSection.find().sort('order');
        res.json(sections);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};