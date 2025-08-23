const Career = require('../models/careerModel');

// Get all career entries (optionally filter by internship)
exports.getAllCareers = async (req, res) => {
    try {
        const { isInternship } = req.query; // Optional query param: ?isInternship=true
        const filter = {};
        if (isInternship !== undefined) {
            filter.isInternship = isInternship === 'true';
            filter.isArchived = false;
        }

        const careers = await Career.find(filter).sort({ createdAt: -1 });
        if (careers.length === 0) {
            return res.status(404).json({ message: 'No careers found' });
        }
        res.status(200).json(careers);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching career entries', error });
    }
};

// Get a single career entry by ID
exports.getCareerById = async (req, res) => {
    try {
        const career = await Career.findById(req.params.id);
        if (!career || career.isArchived) {
            return res.status(404).json({ message: 'Career entry not found' });
        }
        res.status(200).json(career);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching career entry', error });
    }
};

// Create a new career entry
exports.addNewCareer = async (req, res) => {
    try {
        const career = new Career({
            title: req.body.title,
            description: req.body.description,
            location: req.body.location,
            applyLink: req.body.applyLink,
            isInternship: req.body.isInternship || false
        });
        await career.save();
        res.status(201).json(career);
    } catch (error) {
        res.status(400).json({ message: 'Error creating career entry', error });
    }
};

// Update a career entry by ID
exports.updateCareerById = async (req, res) => {
    try {
        const career = await Career.findByIdAndUpdate(
            req.params.id,
            {
                title: req.body.title,
                description: req.body.description,
                location: req.body.location,
                applyLink: req.body.applyLink,
                isInternship: req.body.isInternship
            },
            { new: true, runValidators: true }
        );
        if (!career) {
            return res.status(404).json({ message: 'Career entry not found' });
        }
        res.status(200).json(career);
    } catch (error) {
        res.status(400).json({ message: 'Error updating career entry', error });
    }
};

// Delete a career entry by ID
exports.deleteCareerById = async (req, res) => {
    try {
        const career = await Career.findOneAndUpdate({_id:req.params.id},{isArchived:true});
        if (!career) {
            return res.status(404).json({ message: 'Career entry not found' });
        }
        res.status(200).json({ message: 'Career entry deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting career entry', error });
    }
};
